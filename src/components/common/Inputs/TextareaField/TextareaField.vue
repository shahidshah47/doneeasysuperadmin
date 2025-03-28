<template>
  <div class="textarea-field flex flex-col">
    <label
      v-if="label"
      :for="id"
      class="!text-base !text-dm-blue !font-semibold mb-2"
      >{{ label }}</label
    >
    <textarea
      :id="id"
      v-model="value"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      v-bind="$attrs"
      class="w-full pl-4 py-2 pr-4 !text-base !rounded-lg !text-dm-blue !resize-none focus:ring-0 disabled:bg-gray-100 disabled:cursor-not-allowed !bg-light-lilac outline-none"
      :class="{ 'border-red-500 focus:ring-red-500': errorMessage }"
    ></textarea>
    <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  label: String,
  modelValue: String,
  placeholder: String,
  rows: {
    type: Number,
    default: 3,
  },
  disabled: Boolean,
  id: {
    type: String,
    default: () => `textarea-${Math.random().toString(36).substr(2, 9)}`,
  },
  errorMessage: String,
});

const emit = defineEmits(["update:modelValue"]);
const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>
