<template>
  <div class="!bg-light-lilac rounded-xl p-3 col-span-1">
    <div class="d-flex align-items-center justify-content-between">
      <div>
        <span class="badge text-dark !py-2 font-bold" :style="{ backgroundColor: badgeBgColor }">
          {{ badgeText }}
        </span>
        <p class="!font-bold mb-0 mt-2" :style="{ color: '#2e2e2e' }">
          {{ paymentDescription }}
        </p>
        <p class="!text-dark-indigo-100 mb-0" style="font-size: 14px">
          {{ paymentDate }}
        </p>
      </div>
      <div class="bg-white-100 p-2 !rounded-lg text-end !pl-10">
        <p class="fw-bold mb-0">
          <span class="!text-sm !text-primary font-theme mr-1">{{
            currency
          }}</span>
          <span class="!text-[20px] !text-dm-blue font-theme">{{
            amount
          }}</span>
        </p>
        <span :class="statusClass" class="text-sm font-bold">{{
          status
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  badgeText: {
    type: String,
    required: true,
  },
  badgeBgColor: {
    type: String,
    default: "#d9d9d9",
  },
  paymentDescription: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  statusClass: String
});
</script>

<style scoped>
.card {
  max-width: 100%;
}
</style>
