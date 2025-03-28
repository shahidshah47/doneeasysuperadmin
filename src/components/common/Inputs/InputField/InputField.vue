<template>
  <div class="input-field flex flex-col">
    <label
      v-if="label"
      :for="id"
      class="!text-base !text-dm-blue mb-2 block !font-bold"
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
        :value="modelValue"
        :name="name"
        :type="type"
        @input="$emit('update:modelValue', $event.target.value)" 
        @blur="$emit('blur')"
        v-bind="$attrs"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full !text-base !rounded-lg !text-dm-blue !resize-none focus:ring-0 disabled:!bg-lavender disabled:cursor-not-allowed !bg-light-lilac outline-none pl-4 !py-4 !pr-4"
        :class="{
          'pl-14': currency,
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
  name: String,
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
  onChange: Function,
  errorMessage: String,
  secondValue: [String, Number]
});

const emit = defineEmits(["update:modelValue", "blur"]);

// const value = computed({
//   get: () => props.modelValue,
//   set: (val) => {
//     emit("update:modelValue", val);
//   },
// });

// const handleInput = (event) => {
//   const newValue = event.target.value;
//   console.log(event.target.value, props.secondValue, "pidjasid");
//   emit("update:modelValue", newValue);
//   // emit("onChange", props.secondValue, newValue); // Explicitly emitting onChange event
// };

</script>
