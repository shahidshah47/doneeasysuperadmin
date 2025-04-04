<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="!text-base !text-dm-blue mb-2 block !font-bold">{{
      label
    }}</label>
    <div class="relative">
      <VueDatePicker
        v-model="inputValue"
        :placeholder="placeholder"
        :class="[
          'w-full !text-base !rounded-lg !text-dm-blue !resize-none focus:ring-0 !bg-light-lilac outline-none !py-2.5',
          errorMessage ? 'border-red-500' : 'border-gray-300',
        ]"
        @update:model-value="updateValue"
        :auto-apply="true"
        time-picker-inline
      />
      <span v-if="icon" class="absolute right-3 top-3">
        <img :src="icon" alt="Calendar Icon" class="w-5 h-5" />
      </span>
    </div>
    <p v-if="errorMessage" class="text-red-500 text-xs">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useField } from "vee-validate";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  name: String,
  label: String,
  icon: String,
  placeholder: String,
});

const emit = defineEmits(["update:modelValue"]);

// Vee-Validate Field Setup
const { value: inputValue, errorMessage } = useField(props.name);

const updateValue = (value) => {
  inputValue.value = value;
  emit("update:modelValue", value);
};
</script>
<style>

.dp__input {
  background-color: transparent;
  color: var(--color-dm-blue);
  border: none;
}
</style>