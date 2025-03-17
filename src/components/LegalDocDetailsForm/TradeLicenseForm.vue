<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { watch, defineProps, defineEmits, ref } from "vue";

const emit = defineEmits(["submit", "close"]);

const props = defineProps({
    tradeLicense: Object
});

// ✅ Define validation schema
const schema = yup.object({
    trn_number: yup.string().required("TRN number is required"),
    legal_name: yup.string().required("Legal name is required"),
    legal_name_list: yup.string().required("Legal name list is required"),
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
    }
});

// ✅ Use fields correctly
const [trnNumber, trnNumberAttrs] = defineField('trn_number');
const [legalName, legalNameAttrs] = defineField('legal_name');
const [legalNameList, legalNameListAttrs] = defineField('legal_name_list');

// ✅ Watch for changes in props.companyData and update form
watch(
    () => props.tradeLicense,
    (newData) => {
        if (newData) {
            console.log(newData, "new data trade license");
        }
    },
    { deep: true, immediate: true }
);

// ✅ Handle form submission correctly
const onSubmit = handleSubmit((values) => {
    emit("submit", values);
    resetForm();
});

</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="p-6 flex flex-wrap flex-col gap-2">
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label for="licenseNo" class="form-label">License No</label>
                    <input type="text" class="form-control" id="licenseNo" value="DMCC-070547"
                        placeholder="please enter license number ">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address"
                        value="Bur Dubai Dubai Investments Park 1"
                        placeholder="please enter complete address">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="legalForm" class="form-label">Legal Form</label>
                    <input type="text" class="form-control" id="legalForm"
                        value="شركة ذات مسؤولية محدودة" placeholder="please enter your legal form">
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 mb-3">
                    <label for="cbisNo" class="form-label">Cbls No.</label>
                    <input type="text" class="form-control" id="cbisNo" value="11457714"
                        placeholder="please enter Cbls No.">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="expiryDate" class="form-label">Expiry Date</label>
                    <input type="text" class="form-control" id="expiryDate" value="2024-09-14"
                        placeholder="please enter Expiry Date">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="phoneNo" class="form-label">Phone No</label>
                    <input type="text" class="form-control" id="phoneNo" value="+973 375412"
                        placeholder="please enter Phone No">
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 mb-3">
                    <label for="licenseStatus" class="form-label">License Status</label>
                    <input type="text" class="form-control" id="licenseStatus" value="فعال"
                        placeholder="Please enter License Status">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="establishmentDate" class="form-label">Establishment Date</label>
                    <input type="text" class="form-control" id="establishmentDate"
                        value="2015-09-15" placeholder="please enter Establishment Date">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="licenseAuthority" class="form-label">License Authority</label>
                    <input type="text" class="form-control" id="licenseAuthority"
                        value="مركز في السلعة المتحدة	"
                        placeholder="please enter License Authority">
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="activityArabic" class="form-label">Activity Name Arabic</label>
                    <input type="text" class="form-control" id="activityArabic"
                        value="Delivery Services">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="businessArabic" class="form-label">Business Name Arabic</label>
                    <input type="text" class="form-control" id="businessArabic"
                        value="إنستاشوب دي إم سي سي">
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="businessName" class="form-label">Business Name</label>
                    <input type="text" class="form-control" id="businessName"
                        value="INSTASHOP DMCC">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="businessZone" class="form-label">Business Zone</label>
                    <select class="form-select" id="businessZone">
                        <option value="1" selected>Dubai</option>
                        <option value="2">Saudi Arabia</option>
                        <option value="3">Abu Dhabi</option>
                    </select>
                </div>
            </div>

            <div class="mb-3">
                <label for="activity" class="form-label">Activity</label>
                <textarea class="form-control" id="activity"
                    rows="2">Software House, Computer Systems Consultancies, Web-Design, Internet Content Provider (DMCC), Delivery</textarea>
            </div>
        </div>

        <div class="flex justify-end gap-2 space-x-2 flex-1/2 p-4 border-t">
            <button type="button" @click="emit('close')"
                class="px-4 py-2 bg-transparent border !rounded-xl text-gray-400">Cancel</button>
            <button type="submit" class="btn btn-primary min-w-24 !font-bold">Save</button>
        </div>
    </form>
</template>
