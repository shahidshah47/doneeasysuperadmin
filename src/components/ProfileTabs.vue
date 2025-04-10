<template>
  <div class="tabs-section mt-3">
    <ul class="nav nav-tabs d-flex justify-content-around border-0">
      <li v-for="tab in tabs" :key="tab.path" class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyId}/employees/${tab.path}`"
          class="nav-link font-semibold"
          active-class="active-tab"
        >
          {{ tab.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const companyId = route.params.companyId;

const tabs = [
  { label: "Info", path: "details" },
  { label: "Appointments", path: "appointment" },
  { label: "Site Survey", path: "site-survey" },
  { label: "Chat History", path: "chat-history" },
  { label: "Rating & Reviews", path: "rating-reviews" },
];
</script>

<style scoped>
.nav-link {
  color: #868599;
  border: none !important;
  padding-bottom: 10px;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #5825eb;
}

.nav-link.active-tab {
  color: #5825eb !important;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 3px;
  background-color: #5825eb;
  transition: width 0.3s ease;
  transform: scaleX(1.6);
}

.nav-link:hover::after,
.nav-link.active-tab::after {
  width: 100%;
  transform: scaleX(1.6);
}
</style>
