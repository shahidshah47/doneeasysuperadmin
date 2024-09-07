<template>
  <div class="logo py-3 d-flex justify-content-center">
    <img :src="getImagePath('Logo.png')" alt="Logo">
  </div>
  <div class="py-2">
    <ul class="nav flex-column align-items-center" id="sidebar-menu">
      <li v-for="(item, index) in sidebarItems" :key="index" class="nav-item">
        <a class="nav-link py-2" href="#">
          <img :src="getImagePath(item.image)" />
        </a>
      </li>
    </ul>
  </div>
  <div class="py-3">
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
#sidebar-menu {
  background-color: #f2f4fb;
  border-radius: 66px;
  width: min-content;
}

.nav-link {
  color: #ffffff;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: background-color 0.3s;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 600;
  line-height: 12px;
}

.nav-link:hover {
  background-color: #ffffff;
  border-radius: 77px;
}
</style>