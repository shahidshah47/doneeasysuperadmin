<template>
  <div
    class="bg-white-100 p-4 rounded-lg shadow-lavendar-card flex items-center gap-3"
  >
    <img :src="imagePath" alt="badge-icon" class="w-10 h-10" />
    <p class="text-dm-blue font-semibold text-base m-0">{{ text }}</p>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

// Compute the image path using new URL
const imagePath = computed(() => {
  return new URL(`../../../assets/image/${props.image}`, import.meta.url).href;
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
