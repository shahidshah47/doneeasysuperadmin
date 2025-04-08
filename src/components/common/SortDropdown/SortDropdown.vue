<template>
  <div class="relative">
    <label
      v-if="label"
      for="sort"
      class="block text-base font-semibold text-dm-blue"
    >
      {{ label }}
    </label>
    <Select
      v-model="selectedOption"
      :options="options"
      option-label="label"
      option-value="value"
      placeholder="Select Sort Option"
      :class="dropdownClass"
      @blur="handleBlur"
    >
      <template #item="{ item }">
        <div
          class="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer"
        >
          {{ item.label }}
        </div>
      </template>
    </Select>
    <p v-if="errors" class="text-red-500 text-xs mt-1">
      {{ errors }}
    </p>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useField } from "vee-validate";
import Select from "primevue/select";

// Props
const props = defineProps({
  label: String,
  options: {
    type: Array,
    required: true,
  },
  dropdownClass: String,
});

// Default classes
const defaultClass =
  "w-full mt-2 !border-none rounded-lg w-full shadow-sm focus:ring-2 focus:ring-vivid-purple focus:outline-none !bg-light-lilac";

// Vee-validate integration
const { value: selectedOption, errorMessage, handleBlur } = useField("sort");
const errors = computed(() => errorMessage.value);

// Automatically select the first option by default if no value is selected
watch(
  () => props.options,
  (newOptions) => {
    if (!selectedOption.value && newOptions.length > 0) {
      selectedOption.value = newOptions[0].value;
    }
  },
  { immediate: true }
);

// Combine default and dynamic classes
const dropdownClass = computed(
  () => `${defaultClass} ${props.dropdownClass || ""}`
);
</script>

<style scoped></style>
