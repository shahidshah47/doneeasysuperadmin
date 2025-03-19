<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { watch, defineProps, defineEmits, ref } from "vue";

const emit = defineEmits(["submit", "close"]);

const props = defineProps({
    trnData: Object
});

// ✅ Define validation schema
const schema = yup.object({
    trn_number: yup.string().required("TRN number is required"),
    legal_name: yup.string().required("Legal name is required"),
    legal_name_list: yup.string().required("Legal name list is required"),
});

// const { 
//     handleSubmit, values, errors, setValues, 
//     resetForm, defineField, setFieldValue 
// } = useForm({
//     validationSchema: schema,
//     initialValues: {
//         trn_number: "",
//         legal_name: "",
//         legal_name_list: "",
//     }
// });

// ✅ Use fields correctly
const [trnNumber, trnNumberAttrs] = defineField('trn_number');
const [legalName, legalNameAttrs] = defineField('legal_name');
const [legalNameList, legalNameListAttrs] = defineField('legal_name_list');

// ✅ Watch for changes in props.companyData and update form
watch(
    () => props.trnData,
    (newData) => {
        if (newData) {
            const { verification_result: { response } } = newData;
            const { success, data } = JSON.parse(response);
            if (success) {
                setFieldValue("trn_number", data?.trn_number);
                setFieldValue("legal_name", data?.legal_name);
                setFieldValue("legal_name_list", data?.legal_name_list.join(","));
            }
        }
    },
    { deep: true, immediate: true }
);

// ✅ Handle form submission correctly
// const onSubmit = handleSubmit((values) => {
//     emit("submit", values);
//     resetForm();
// });

</script>

<template>
    <!-- <form @submit.prevent="onSubmit"> -->
        <div class="p-6 flex flex-wrap flex-col gap-2">
            <div class="flex-1 inline-flex flex-row gap-4">
                <div class="w-full">
                    <label class="block text-sm !font-bold">TRN Number:</label>
                    <input type="text" v-model="trnNumber" v-bind="trnNumberAttrs" name="trn_number"
                        class="w-full border disabled:bg-gray-200 disabled:text-gray-500 p-2 rounded outline-0 focus:outline-0" />
                </div>
                <div class="w-full">
                    <label class="block text-sm !font-bold">Legal Name:</label>
                    <input type="text" v-model="legalName" v-bind="legalNameAttrs" name="legal_name"
                        class="w-full border p-2 rounded outline-0 focus:outline-0" />
                    <span class="text-red-500 text-sm">{{ errors?.legalName }}</span>
                </div>
            </div>

            <div class="flex-1 inline-flex flex-row gap-4">
                <div class="flex-1">
                    <label class="block text-sm !font-bold">Legal Names List:</label>
                    <input type="text" v-model="legalNameList" v-bind="legalNameListAttrs" name="legal_name_list"
                        class="w-full border p-2 rounded outline-0 focus:outline-0" />
                    <span class="text-red-500 text-sm">{{ errors?.legal_name_list }}</span>
                </div>
            </div>
        </div>

        <div class="flex justify-end gap-2 space-x-2 flex-1/2 p-4 border-t">
            <button type="button" @click="emit('close')"
                class="px-4 py-2 bg-transparent border !rounded-xl text-gray-400">Cancel</button>
            <button type="submit" class="btn btn-primary min-w-24 !font-bold">Save</button>
        </div>
    <!-- </form> -->
</template>
