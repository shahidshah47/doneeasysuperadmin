<template>
  <div class="flex flex-row items-center justify-between">
    <p class="category-label font-theme text-sm text-vivid-purple m-0">
      {{ category.label }}
    </p>
    <div class="flex items-center gap-2">
      <StarRating :rating="rating" :width="20" :height="20" />
    </div>
  </div>
</template>

<script setup>
import StarRating from "../../common/StarRating/StarRating.vue";

const props = defineProps({
  category: Object, // The category object containing label (e.g., 'communication')
  rating: Number, // The rating value for this category
});
</script>

<style scoped>
.category-label {
  font-weight: normal;
}
</style>
