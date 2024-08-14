<template>
  <div class="flex h-screen bg-gray-200">
    <!-- Sidebar Container -->
    <div :class="`fixed z-30 inset-y-0 left-0 transition duration-300 transform bg-white overflow-y-auto rounded-r-lg ${isOpen ? 'translate-x-0 ease-out w-28' : '-translate-x-full ease-in w-0'}`" class="lg:translate-x-0 lg:static lg:inset-0 lg:w-28">
      <div class="flex items-center justify-center mt-8">
        <img src="../assets/image/Logo.png" alt="logo" class="h-14 w-14">
      </div>
      <nav class="mt-10 bg-[#F2F4FB] rounded-xl">
        <router-link to="/dashboard" class="flex items-center py-2 px-6 hover:bg-gray-300">
          <img src="../assets/image/dashboard.png" alt="Dashboard" class="h-14 w-14 rounded-full">
        </router-link>
        <router-link to="/project" class="flex items-center mt-5 py-2 px-6 hover:bg-gray-300">
          <img src="../assets/image/users.png" alt="Users" class="h-14 w-14 rounded-full">
        </router-link>
      </nav>
    </div>
    <div class="flex flex-col flex-1">
      <TopBar/>
      <div class="flex-1 overflow-y-auto">
        <router-view />
      </div>
    </div>

  </div>
</template>

<script>
import TopBar from "../layouts/TopBar.vue";

export default {
  name: "Sidebar",
  components: {TopBar},
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .lg\:hidden {
    display: none !important;
  }
}
.main-content {
  padding: 20px; /* Padding for content */
  width: 100%; /* Ensures it takes the remaining width */
}
</style>
