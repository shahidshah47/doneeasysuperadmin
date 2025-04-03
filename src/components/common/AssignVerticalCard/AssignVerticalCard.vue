<template>
  <div class="rounded-xl border-0 bg-white mb-3">
    <div class="d-flex gap-3 align-items-center px-3 pt-3 mb-3">
      <div class="icon">
        <img :src="iconSrc" alt="Category Icon" width="40" />
      </div>
      <div class="category-title">
        <h6 class="mb-0 !font-semibold">{{ title }}</h6>
      </div>
    </div>

    <div class="flex bg-white rounded px-2 pb-3 flex-wrap gap-2">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="stats-section text-center py-1 px-3 rounded-3"
      >
        <p class="text-vivid-purple text-base font-semibold mb-0">
          {{ stat.value }}
        </p>
        <p class="m-0 text-xs font-semibold text-grayColor">{{ stat.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  stats: {
    type: Array,
    required: true,
  },
});

const iconSrc = computed(
  () => new URL(`../../../assets/images2/${props.icon}`, import.meta.url).href
);
</script>

<style scoped>
.stats-section {
  background-color: #f6f7fa;
}
</style>
