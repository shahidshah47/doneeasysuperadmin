<template>
  <div class="flex justify-between items-center mb-4">
    <div class="font-semibold text-sm text-dm-blue">
      {{ joinDate }}
      <div class="text-2xl font-bold text-dm-blue capitalize">
        Hey, {{ userName }}
      </div>
    </div>
    <div class="d-flex gap-3">
      <button
        class="bg-vivid-purple text-white-100 align-items-center !rounded-lg px-3 py-0 !uppercase !font-bold"
      >
        <span class="leading-0 me-2 text-sm">
          <i class="fa-solid fa-plus"></i>
        </span>
        Add
      </button>
      <button class="hover:bg-white-100 p-2.5 !rounded-full">
        <img :src="getImagePath('Messages.png')" />
      </button>
      <button class="hover:bg-white-100 p-2.5 !rounded-full">
        <img :src="getImagePath('Messages (2).png')" />
      </button>
      <button class="hover:bg-white-100 p-2.5 !rounded-full">
        <img :src="getImagePath('notification.png')" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const userName = ref("");
const joinDate = ref("");

onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    userName.value = user.name;
    const rawDate = user.created_at || user.updated_at;
    if (rawDate) {
      const date = new Date(rawDate);
      joinDate.value = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  }
});

const getImagePath = (imageName) => {
  return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};
</script>
