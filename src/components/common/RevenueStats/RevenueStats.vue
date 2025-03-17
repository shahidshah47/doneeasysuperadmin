<template>
  <div
    v-for="(item, index) in stats"
    :key="index"
    class="inline-flex flex-col gap-2"
  >
    <p class="theme-label font-theme-bold leading-3.5">{{ item.label }}</p>
    <h5 class="font-theme-bold !text-2xl">
      <span
        v-if="item.prefix"
        class="text-[14px] leading-3.5 text-dm-blue font-theme font-semibold mr-1"
      >
        {{ item.prefix }}
      </span>
      {{ item.value || 0 }}
    </h5>
  </div>
</template>

<script>
export default {
  props: {
    companyData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    stats() {
      return [
        {
          label: "Total Revenue Generated",
          value: this.companyData?.company?.org_revenue_sum,
          prefix: "AED",
        },
        {
          label: "No. of Order Completed",
          value: this.companyData?.company?.completed_order,
        },
        {
          label: "No. of Verticals",
          value: this.companyData?.company?.verticles_count,
        },
      ];
    },
  },
};
</script>
