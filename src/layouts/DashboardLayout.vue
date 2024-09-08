<script setup>
import Breadcrumb from '../components/Breadcrumb.vue';
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <!-- SideBar -->
      <div class="col-md-1 d-md-flex d-none flex-column align-items-center bg-white shadow">
        <SideBar />
      </div>

      <!-- Content Section -->
      <div class="col-md-11 py-3">
        <div>
          <!-- TopBar -->
          <TopBar />
          <Breadcrumb class="pt-4" />
          <!-- Main Content -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>