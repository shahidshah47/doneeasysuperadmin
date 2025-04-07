<template>
  <div class="flex justify-between items-center mb-4">
    <div class="fs-6">
      Feb 13, 2023
      <div class="fs-4 fw-bold">Hey, Jane Cooper</div>
    </div>
    <div class="d-flex gap-3">
      <button
        class="bg-vivid-purple text-white-100 align-items-center !rounded-lg px-3 py-0 !uppercase font-semibold"
      >
        <span class="leading-0 me-2 text-sm"
          ><i class="fa-solid fa-plus"></i
        ></span>
        Add
      </button>
      <button class="btn btn-light">
        <img :src="getImagePath('Messages.png')" />
      </button>
      <button class="btn btn-light">
        <img :src="getImagePath('Messages (2).png')" />
      </button>
      <button class="btn btn-light">
        <img :src="getImagePath('notification.png')" />
      </button>
    </div>
  </div>
</template>

<script setup>
const getImagePath = (imageName) => {
  return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};
</script>
