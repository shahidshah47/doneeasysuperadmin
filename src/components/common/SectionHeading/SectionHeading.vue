<template>
  <h5 :class="customClass">
    <slot>{{ title }}</slot>
  </h5>
</template>

<script>
export default {
  name: "SectionHeading",
  props: {
    title: {
      type: String,
      default: "Detail",
    },
    customClass: {
      type: String,
      default: "section-heading",
    },
  },
};
</script>

<style scoped></style>
