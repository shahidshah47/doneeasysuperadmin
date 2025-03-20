<template>
  <div class="col-md-4">
    <div class="!bg-light-lilac rounded-xl p-3">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <span
            class="badge text-dark !py-2"
            :style="{ backgroundColor: badgeBgColor }"
          >
            {{ badgeText }}
          </span>
          <p class="fw-bold mb-0 mt-2" :style="{ color: '#2e2e2e' }">
            {{ paymentDescription }}
          </p>
          <p class="!text-dark-indigo-100 mb-0" style="font-size: 14px">
            {{ paymentDate }}
          </p>
        </div>
        <div class="bg-white-100 p-2 !rounded-lg text-end !pl-10">
          <p class="fw-semibold mb-0">
            <span class="!text-sm !text-dm-blue font-theme mr-1">{{
              currency
            }}</span>
            <span class="!text-[20px] !text-dm-blue font-theme">{{
              amount
            }}</span>
          </p>
          <span class="text-accent-green text-sm font-semibold">{{
            status
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
  },
};
</script>

<style scoped>
.card {
  max-width: 100%;
}
</style>
