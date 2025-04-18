<template>
  <Modal
    :isVisible="isVisible"
    :modalStyles="modalStyles"
    @update:isVisible="closeModal"
  >
    <div
      class="flex flex-row items-center justify-between !bg-light-lilac rounded-tl-2xl rounded-tr-2xl px-6 py-2"
    >
      <h2 class="!text-base !font-semibold text-dm-blue m-0">
        Edit/Add Service
      </h2>
      <button
        @click="closeModal"
        class="text-dm-blue hover:text-black !text-2xl font-semibold"
        type="button"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form @submit.prevent="onSubmit">
      <div
        class="flex flex-col !bg-white-100 rounded-bl-2xl rounded-br-2xl py-3 shadow-soft-blue space-y-4 overflow-y-auto vivid-scrollbar max-h-screen"
      >
        <div class="px-6 flex flex-col gap-3">
          <InputField
            :label="serviceDetails?.item_number ?? itemNumber"
            name="title"
            v-model="title"
            v-bind="titleAttrs"
            type="text"
          />

          <TextareaField
            label="Service Description"
            name="description"
            :rows="2"
            v-model="description"
            v-bind="descriptionAttrs"
            :disabled="false"
          />
          <InputField
            label="Unit Price"
            name="unit_price"
            :secondValue="quantity"
            v-model="unit_price"
            v-bind="unit_priceAttrs"
            type="number"
            currency="AED"
          />
          <InputField
            label="Quantity"
            name="quantity"
            :secondValue="unit_price"
            v-model="quantity"
            v-bind="quantityAttrs"
            type="number"
            currency="AED"
          />
          <InputField
            label="Total"
            name="total"
            v-model="total"
            v-bind="totalAttrs"
            type="number"
            disabled
            currency="AED"
          />
          <DatePickerField
            name="delivery_time"
            label="Select Delivery Time"
            placeholder="Pick a date"
            v-model="delivery_time"
            v-bind="delivery_timeAttrs"
          />
        </div>
        <div
          class="flex justify-end gap-3 border-t-[1.5px] py-6 border-solid border-soft-pastel-blue px-6"
        >
          <ThemeButton label="Cancel" @click="closeModal" />
          <ThemeButton
            :label="serviceDetails ? 'Update' : 'Save'"
            variant="primary"
            type="submit"
          />
        </div>
      </div>
    </form>
  </Modal>
</template>

<script setup>
import {
  ref,
  defineEmits,
  defineProps,
  computed,
  onMounted,
  onUnmounted,
  watch,
  watchEffect,
} from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import TextareaField from "../Inputs/TextareaField/TextareaField.vue";
import InputField from "../Inputs/InputField/InputField.vue";
import ThemeButton from "../ThemeButton/ThemeButton.vue";
import DatePickerField from "../Inputs/DatePickerField/DatePickerField.vue";
import { formatDateAtMidnight, formatDateAtQuote } from "../../../utils/helper";
import api from "../../../api";
import { useRoute } from "vue-router";
import { useToast } from "primevue";
import Modal from "../Modal/Modal.vue";

const isVisible = ref(true);
const screenWidth = ref(window.innerWidth);
const screenHeight = ref(window.innerHeight);
const selectedDate = ref(null);
const route = useRoute();
const toast = useToast();

const props = defineProps({
  serviceDetails: Object,
  appointOfferId: Number,
  itemNumber: String,
});

const emit = defineEmits(["close"]);

// ✅ Define validation schema
const schema = yup.object({
  unit_price: yup
    .number()
    .typeError("Unit Price must be a number")
    .required("Unit Price is required")
    .positive("Unit Price must be greater than zero"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .integer("Quantity must be a whole number"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const { handleSubmit, setFieldValue, defineField, values } = useForm({
  validationSchema: schema,
  initialValues: {
    unit_price: "",
    quantity: 0,
    title: "",
    description: "",
    item_number: "",
    total: 0,
    delivery_time: "",
  },
});

const [id, idAttrs] = defineField("id");
const [item_number, item_numberAttrs] = defineField("item_number");
const [unit_price, unit_priceAttrs] = defineField("unit_price");
const [quantity, quantityAttrs] = defineField("quantity");
const [title, titleAttrs] = defineField("title");
const [description, descriptionAttrs] = defineField("description");
const [total, totalAttrs] = defineField("total");
const [delivery_time, delivery_timeAttrs] = defineField("delivery_time");

watch(
  () => props.serviceDetails,
  (newData) => {
    if (newData) {
      setFieldValue("id", newData.id);
      setFieldValue("title", newData.title);
      setFieldValue("item_number", newData.item_number);
      setFieldValue("description", newData.description);
      setFieldValue("unit_price", newData.unit_price);
      setFieldValue("quantity", newData.quantity);
      setFieldValue("delivery_time", newData.delivery_time);
      setFieldValue(
        "total",
        Number(newData.quantity) * Number(newData.unit_price)
      );
    } else {
      setFieldValue("item_number", props.itemNumber);
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => unit_price.value,
  (newVal) => {
    if (quantity.value) {
      total.value = Number(newVal) * Number(quantity.value);
    }
  }
);

watch(
  () => quantity.value,
  (newVal) => {
    if (unit_price.value) {
      total.value = Number(newVal) * Number(unit_price.value);
    }
  }
);

const modalStyles = computed(() => ({
  width: screenWidth.value < 768 ? "90vw" : "45vw",
  height: screenHeight.value < 600 ? "80vh" : "auto",
  maxHeight: "90vh",
}));

const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

const onSubmit = handleSubmit(async (values) => {
  // Validate required fields
  const requiredFields = [
    { field: "title", message: "Title is required" },
    { field: "description", message: "Description is required" },
    { field: "delivery_time", message: "Delivery time is required" },
    {
      field: "quantity",
      message: "Valid quantity is required",
      validate: (val) => val && !isNaN(Number(val)),
    },
    {
      field: "unit_price",
      message: "Valid unit price is required",
      validate: (val) => val && !isNaN(Number(val)),
    },
  ];

  if (!id.value && !values.item_number) {
    requiredFields.push({
      field: "item_number",
      message: "Item number is required",
    });
  }

  for (const { field, message, validate } of requiredFields) {
    if (
      (validate && !validate(values[field])) ||
      (!validate && !values[field])
    ) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: message,
        life: 3000,
      });
      return;
    }
  }

  // Prepare common payload
  const payload = {
    ...values,
    quantity: Number(values.quantity),
    unit_price: Number(values.unit_price),
    sub_total: values.total,
    delivery_time: formatDateAtQuote(values.delivery_time),
    ...(!id.value && {
      item_number: values.item_number,
      total: values.total,
    }),
  };

  try {
    const endpoint = `/superadmin/user/appointment/offer/${props.appointOfferId}/services/add-update`;
    const response = await api.post(endpoint, payload);

    if (response?.status === 200) {
      closeModal();
      toast.add({
        severity: "success",
        summary: "Success",
        detail: response?.data?.message,
        life: 3000,
      });
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.response?.data?.message || "Something went wrong!",
      life: 3000,
    });
  }
});

const updateScreenSize = () => {
  screenWidth.value = window.innerWidth;
  screenHeight.value = window.innerHeight;
};

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>
