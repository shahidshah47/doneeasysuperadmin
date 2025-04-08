<template>
  <div class="bg-white-100 rounded-xl flex flex-col items-start p-4 h-full">
    <p class="mb-1 fw-bold">{{ title }}</p>
    <h1 class="mt-2 fw-bolder">{{ number }}</h1>
    <a
      href="#"
      class="!text-vivid-purple !text-xs !font-bold text-decoration-none !uppercase mt-4"
    >
      {{ linkText }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    linkText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Add any custom styling here */
</style>
