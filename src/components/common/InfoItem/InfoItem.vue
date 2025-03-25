<template>
  <div>
    <p class="mb-0 text-primary small-font">{{ label }}</p>
    <p class="fw-semibold">
      <span :class="[valueClass, 'fs-5']">{{ value }} </span>
      <span v-if="unit" class="ml-1 !text-grayColor !text-sm">{{ unit }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Distance",
    },
    value: {
      type: [Number, String],
      required: true,
    },
    unit: {
      type: String,
      default: "",
    },
    valueClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.small-font {
  font-size: 0.875rem;
}
</style>
