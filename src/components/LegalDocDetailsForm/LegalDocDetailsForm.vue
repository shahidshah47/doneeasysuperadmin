<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { watch, defineProps, defineEmits, ref, onMounted, nextTick } from "vue";
import { useUserStore } from "../../store";
import TradeLicenseForm from "./TradeLicenseForm.vue";

const userStore = useUserStore();
const tradeLicenses = ref([]);
const legDocType = ref("emirates_id_details");

const props = defineProps({
    showLegDocModal: Boolean,
    legDocDetails: Object
});

const emit = defineEmits(["submit", "close"]);

const schema = yup.object({
    trn_number: yup.string().required("TRN number is required"),
    legal_name: yup.string().required("Legal name is required"),

    // Emirates ID Fields Schema
    // client_id: yup.string().required("Company ID is required"),
    emirates_id: yup.string().required("Emirates ID is required"),
    nationality: yup.string().required("Nationality is required"),
    dob: yup.string().required("DOB is required"),
});

const { 
    handleSubmit, values, errors, setValues, 
    resetForm, defineField, setFieldValue 
} = useForm({
    validationSchema: schema,
    initialValues: {
        trn_number: "",
        legal_name: "",
        legal_name_list: "",
        
        // Emirates ID Fields
        client_id: "",
        emirates_id: "",
        nationality: "",
        dob: "",
    }
});


// TRN DETAILS ---
const [trnNumber, trnNumberAttrs] = defineField('trn_number');
const [legalName, legalNameAttrs] = defineField('legal_name');
const [legalNameList, legalNameListAttrs] = defineField('legal_name_list');

// EMIRATES ID DETAILS
const [clientId, clientIdAttrs] = defineField('client_id');
const [emiratesId, emiratesIdAttrs] = defineField('emirates_id');
const [nationality, nationalityAttrs] = defineField('nationality');
const [dob, dobAttrs] = defineField('dob');

watch(
    () => props.legDocDetails,
    (newData) => {
        if (newData) {
            const trn_details = newData.trn_details;
            const emirates_id_details = newData.emirates_id_details;
            if (trn_details) {
                setFieldValue("trn_number", trn_details?.trn_number);
                setFieldValue("legal_name", trn_details?.legal_name);
                setFieldValue("legal_name_list", trn_details?.legal_name_list.join(","));
            }

            // Emirates ID Details
            if (emirates_id_details) {
                const { verification_result: { response } } = emirates_id_details;
                const { success, data } = JSON.parse(response);
                if (success) {
                    setFieldValue("client_id", data?.client_id);
                }
                setFieldValue("dob", emirates_id_details?.dob.split("T")[0]);
                setFieldValue("emirates_id", emirates_id_details?.emirates_id);
                setFieldValue("nationality", emirates_id_details?.nationality);
            }

            tradeLicenses.value = newData.trade_licenses;
        }
    },
    { deep: true, immediate: true }
);

const onSubmit = handleSubmit((values) => {
    // Transform the form values into the desired structure
    const transformedData = {
        trn: {
            legal_name_list: values.legal_name_list.split(","), // Convert string to array
            trn_number: values.trn_number,
            legal_name: values.legal_name
        },
        trade_licenses: tradeLicenses?.value?.map(license => ({
            license_number: license.license_number,
            address: license.address,
            legal_form: license.legal_form,
            cbls_number: license.cbls_number,
            expiry_date: license.expiry_date,
            phone_number: license.phone_number,
            activity_name: license.activity_name,
            business_name: license.business_name,
            license_status: license.license_status,
            establishment_date: license.establishment_date,
            licensing_authority: license.licensing_authority,
            activity_name_arabic: license.activity_name_arabic,
            business_name_arabic: license.business_name_arabic,
            state_id: license.state_id,
            region: license.region
        })) || [],
        emirates_id: {
            emirates_id: values.emirates_id,
            nationality: values.nationality,
            dob: values.dob
        }
    };

    // Emit the transformed data to the parent component
    emit("submit", transformedData);

    // Reset the form and close the modal
    resetForm();
    emit("close");
});

const handleLegDocTab = (type) => {
    legDocType.value = type;
};

// Function to update a trade license
const updateTradeLicense = (index, updatedLicense) => {
  tradeLicenses.value[index] = updatedLicense;
};

</script>

