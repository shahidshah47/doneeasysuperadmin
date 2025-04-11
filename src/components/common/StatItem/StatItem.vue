<template>
  <div class="stat-item">
    <h2 class="stat-title">{{ title }}</h2>
    <p class="stat-value">
      <span v-if="currency" class="currency">{{ currency }}</span> {{ value }}
    </p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  title: String,
  value: [String, Number],
  currency: {
    type: String,
    default: null,
  },
});
</script>

<style scoped>
.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-title {
  color: #5825eb;
  font-size: 14.5px;
  font-weight: 600;
}

.stat-value {
  color: #0e0d35;
  font-size: 24px;
  font-weight: 700;
  margin-top: 6px;
}

.currency {
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
}
</style>
