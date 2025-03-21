<template>
  <div class="flex flex-col items-center justify-between gap-0 px-3 h-full">
    <div class="flex flex-col items-center justify-between gap-4 py-8 h-full">
      <img :src="getImagePath('Logo.png')" alt="Logo" class="w-14">
      <ul class="nav flex-col items-center gap-2 bg-gray-100 rounded-full px-2 py-3" id="sidebar-menu">
        <li v-for="(item, index) in sidebarItems" :key="index" class="list-item">
          <a class="hover:bg-white hover:rounded-full" href="#">
            <img :src="getImagePath(item.image)" />
          </a>
        </li>
      </ul>
      
      <div class="bg-gray-100 rounded-full flex flex-col gap-2 items-center px-2 py-4 w-full">
        <img :src="getImagePath('Frame 48096327.png')" class="w-10 shadow rounded-full" />
        <img @click="handleLogout" src="../assets/images2/logout.svg" class="cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
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
  { icon: "fas fa-user-circle", image: "Component 11.png" },
  { icon: "fas fa-wallet", image: "Component 20.png" },
  { icon: "fas fa-history", image: "Component 9.png" },
  { icon: "fas fa-cog", image: "Component 20.png" },
]);

const handleLogout = () => {
  localStorage?.removeItem("token");
  localStorage?.removeItem("user");
  router.push("/super-admin/login")
}

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