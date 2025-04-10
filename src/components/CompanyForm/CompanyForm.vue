<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { watch, defineProps, defineEmits, ref } from "vue";
import CompanySize from "./CompanySize.vue";
import { formatToMonthDayYear } from "../../utils/helper";
import ThemeButton from "../common/ThemeButton/ThemeButton.vue";

const employees = ref(["1-10", "10-20", "20-50", "50-100", "100-500", "500+"]);
const props = defineProps({
  showCompanyModal: Boolean,
  companyData: Object,
  employees: Array,
  fieldIndex: Number,
  field: Object,
});

const emit = defineEmits(["submit", "close"]);

// ✅ Define validation schema
const schema = yup.object({
  name: yup.string().required("Company name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
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
    companyId: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    addedBy: "",
    companySize: "",
    joinedDate: "",
  },
});

// ✅ Use fields correctly
const [companyId, companyIdAttrs] = defineField("companyId");
const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [phone, phoneAttrs] = defineField("phone");
const [addedBy, addedByAttrs] = defineField("addedBy");
const [joinedDate, joinedDateAttrs] = defineField("joinedDate");
const [companySize, companySizeAttrs] = defineField("companySize");

// ✅ Watch for changes in props.companyData and update form
watch(
  () => props.companyData,
  (newData) => {
    if (newData) {
      setFieldValue("companyId", `ID: ${newData?.id}`);
      setFieldValue("name", newData?.company_name);
      setFieldValue("email", newData?.email);
      setFieldValue("phone", newData?.phone);
      setFieldValue("addedBy", newData?.added_by?.name || "John Smith");
      setFieldValue("joinedDate", formatToMonthDayYear(newData?.created_at));
      setFieldValue("companySize", newData?.company_size);
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

// ✅ Update companySize correctly
const handleCompSizeSelect = (heading) => {
  companySize.value = heading;
};
</script>

<template>
  <!-- Modal Overlay -->
  <div
    v-if="showCompanyModal"
    class="z-[99999] left-0 right-0 bottom-0 top-0 overflow-auto backdrop-blur-[12px] bg-opacity-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="relative bg-white rounded-3xl overflow-hidden">
      <div
        class="bg-gray-200 px-4 py-3 relative flex gap-2 justify-between items-center"
      >
        <h2 class="!text-lg !font-bold mb-0">
          {{ companyData ? "Company Detail" : "Company Detail" }}
        </h2>
        <button type="button" @click="emit('close')">
          <i class="fa-solid fa-xmark text-dm-blue"></i>
        </button>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="p-6 flex flex-wrap flex-col gap-2">
          <div class="flex-1 inline-flex flex-row gap-4">
            <div class="w-full">
              <label class="block text-sm !font-bold mb-1">Company ID</label>
              <input
                type="text"
                disabled
                v-model="companyId"
                class="w-full disabled:bg-lavender disabled:text-grayColor p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac"
              />
            </div>
            <div class="w-full">
              <label class="block text-sm !font-bold mb-1">Company Name</label>
              <input
                type="text"
                v-model="name"
                v-bind="nameAttrs"
                name="name"
                class="w-full p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac"
              />
              <span class="text-red-500 text-sm">{{ errors?.name }}</span>
            </div>
          </div>

          <div class="flex-1">
            <label class="block text-sm !font-bold mb-1" for="company_size"
              >Company Size</label
            >
            <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              <CompanySize
                :image_width="37"
                :image_height="37"
                v-for="(value, index) in employees"
                :key="index"
                :heading="value"
                :isSelected="companySize === value"
                @handleSelect="handleCompSizeSelect"
              />
            </div>
          </div>

          <div class="flex-1 inline-flex flex-row gap-4">
            <div class="flex-1">
              <label class="block text-sm !font-bold mb-1">HQ Phone No.</label>
              <input
                type="text"
                v-model="phone"
                v-bind="phoneAttrs"
                name="phone"
                class="w-full p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac"
              />
              <span class="text-red-500 text-sm">{{ errors?.phone }}</span>
            </div>

            <div class="flex-1">
              <label class="block text-sm !font-bold mb-1">HQ Email</label>
              <input
                type="email"
                v-model="email"
                v-bind="emailAttrs"
                name="email"
                class="w-full p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac"
              />
              <span class="text-red-500 text-sm">{{ errors?.email }}</span>
            </div>
          </div>

          <div class="flex-1 inline-flex flex-row gap-4">
            <div class="flex-1">
              <label class="block text-sm !font-bold mb-1">Added By</label>
              <input
                type="text"
                disabled
                v-model="addedBy"
                class="w-full disabled:bg-lavender disabled:text-grayColor p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac"
              />
            </div>

            <div class="flex-1">
              <label class="block text-sm !font-bold mb-1">Joined Date</label>
              <input
                type="text"
                disabled
                v-model="joinedDate"
                name="joined_date"
                class="w-full disabled:bg-lavender disabled:text-grayColor p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac"
              />
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
