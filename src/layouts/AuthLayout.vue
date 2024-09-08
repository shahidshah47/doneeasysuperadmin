<script setup>
import Header from '../components/Header.vue'
</script>

<template>
  <Header />
  <div class="bg-img">
    <router-view />
  </div>
</template>

<style scoped>
.bg-img {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-image: url('../assets/images2/Isolation_Mode.png');
  background-position: bottom;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>