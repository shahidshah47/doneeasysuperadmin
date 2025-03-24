<template>
  <button :type="type" :class="buttonClass" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "button",
    },
    variant: {
      type: String,
      default: "default",
    },
  },
  computed: {
    buttonClass() {
      return this.variant === "primary"
        ? "bg-primary text-white px-10 py-3 !rounded-2xl font-bold"
        : "border border-solid border-lavender-gray-2 text-lavender-gray-2 px-10 py-3 !rounded-2xl font-bold";
    },
  },
  emits: ["click"],
};
</script>
