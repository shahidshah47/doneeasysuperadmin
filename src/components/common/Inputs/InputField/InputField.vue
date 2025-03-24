<template>
  <div class="input-field flex flex-col">
    <label
      v-if="label"
      :for="id"
      class="!text-base !text-dm-blue !font-semibold mb-2"
      >{{ label }}</label
    >
    <div class="relative">
      <span
        v-if="currency"
        class="absolute left-3 top-1/2 -translate-y-1/2 !text-dm-blue !text-base !font-semibold"
        >{{ currency }}</span
      >
      <input
        :id="id"
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        v-bind="$attrs"
        class="w-full !text-base !rounded-lg !text-dm-blue !resize-none focus:ring-0 disabled:!bg-lavender disabled:cursor-not-allowed !bg-light-lilac outline-none !py-4 !pr-4 !pl-14"
        :class="{
          'pl-10': currency,
          'border-red-500 focus:ring-red-500': errorMessage,
        }"
      />
    </div>
    <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  disabled: Boolean,
  currency: String,
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
  errorMessage: String,
});

const emit = defineEmits(["update:modelValue"]);
const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>
