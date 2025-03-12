<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { watch, defineProps, defineEmits } from "vue";

const props = defineProps({
    showModal: Boolean,
    companyData: Object,
});

const emit = defineEmits(["submit", "close"]);

// Validation Schema
const schema = yup.object({
    name: yup.string().required("Company name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().matches(/^[0-9]{10}$/, "Phone must be 10 digits").required("Phone is required"),
    address: yup.string().required("Address is required"),
});

// Form Initialization
const { handleSubmit, resetForm, setValues } = useForm({ validationSchema: schema });

const name = useField("name");
const email = useField("email");
const phone = useField("phone");
const address = useField("address");

// Watch for changes (for editing)
watch(
    () => props.companyData,
    (newData) => {
        if (newData) {
            setValues(newData);
        }
    },
    { deep: true, immediate: true }
);

// Handle Submit
const onSubmit = handleSubmit((values) => {
    emit("submit", values);
    resetForm();
    emit("close"); // Close modal after submission
});
</script>

<template>
    <!-- Modal Overlay -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-bold mb-4">{{ companyData ? "Edit Company" : "Create Company" }}</h2>

            <form @submit.prevent="onSubmit" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium">Company Name:</label>
                    <input v-model="name.value" type="text" class="w-full border p-2 rounded" />
                    <span class="text-red-500 text-sm">{{ name.errorMessage }}</span>
                </div>

                <div>
                    <label class="block text-sm font-medium">Email:</label>
                    <input v-model="email.value" type="email" class="w-full border p-2 rounded" />
                    <span class="text-red-500 text-sm">{{ email.errorMessage }}</span>
                </div>

                <div>
                    <label class="block text-sm font-medium">Phone:</label>
                    <input v-model="phone.value" type="text" class="w-full border p-2 rounded" />
                    <span class="text-red-500 text-sm">{{ phone.errorMessage }}</span>
                </div>

                <div>
                    <label class="block text-sm font-medium">Address:</label>
                    <input v-model="address.value" type="text" class="w-full border p-2 rounded" />
                    <span class="text-red-500 text-sm">{{ address.errorMessage }}</span>
                </div>

                <div class="flex justify-end space-x-2">
                    <button type="button" @click="emit('close')" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>
