<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { watch, defineProps, defineEmits, ref } from "vue";

const emit = defineEmits(["submit", "close"]);

const props = defineProps({
    emiratesData: Object
})

// ✅ Define validation schema
const schema = yup.object({
    client_id: yup.string().required("Company ID is required"),
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
        client_id: "",
        emirates_id: "",
        nationality: "",
        dob: "",
    }
});

// ✅ Use fields correctly
const [clientId, clientIdAttrs] = defineField('client_id');
const [emiratesId, emiratesIdAttrs] = defineField('emirates_id');
const [nationality, nationalityAttrs] = defineField('nationality');
const [dob, dobAttrs] = defineField('dob');

// ✅ Watch for changes in props.companyData and update form
watch(
    () => props.emiratesData,
    (newData) => {
        if (newData) {
            const { verification_result: { response } } = newData;
            const { success, data } = JSON.parse(response);
            if (success) {
                setFieldValue("dob", data?.dob);
                setFieldValue("client_id", data?.client_id);
                setFieldValue("emirates_id", data?.emirates_id);
                setFieldValue("nationality", data?.nationality);
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
                    <label class="block text-sm !font-bold">Entered Emirates ID Number:</label>
                    <input type="text" v-model="clientId" disabled
                        class="w-full border disabled:bg-gray-200 disabled:text-gray-500 p-2 rounded outline-0 focus:outline-0" />
                </div>
                <div class="w-full">
                    <label class="block text-sm !font-bold">Response Emirates ID:</label>
                    <input type="text" v-model="emiratesId" v-bind="emiratesIdAttrs" name="emiratesId"
                        class="w-full border p-2 rounded outline-0 focus:outline-0" />
                    <span class="text-red-500 text-sm">{{ errors?.emiratesId }}</span>
                </div>
            </div>

            <div class="flex-1 inline-flex flex-row gap-4">
                <div class="flex-1">
                    <label class="block text-sm !font-bold">Nationality:</label>
                    <input type="text" v-model="nationality" v-bind="nationalityAttrs" name="nationality"
                        class="w-full border p-2 rounded outline-0 focus:outline-0" />
                    <span class="text-red-500 text-sm">{{ errors?.nationality }}</span>
                </div>

                <div class="flex-1">
                    <label class="block text-sm !font-bold">DOB:</label>
                    <input type="date" v-model="dob" v-bind="dobAttrs" name="dob"
                        class="w-full border p-2 rounded outline-0 focus:outline-0" />
                    <span class="text-red-500 text-sm">{{ errors?.dob }}</span>
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
