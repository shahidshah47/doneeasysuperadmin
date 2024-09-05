<template>
  <div class="header">
    <div class="date">Feb 13, 2023
      <div class="greeting">Hey, Jane Cooper</div>
    </div>
    <div class="left-side-header d-flex gap-3">
      <button class="btn btn-primary">Add Vendor</button>
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
  <div class="d-flex justify-content-between align-items-center">
    <div class="vendor-title">Vendor</div>
    <div class="addvendorbuttons">
      <button class="btn btn-primary">Add Vendor</button>
    </div>
  </div>
</template>

<script setup>
const getImagePath = (imageName) => {
  return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};
</script>
