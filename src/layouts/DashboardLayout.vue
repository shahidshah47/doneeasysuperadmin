<script setup>
import Breadcrumb from '../components/Breadcrumb.vue';
import SideBar from '../components/Sidebar.vue';
import TopBar from '../components/TopBar.vue';
</script>

<template>
  <div class="flex min-h-screen">
    <!-- SideBar -->
    <div class="bg-white shadow">
      <SideBar />
    </div>

    <!-- Content Section -->
    <div class="flex-1">
      <div class="p-6">
        <!-- TopBar -->
        <TopBar />
        <Breadcrumb class="pt-4" />
        <!-- Main Content -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>