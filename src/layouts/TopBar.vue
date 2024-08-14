<script setup>
import { ref, onMounted } from 'vue';

const currentTime = ref('');

const updateDate = () => {
  const now = new Date();
  currentTime.value = now.toLocaleDateString();
};

onMounted(() => {
  updateDate();
});
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 justify-between">
      <div>
          <span>
            {{currentTime}}
          </span>
        <br/>
        <span class="text-2xl font-bold">
            Hey, Jane Cooper
          </span>
      </div>
      <div class="flex justify-end">
        <button type="button" class="me-5 mt-2 text-white bg-[#5825EB] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <span class="text-lg me-2">+</span>
          <span>ADD</span>
        </button>
        <img src="../assets/image/Messages.png" alt="" class="w-[45px] me-5">
        <img src="../assets/image/headphone.png" alt="" class="w-[45px] me-5">
        <img src="../assets/image/notification.png" alt="" class="w-[45px] me-5">
      </div>
    </div>

</template>

<style scoped>

</style>
