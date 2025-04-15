<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { watch, defineProps, defineEmits, ref } from "vue";
import { formatToMonthDayYear } from "../../utils/helper";
import ThemeButton from "../common/ThemeButton/ThemeButton.vue";

const props = defineProps({
    showAddOrUpdateAdminModal: Boolean,
    adminData: Object
});

const emit = defineEmits(["submit", "close"]);

// ✅ Define validation schema
const schema = yup.object({
  fullname: yup.string().required("Full name is required"),
});

const {
  handleSubmit,
  values,
  errors,
  setValues,
  resetForm,
  defineField,
  setFieldValue,
} = useForm({
  validationSchema: schema,
  initialValues: {
    fullname: ""
  },
});

// ✅ Use fields correctly
const [fullname, fullnameAttrs] = defineField("fullname");

// ✅ Watch for changes in props.companyData and update form
watch(
  () => props.adminData,
  (newData) => {
    if (newData) {
      setFieldValue("fullname", "Mohsin Ikram");
    }
  },
  { deep: true, immediate: true }
);

// ✅ Handle form submission correctly
const onSubmit = handleSubmit((values) => {
  emit("submit", values);
  resetForm();
  emit("close");
});

</script>

<template>
  <!-- Modal Overlay -->
  <div
    v-if="showAddOrUpdateAdminModal"
    class="z-[99999] left-0 right-0 bottom-0 top-0 overflow-auto backdrop-blur-[12px] bg-opacity-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="relative bg-white rounded-3xl overflow-hidden">
      <div
        class="bg-gray-200 px-4 py-3 relative flex gap-2 justify-between items-center"
      >
        <h2 class="!text-lg !font-bold mb-0">
          {{ "Admin/Manager Details" }}
        </h2>
        <button type="button" @click="emit('close')">
          <i class="fa-solid fa-xmark text-dm-blue"></i>
        </button>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="p-6 flex flex-wrap flex-col gap-2">
          <div class="flex-1 inline-flex flex-row gap-4">
            <div class="w-full">
              <label class="block text-base !font-bold mb-1"
                >Company Name</label
              >
              <input
                type="text"
                v-model="fullname"
                v-bind="fullnameAttrs"
                name="name"
                class="w-full p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac"
              />
              <span class="text-red-500 text-sm">{{ errors?.name }}</span>
            </div>
          </div>
        </div>

        <div
          class="flex justify-end gap-2 space-x-2 flex-1/2 p-4 border-t border-solid border-soft-pastel-blue"
        >
          <ThemeButton label="Cancel" @click="emit('close')" />
          <ThemeButton :label="'Save'" variant="primary" type="submit" />
        </div>
      </form>
    </div>
  </div>
</template>
