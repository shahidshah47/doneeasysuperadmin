<template>
  <div class="tabs-section mt-3">
    <ul class="nav nav-tabs d-flex justify-content-around border-0">
      <li v-for="tab in tabs" :key="tab.path" class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyId}/employees/${tab.path}`"
          class="nav-link"
          active-class="active-tab"
        >
          {{ tab.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRoute } from "vue-router"; // Import useRoute hook

// Get the companyId from the route parameters
const route = useRoute();
const companyId = route.params.companyId; // Access companyId from the route params

const tabs = [
  { label: "Info", path: "details" },
  { label: "Appointments", path: "appointment" },
  { label: "Site Survey", path: "site-survey" },
  { label: "Chat History", path: "chat-history" },
  { label: "Rating & Reviews", path: "rating-reviews" },
];
</script>

<style scoped>
.active-tab {
  background-color: #fff !important;
  border: none !important;
  position: relative;
  color: #495057;
}
.active-tab::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  height: 4px;
  background-color: #5825eb;
  width: 100%;
  transform: translateX(-50%) scaleX(2); /* Center and scale the underline */
  transform-origin: center center; /* Ensure scaling is applied from the center */
}

.nav-link {
  color: #868599;
  border: none !important;
  font-weight: 600;
  font-size: 14px;
}

.nav-link:hover {
  color: #495057;
}
</style>
