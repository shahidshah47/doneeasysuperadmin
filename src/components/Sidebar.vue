<template>
  <div class="flex flex-col items-center justify-between gap-4 py-10 pt-4 px-4 h-full">
    <div class="flex flex-col items-center justify-center gap-4">
      <img :src="getImagePath('Logo.png')" alt="Logo" class="w-16">
      <ul class="nav flex-col items-center gap-2 bg-gray-100 rounded-3xl p-3" id="sidebar-menu">
        <li v-for="(item, index) in sidebarItems" :key="index" class="list-item">
          <a class="hover:bg-white hover:rounded-full" href="#">
            <img :src="getImagePath(item.image)" />
          </a>
        </li>
      </ul>
    </div>
    <img :src="getImagePath('Frame 48096327.png')">
  </div>
</template>

<script setup>
import { ref } from 'vue';

const getImagePath = (imageName) => {
  return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};

const sidebarItems = ref([
  { icon: "fas fa-user-circle", image: "Component 11.png" },
  { icon: "fas fa-wallet", image: "Component 12.png" },
  { icon: "fas fa-history", image: "Component 9.png" },
  { icon: "fas fa-cog", image: "Component 20.png" },
  { icon: "fas fa-sign-out-alt", image: "Component 8.png" },
  { icon: "fas fa-history", image: "Component 9.png" },
  { icon: "fas fa-cog", image: "Component 20.png" },
  { icon: "fas fa-cog", image: "Component 20.png" },
  { icon: "fas fa-user-circle", image: "Component 11.png" },
  { icon: "fas fa-wallet", image: "Component 20.png" },
  { icon: "fas fa-history", image: "Component 9.png" },
  { icon: "fas fa-cog", image: "Component 20.png" },
]);
</script>

<style scoped>
.list-item {
  transition: all 0.2s ease-in-out;
}
.list-item:hover {
  background-color: #ffffff;
  border-radius: 50%;
}
</style>