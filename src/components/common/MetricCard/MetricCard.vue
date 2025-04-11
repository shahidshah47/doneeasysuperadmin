<template>
  <div class="bg-light-lilac p-3 rounded-xl mb-4 col-span-1">
    <div class="">
      <div class="d-flex justify-content-between">
        <p class="mb-0 text-sm font-semibold text-vivid-purple">{{ title }}</p>
        <img
          src="../../../assets/image/icons/hamburger.svg"
          alt="trash-icon"
          class="w-5 h-5 cursor-pointer"
          data-bs-toggle="modal"
          data-bs-target="#totalRevenueModal"
        />
      </div>
      <p class="mt-3 mb-0">
        <span class="text-sm font-semibold text-dm-blue">{{ currency }}</span>
        <span class="fs-3 font-bold text-2xl ms-2 text-dm-blue">{{
          amount
        }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  currency: {
    type: String,
    default: "AED",
  },
  amount: [String, Number],
  modalTarget: String,
  bgColor: {
    type: String,
    default: "#F2F4FB",
  },
});
</script>
