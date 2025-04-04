<template>
  <Modal
    :isVisible="isVisible"
    :modalStyles="modalStyles"
    @update:isVisible="closeModal"
  >
    <div class="modal-content rounded-4">
      <div
        class="flex flex-row items-center justify-between !bg-light-lilac rounded-tl-2xl rounded-tr-2xl px-6 py-2"
      >
        <h2 class="!text-[20px] !font-semibold text-dm-blue m-0">
          Edit/Add Material
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
          class="flex flex-col !bg-white-100 rounded-bl-2xl rounded-br-2xl py-3 shadow-soft-blue space-y-4"
        >
          <div class="px-6 flex flex-col gap-3">
            <TextareaField label="Item No 1" :rows="2" :disabled="false" />

            <InputField
              label="Unit Price"
              v-model="unitPrice"
              type="number"
              currency="AED"
            />

            <InputField
              label="Quantity"
              v-model="quantity"
              type="number"
              currency="AED"
            />

            <InputField
              label="Total"
              :modelValue="total"
              type="number"
              disabled
              currency="AED"
            />

            <CheckboxField
              v-model="applyToVerticals"
              label="Apply this subscription to verticals"
              id="apply-to-verticals"
            />

            <InputField label="Procurement/lead time" type="text" />
          </div>
          <div
            class="flex justify-end gap-3 border-t-[1.5px] py-6 border-solid border-soft-pastel-blue px-6"
          >
            <ThemeButton label="Cancel" @click="closeModal" />
            <ThemeButton
              label="Save"
              variant="primary"
              type="submit"
              @click="handleSave"
            />
          </div>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import TextareaField from "../Inputs/TextareaField/TextareaField.vue";
import InputField from "../Inputs/InputField/InputField.vue";
import CheckboxField from "../Inputs/CheckboxField/CheckboxField.vue";
import ThemeButton from "../ThemeButton/ThemeButton.vue";
import Modal from "../Modal/Modal.vue";

const isVisible = ref(true);
const screenWidth = ref(window.innerWidth);
const screenHeight = ref(window.innerHeight);
const applyToVerticals = ref(false);

const unitPrice = useField("unitPrice");
const quantity = useField("quantity");

const schema = yup.object({
  unitPrice: yup
    .number()
    .typeError("Unit Price must be a number")
    .required("Unit Price is required")
    .positive("Unit Price must be greater than zero"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .integer("Quantity must be a whole number"),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit((values) => {
  console.log("Form submitted successfully:", values);
});

const modalStyles = computed(() => ({
  width: screenWidth.value < 768 ? "90vw" : "45vw",
  height: screenHeight.value < 600 ? "80vh" : "auto",
  maxHeight: "90vh",
}));

const total = computed(() => (unitPrice.value || 0) * (quantity.value || 0));

const closeModal = () => {
  isVisible.value = false;
  // Use the event emitting mechanism if needed
  // emit('close');
};

const updateScreenSize = () => {
  screenWidth.value = window.innerWidth;
  screenHeight.value = window.innerHeight;
};

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<style scoped>
/* You can customize modal styles here if needed */
</style>