<template>
    <!-- Modal Overlay -->
    <div v-if="showLegDocModal"
        class="z-[99999] left-0 right-0 bottom-0 top-0 overflow-auto backdrop-blur-[12px] bg-opacity-10 fixed inset-0 bg-black bg-opacity-50">
        <div class="max-w-screen-md m-auto flex flex-col justify-center items-center h-full">
            <div class="relative bg-white rounded-3xl overflow-auto 2xl:overflow-hidden h-full 2xl:h-max">
                <div class="bg-gray-200 px-4 py-2 relative flex gap-2 justify-between items-center">
                    <h2 class="!text-lg !font-bold mb-0">Legal Documents Details</h2>
                    <button type="button" @click="emit('close')" class="btn-close"></button>
                </div>
    
                <form @submit.prevent="onSubmit">
                    <div class="flex flex-wrap flex-col gap-2 p-6">
                        <!-- Tabs for sections -->
                        <ul class="nav nav-pills gap-3" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button
                                    :class="`nav-link ${legDocType === 'emirates_id_details' ? 'active btn-primary' : 'btn-light'}`"
                                    id="pills-emiratesid-tab" data-bs-toggle="pill" data-bs-target="#pills-emiratesid"
                                    type="button" role="tab" @click="handleLegDocTab('emirates_id_details')"
                                    aria-controls="pills-emiratesid" aria-selected="false">Emirates ID</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button
                                    :class="`nav-link ${legDocType === 'trn_details' ? 'active btn-primary' : 'btn-light'}`"
                                    id="pills-trn-tab" data-bs-toggle="pill" data-bs-target="#pills-trn" type="button"
                                    role="tab" @click="handleLegDocTab('trn_details')" aria-controls="pills-trn"
                                    aria-selected="false">TRN</button>
                            </li>
                            <li v-for="(trade_license, index) in tradeLicenses" :key="index"
                                class="nav-item" role="presentation">
                                <button
                                    :class="`nav-link ${legDocType === 'trade_licenses' + index ? 'active btn-primary' : 'btn-light'}`"
                                    :id="`pills-license${index + 1}-tab`" @click="handleLegDocTab('trade_licenses' + index)"
                                    data-bs-toggle="pill" :data-bs-target="`#pills-license${index + 1}`" type="button"
                                    role="tab" :aria-controls="`pills-license${index + 1}`" aria-selected="false">Trade
                                    License {{ index + 1 }}</button>
                            </li>
                        </ul>
    
                        <!-- Tab content -->
                        <div class="tab-content" id="pills-tabContent">
                            <!-- Add your fields for Trade License here -->
                            <div v-for="(trade_license, index) in tradeLicenses" :key="index" 
                                class="tab-pane fade" :id="`pills-license${index + 1}`" role="tabpanel" :aria-labelledby="`pills-license${index + 1}-tab`">
                                <TradeLicenseForm :tradeLicense="trade_license" @update="(updatedLicense) => updateTradeLicense(index, updatedLicense)" />
                            </div>
    
                            <div :class="`tab-pane fade ${legDocType === 'emirates_id_details' ? 'show active' : ''}`"
                                id="pills-emiratesid" role="tabpanel" aria-labelledby="pills-emiratesid-tab">
                                <!-- Add your fields for Emirates ID here -->
                                <div class="flex flex-wrap flex-col gap-2">
                                    <div class="flex-1 inline-flex flex-row gap-4">
                                        <div class="w-full">
                                            <label class="block text-sm !font-bold">Entered Emirates ID Number:</label>
                                            <input type="text" v-model="clientId" disabled
                                                class="w-full border disabled:bg-gray-200 disabled:text-gray-500 p-2 rounded outline-0 focus:outline-0" />
                                        </div>
                                        <div class="w-full">
                                            <label class="block text-sm !font-bold">Response Emirates ID:</label>
                                            <input type="text" v-model="emiratesId" v-bind="emiratesIdAttrs"
                                                class="w-full border p-2 rounded outline-0 focus:outline-0" />
                                            <span class="text-red-500 text-sm">{{ errors?.emiratesId }}</span>
                                        </div>
                                    </div>
    
                                    <div class="flex-1 inline-flex flex-row gap-4">
                                        <div class="flex-1">
                                            <label class="block text-sm !font-bold">Nationality:</label>
                                            <input type="text" v-model="nationality" v-bind="nationalityAttrs"
                                                class="w-full border p-2 rounded outline-0 focus:outline-0" />
                                            <span class="text-red-500 text-sm">{{ errors?.nationality }}</span>
                                        </div>
    
                                        <div class="flex-1">
                                            <label class="block text-sm !font-bold">DOB:</label>
                                            <input type="date" v-model="dob" v-bind="dobAttrs"
                                                class="w-full border p-2 rounded outline-0 focus:outline-0" />
                                            <span class="text-red-500 text-sm">{{ errors?.dob }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div :class="`tab-pane fade ${legDocType === 'trn_details' ? 'show active' : ''}`"
                                id="pills-trn" role="tabpanel" aria-labelledby="pills-trn-tab">
                                <!-- Add your fields for TRN here -->
                                <div class="flex flex-wrap flex-col gap-2">
                                    <div class="flex-1 inline-flex flex-row gap-4">
                                        <div class="w-full">
                                            <label class="block text-sm !font-bold">TRN Number:</label>
                                            <input type="text" v-model="trnNumber" v-bind="trnNumberAttrs"
                                                class="w-full border disabled:bg-gray-200 disabled:text-gray-500 p-2 rounded outline-0 focus:outline-0" />
                                        </div>
                                        <div class="w-full">
                                            <label class="block text-sm !font-bold">Legal Name:</label>
                                            <input type="text" v-model="legalName" v-bind="legalNameAttrs"
                                                class="w-full border p-2 rounded outline-0 focus:outline-0" />
                                            <span class="text-red-500 text-sm">{{ errors?.legalName }}</span>
                                        </div>
                                    </div>
    
                                    <div class="flex-1 inline-flex flex-row gap-4">
                                        <div class="flex-1">
                                            <label class="block text-sm !font-bold">Legal Names List:</label>
                                            <input type="text" disabled v-model="legalNameList" v-bind="legalNameListAttrs"
                                                class="w-full border p-2 disabled:bg-gray-200 disabled:text-gray-500 rounded outline-0 focus:outline-0" />
                                            <span class="text-red-500 text-sm">{{ errors?.legal_name_list }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div class="flex justify-end gap-2 space-x-2 flex-1/2 p-4 border-t">
                        <button type="button" @click="emit('close')"
                            class="px-4 py-2 bg-transparent border !rounded-xl text-gray-400">Cancel</button>
                        <button type="submit" class="btn btn-primary min-w-24 !font-bold">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>