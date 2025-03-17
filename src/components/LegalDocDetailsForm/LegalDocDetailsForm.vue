<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { watch, defineProps, defineEmits, ref } from "vue";
import { useUserStore } from "../../store";
import EmiratesIDForm from "./EmiratesIDForm.vue";
import TRNForm from "./TRNForm.vue";
import TradeLicenseForm from "./TradeLicenseForm.vue";

const userStore = useUserStore();
const legDocType = ref("trn_details");

const props = defineProps({
    showLegDocModal: Boolean,
});

const emit = defineEmits(["submit", "close"]);

// ✅ Define validation schema
// const schema = yup.object({
//     name: yup.string().required("Company name is required"),
//     email: yup.string().email("Invalid email").required("Email is required"),
// });

// const { 
//     handleSubmit, values, errors, setValues, 
//     resetForm, defineField, setFieldValue 
// } = useForm({
//     validationSchema: schema,
//     initialValues: {
//         companyId: "",
//         name: "",
//         email: "",
//         phone: "",
//         address: "",
//         addedBy: "",
//         companySize: "",
//         joinedDate: "",
//     }
// });

// // ✅ Use fields correctly
// const [companyId, companyIdAttrs] = defineField("companyId");
// const [name, nameAttrs] = defineField('name');
// const [email, emailAttrs] = defineField('email');
// const [phone, phoneAttrs] = defineField('phone');
// const [addedBy, addedByAttrs] = defineField('addedBy');
// const [joinedDate, joinedDateAttrs] = defineField('joinedDate');
// const [companySize, companySizeAttrs] = defineField('companySize');

// // ✅ Watch for changes in props.companyData and update form
// watch(
//     () => props.companyData,
//     (newData) => {
//         if (newData) {
//             setFieldValue("companyId", `ID: ${newData?.id}`);
//             setFieldValue("name", newData?.company_name);
//             setFieldValue("email", newData?.email);
//             setFieldValue("phone", newData?.phone);
//             setFieldValue("addedBy", newData?.added_by?.name || "John Smith");
//             setFieldValue("joinedDate", formatToMonthDayYear(newData?.created_at));
//             setFieldValue("companySize", newData?.company_size);
//         }
//     },
//     { deep: true, immediate: true }
// );

// ✅ Handle form submission correctly
// const onSubmit = handleSubmit((values) => {
//     emit("submit", values);
//     resetForm();
//     emit("close");
// });

// ✅ Update companySize correctly
// const handleCompSizeSelect = (heading) => {
//     companySize.value = heading;
// };

const handleSubmitEmiratesID = async (values) => {
    console.log(values, "handle emirates id");
    emit("close");
}

const handleSubmitTRN = async (values) => {
    console.log(values, "handle submit trn");
    emit("close");
}

const handleSubmitTradeLicense = async (values) => {
    console.log(values, "handle submit trade license");
    emit("close");
}

const handleLegDocTab = (type) => {
    legDocType.value = type;
};

</script>

<template>
    <!-- Modal Overlay -->
    <div v-if="showLegDocModal"
        class="z-[99999] left-0 right-0 bottom-0 top-0 overflow-auto backdrop-blur-[12px] bg-opacity-10 fixed inset-0 bg-black bg-opacity-50">
        <div class="relative bg-white rounded-3xl overflow-hidden max-w-screen-md m-auto flex flex-col w-full">
            <div class="bg-gray-200 px-4 py-2 relative flex gap-2 justify-between items-center">
                <h2 class="!text-lg !font-bold mb-0">Legal Documents Details</h2>
                <button type="button" @click="emit('close')" class="btn-close"></button>
            </div>

            <form @submit.prevent="onSubmit">
                <div class="flex flex-wrap flex-col gap-2">
                    <!-- Tabs for sections -->
                    <ul class="nav nav-pills gap-3 !p-6" id="pills-tab" role="tablist">
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
                        <li v-for="(trade_license, index) in userStore?.legDocDetails?.trade_licenses" :key="index"
                            class="nav-item" role="presentation">
                            <button
                                :class="`nav-link ${legDocType === 'trade_licenses' + index ? 'active btn-primary' : 'btn-light'}`"
                                :id="`pills-license${index + 1}-tab`" @click="handleLegDocTab('trade_licenses' + index)"
                                data-bs-toggle="pill" :data-bs-target="`#pills-license${index + 1}`" type="button"
                                role="tab" :aria-controls="`pills-license${index + 1}`" aria-selected="false">Trade
                                License {{ trade_license?.id }}</button>
                        </li>
                    </ul>

                    <!-- Tab content -->
                    <div class="tab-content" id="pills-tabContent">
                        <div v-for="(trade_license, index) in userStore?.legDocDetails?.trade_licenses" :key="index" 
                            class="tab-pane fade" :id="`pills-license${index + 1}`" role="tabpanel" :aria-labelledby="`pills-license${index + 1}-tab`">
                            <TradeLicenseForm :tradeLicense="trade_license" @close="emit('close')" @submit="handleSubmitTradeLicense" />
                        </div>

                        <div :class="`tab-pane fade ${legDocType === 'emirates_id_details' ? 'show active' : ''}`"
                            id="pills-emiratesid" role="tabpanel" aria-labelledby="pills-emiratesid-tab">
                            <!-- Add your fields for Emirates ID here -->
                            <EmiratesIDForm @close="emit('close')" @submit="handleSubmitEmiratesID" />
                        </div>

                        <div :class="`tab-pane fade ${legDocType === 'trn_details' ? 'show active' : ''}`"
                            id="pills-trn" role="tabpanel" aria-labelledby="pills-trn-tab">
                            <!-- Add your fields for TRN here -->
                            <TRNForm @close="emit('close')" @submit="handleSubmitTRN" />
                        </div>
                    </div>
                </div>

                <!-- <div class="flex justify-end gap-2 space-x-2 flex-1/2 p-4 border-t">
                    <button type="button" @click="emit('close')"
                        class="px-4 py-2 bg-transparent border !rounded-xl text-gray-400">Cancel</button>
                    <button type="submit" class="btn btn-primary min-w-24 !font-bold">Save</button>
                </div> -->
            </form>
        </div>
    </div>
</template>
