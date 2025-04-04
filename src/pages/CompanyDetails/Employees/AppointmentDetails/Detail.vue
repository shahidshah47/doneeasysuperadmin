<template>
  <button
    class="btn me-2 mb-1 !font-semibold"
    @click="goBack"
    style="text-transform: none !important"
  >
    <span>
      <i class="fa-solid fa-arrow-left text-dm-blue mr-4"></i>
    </span>
    <span> Back </span>
  </button>
  <div class="d-flex my-2 mb-4">
    <button
      class="btn me-2 !font-semibold"
      :class="
        activeButton === 'order'
          ? '!bg-vivid-purple !text-white-100'
          : 'btn-light'
      "
      @click="setActiveButton('order')"
      style="text-transform: none !important"
    >
      Order Activity
    </button>
    <button
      class="btn me-2 !font-semibold"
      :class="
        activeButton === 'survey'
          ? '!bg-vivid-purple !text-white-100'
          : 'btn-light'
      "
      @click="setActiveButton('survey')"
      style="text-transform: none !important"
    >
      Site Survey
    </button>
    <button
      class="btn !font-semibold"
      :class="
        activeButton === 'summary'
          ? '!bg-vivid-purple !text-white-100'
          : 'btn-light'
      "
      @click="setActiveButton('summary')"
    >
      Order Summary
    </button>
  </div>

  <div v-if="activeButton === 'order'">
    <OrderActivity />
  </div>
  <div v-if="activeButton === 'survey'">
    <SiteSurvey />
  </div>
  <div v-if="activeButton === 'summary'">
    <OrderSummary />
  </div>
</template>

<script setup>
import { ref } from "vue";
import OrderActivity from "./components/OrderActivity.vue";
import SiteSurvey from "./components/SiteSurvey.vue";
import OrderSummary from "./components/OrderSummary.vue";

const activeButton = ref("order");

const setActiveButton = (button) => {
  activeButton.value = button;
};

// Back button functionality
const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
.sidebar {
  background-color: #f2f4fb;
}

.breadcrumb {
  background-color: transparent;
}

.progress-step {
  display: flex;
  align-items: center;
  position: relative;
}

.progress-step i {
  font-size: 1.5rem;
}

.progress-bar {
  height: 2px;
}

img {
  border-radius: 10px;
}

.nav-link {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #6c757d;
}

.nav-link:hover {
  color: #007bff;
}

.nav-link i {
  font-size: 1.5rem;
}
</style>
