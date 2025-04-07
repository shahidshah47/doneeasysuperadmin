<template>
  <div
    v-for="(item, index) in stats"
    :key="index"
    class="inline-flex flex-col gap-2"
  >
    <p class="text-sm font-semibold leading-3.5 text-vivid-purple m-0">
      {{ item.label }}
    </p>
    <h5 class="font-theme-bold !text-2xl">
      <span
        v-if="item.prefix"
        class="text-[14px] leading-3.5 text-dm-blue font-theme font-semibold mr-1"
      >
        {{ item.prefix }}
      </span>
      {{ item.value ?? 0 }}
    </h5>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  companyData: {
    type: Object,
    required: true,
    default: () => ({ company: {} }),
  },
});

const stats = computed(() => {
  const company = props.companyData?.company || {};
  return [
    {
      label: "Total Revenue Generated",
      value: company.org_revenue_sum ?? 0,
      prefix: "AED",
    },
    {
      label: "No. of Order Completed",
      value: company.completed_order ?? 0,
    },
    {
      label: "No. of Verticals",
      value: company.verticles_count ?? 0,
    },
  ];
});
</script>
