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
            label="Item No."
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
  // console.log(values, formatDateAtQuote(values.delivery_time), "values");
  let response;
  if (id.value) {
    response = await api.post(
      "/superadmin/user/appointment/offer/" +
        props.appointOfferId +
        "/services/add-update",
      {
        ...values,
        quantity: Number(values.quantity),
        unit_price: Number(values.unit_price),
        sub_total: values.total,
        delivery_time: formatDateAtQuote(values.delivery_time),
      }
    );
  } else {
    response = await api.post(
      "/superadmin/user/appointment/offer/" +
        props.appointOfferId +
        "/services/add-update",
      {
        title: values.title,
        description: values.description,
        quantity: Number(values.quantity),
        unit_price: Number(values.unit_price),
        sub_total: values.total,
        item_number: values.item_number,
        delivery_time: formatDateAtQuote(values.delivery_time),
        total: values.total,
      }
    );
  }
  if (response && response?.status === 200) {
    closeModal();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: response?.data?.message,
      life: 3000,
    });
  } else {
    toast.error({
      severity: "error",
      summary: "Error",
      detail: "Something went wrong!",
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
