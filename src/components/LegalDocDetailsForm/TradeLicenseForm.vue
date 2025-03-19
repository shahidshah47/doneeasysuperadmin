<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { watch, defineProps, defineEmits, ref, toRaw } from "vue";

const emit = defineEmits(["update"]);

const props = defineProps({
    tradeLicense: Object
});

const {
    handleSubmit, values, errors, setValues,
    resetForm, defineField, setFieldValue
} = useForm({
    initialValues: {
        license_number: "",
        address: "",
        legal_form: "",
        cbls_number: "",
        expiry_date: "",
        phone_number: "",
        license_status: "",
        establishment_date: "",
        licensing_authority: "",
        activity_name_arabic: "",
        business_name_arabic: "",
        business_name: "",
        region: "",
        activity: "",
    }
});

// ✅ Use fields correctly
const [licenseNumber, licenseNumberAttrs] = defineField("license_number")
const [address, addressAttrs] = defineField("address")
const [legalForm, legalFormAttrs] = defineField("legal_form")
const [cblsNumber, cblsNumberAttrs] = defineField("cbls_number")
const [expiryDate, expiryDateAttrs] = defineField("expiry_date")
const [phoneNumber, phoneNumberAttrs] = defineField("phone_number")
const [activity, activityAttrs] = defineField("activity_name")
const [businessName, businessNameAttrs] = defineField("business_name")
const [licenseStatus, licenseStatusAttrs] = defineField("license_status")
const [establishmentDate, establishmentDateAttrs] = defineField("establishment_date")
const [licensingAuthority, licensingAuthorityAttrs] = defineField("licensing_authority")
const [activityNameArabic, activityNameArabicAttrs] = defineField("activity_name_arabic")
const [businessNameArabic, businessNameArabicAttrs] = defineField("business_name_arabic")
const [stateId, stateIdAttrs] = defineField("state_id")
const [region, regionAttrs] = defineField("region")

// ✅ Watch for changes in props.companyData and update form
watch(
    () => props.tradeLicense,
    (newData) => {
        if (newData) {
            console.log(newData, "trade lincense");
            setFieldValue("license_number", newData.license_number);
            setFieldValue("address", newData.address);
            setFieldValue("legal_form", newData.legal_form);
            setFieldValue("cbls_number", newData.cbls_number);
            setFieldValue("expiry_date", newData.expiry_date);
            setFieldValue("phone_number", newData.phone_number);
            setFieldValue("license_status", newData.license_status);
            setFieldValue("establishment_date", newData.establishment_date);
            setFieldValue("licensing_authority", newData.licensing_authority);
            setFieldValue("activity_name_arabic", newData.activity_name_arabic);
            setFieldValue("business_name_arabic", newData.business_name_arabic);
            setFieldValue("business_name", newData.business_name);
            setFieldValue("activity_name", newData.activity_name);
            setFieldValue("state_id", newData?.state_id);
            setFieldValue("region", newData?.region);
        }
    },
    { deep: true, immediate: true }
);

watch(
    () => values, 
    (newVals) => {
        const rawValues = toRaw(newVals);
        emit("update", rawValues);
    },
    { deep: true }
);

const handleChangePhoneNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 9);
    if (value && value[0] !== "5") {
        value = "5" + value.slice(1);
    }
    e.target.value = value;
    if (value.length <= 9) {
        setFieldValue("phone_number", e.target.value);
    }
}
</script>

