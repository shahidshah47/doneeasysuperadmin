<template>
  <div class="flex justify-between items-center mb-4">
    <div class="fs-6">Feb 13, 2023
      <div class="fs-4 fw-bold">Hey, Jane Cooper</div>
    </div>
    <div class="d-flex gap-3">
      <button class="btn btn-primary btn-sm align-items-center rounded-3 px-3 py-0">
        <span class="fs-5 leading-0 me-2">+</span>
        Add
      </button>
      <button class="btn btn-light">
        <img :src="getImagePath('Messages.png')">
      </button>
      <button class="btn btn-light">
        <img :src="getImagePath('Messages (2).png')">
      </button>
      <button class="btn btn-light">
        <img :src="getImagePath('notification.png')">
      </button>
    </div>
  </div>
</template>

<script setup>
const getImagePath = (imageName) => {
  return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};
</script>