<template>
  <button
    type="button"
    :class="[buttonClass, className, '!uppercase', 'border-0']"
  >
    {{ text }}
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "View Details",
  },
  className: {
    type: String,
    default: "w-auto",
  },
  buttonType: {
    type: String,
    default: "primary",
  },
});

const buttonClass = computed(() => {
  return props.buttonType === "secondary"
    ? "primary-btn"
    : "theme-button-primary bg-mix-gradient";
});
</script>