<template>
    <div class="flex flex-wrap flex-col gap-2">
        <div class="flex-1 inline-flex flex-row gap-4">
            <div class="w-full">
                <label class="block text-sm !font-bold">License No:</label>
                <input type="text" v-model="licenseNumber" v-bind="licenseNumberAttrs"
                    class="w-full border disabled:bg-gray-200 disabled:text-gray-500 p-2 rounded outline-0 focus:outline-0" />
            </div>
            <div class="w-full">
                <label class="block text-sm !font-bold">Address:</label>
                <input type="text" v-model="address" v-bind="addressAttrs"
                    class="w-full border p-2 rounded outline-0 focus:outline-0" />
                <span class="text-red-500 text-sm">{{ errors?.address }}</span>
            </div>
            <div class="w-full">
                <label class="block text-sm !font-bold">Legal Form:</label>
                <input type="text" v-model="legalForm" v-bind="legalFormAttrs"
                    class="w-full border p-2 rounded outline-0 focus:outline-0" />
                <span class="text-red-500 text-sm">{{ errors?.legal_form }}</span>
            </div>
        </div>

        <div class="flex-1 inline-flex flex-row gap-4">
            <div class="w-full">
                <label class="block text-sm !font-bold">Cbls No:</label>
                <input type="text" v-model="cblsNumber" v-bind="cblsNumberAttrs"
                    class="w-full border disabled:bg-gray-200 disabled:text-gray-500 p-2 rounded outline-0 focus:outline-0" />
            </div>
            <div class="w-full">
                <label class="block text-sm !font-bold">Expiry Date:</label>
                <input type="date" v-model="expiryDate" v-bind="expiryDateAttrs"
                    class="w-full border p-2 rounded outline-0 focus:outline-0" />
                <span class="text-red-500 text-sm">{{ errors?.expiry_date }}</span>
            </div>
            <div class="w-full">
                <label class="block text-sm !font-bold">Phone No:</label>
                <input type="number" @change="handleChangePhoneNumber" v-model="phoneNumber" v-bind="phoneNumberAttrs"
                    class="w-full border p-2 rounded outline-0 focus:outline-0" />
                <span class="text-red-500 text-sm">{{ errors?.phone_number }}</span>
            </div>
        </div>

        <div class="flex-1 inline-flex flex-row gap-4">
            <div class="w-full">
                <label class="block text-sm !font-bold">License Status:</label>
                <input type="text" v-model="licenseStatus" v-bind="licenseStatusAttrs"
                    class="w-full border disabled:bg-gray-200 disabled:text-gray-500 p-2 rounded outline-0 focus:outline-0" />
            </div>
            <div class="w-full">
                <label class="block text-sm !font-bold">Establishment Date:</label>
                <input type="date" v-model="establishmentDate" v-bind="establishmentDateAttrs"
                    class="w-full border p-2 rounded outline-0 focus:outline-0" />
                <span class="text-red-500 text-sm">{{ errors?.establishment_date }}</span>
            </div>
            <div class="w-full">
                <label class="block text-sm !font-bold">License Authority:</label>
                <input type="text" v-model="licensingAuthority" v-bind="licensingAuthorityAttrs"
                    class="w-full border p-2 rounded outline-0 focus:outline-0" />
                <span class="text-red-500 text-sm">{{ errors?.licensing_authority }}</span>
            </div>
        </div>

        <div class="flex-1 inline-flex flex-row gap-4">
            <div class="w-full">
                <label class="block text-sm !font-bold">Activity Name Arabic:</label>
                <input type="text" v-model="activityNameArabic" v-bind="activityNameArabicAttrs"
                    class="w-full border disabled:bg-gray-200 disabled:text-gray-500 p-2 rounded outline-0 focus:outline-0" />
            </div>
            <div class="w-full">
                <label class="block text-sm !font-bold">Business Name Arabic:</label>
                <input type="text" v-model="businessNameArabic" v-bind="businessNameArabicAttrs"
                    class="w-full border p-2 rounded outline-0 focus:outline-0" />
                <span class="text-red-500 text-sm">{{ errors?.business_name_arabic }}</span>
            </div>
        </div>

        <div class="flex-1 inline-flex flex-row gap-4">
            <div class="w-full">
                <label class="block text-sm !font-bold">Business Name:</label>
                <input type="text" v-model="businessName" v-bind="businessNameAttrs"
                    class="w-full border disabled:bg-gray-200 disabled:text-gray-500 p-2 rounded outline-0 focus:outline-0" />
            </div>
            <div class="w-full">
                <label class="block text-sm !font-bold">Business Zone:</label>
                <select v-model="region" v-bind="regionAttrs" class="!w-full !text-[16px] border disabled:bg-gray-200 disabled:text-gray-500 p-2 rounded outline-0 focus:outline-0">
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Dhabi">Dubai</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Umm AI Quwain">Umm AI Quwain</option>
                    <option value="Ras AI Khaimah">Ras AI Khaimah</option>
                    <option value="Fujairah">Fujairah</option>
                </select>
                <span class="text-red-500 text-sm">{{ errors?.region }}</span>
            </div>
        </div>

        <div class="flex-1 inline-flex flex-row gap-4">
            <div class="w-full">
                <label class="block text-sm !font-bold">Activity:</label>
                <textarea rows="2" v-model="activity" v-bind="activityAttrs"
                    class="w-full border disabled:bg-gray-200 disabled:text-gray-500 p-2 rounded outline-0 focus:outline-0"></textarea>
            </div>
        </div>
    </div>
</template>
