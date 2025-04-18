<template>
  <div class="flex items-center">
    <div class="flex-shrink-0 mr-3">
      <div
        class="w-8 h-8 !bg-light-lilac shadow-lavendar-card flex items-center justify-center"
      >
        <img :src="image" alt="Notification Icon" />
      </div>
    </div>
    <div class="flex flex-col">
      <p class="!text-dm-blue !font-normal !text-sm m-0">
        {{ message }}
      </p>
      <div class="flex text-grayColor text-sm mt-1">
        <span>{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: String,
  message: String,
  date: String,
});
</script>

<style scoped>
img {
  border-radius: 10px;
}
</style>
