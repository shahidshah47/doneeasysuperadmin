<script setup>
import Sidebar from './components/Sidebar.vue';
import TopBar from './components/TopBar.vue';
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Content Section -->
      <div class="col-md-11 content py-3">
        <div>
          <!-- TopBar -->
          <TopBar />

          <!-- Main Content -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>