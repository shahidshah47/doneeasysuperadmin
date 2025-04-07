<template>
  <div class="tabs-section mt-5">
    <ul class="nav nav-tabs flex justify-around border-0">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="nav-item"
        :class="{ 'active-tab': isActiveTab(tab.path) }"
      >
        <router-link
          :to="`/super-admin/company-details/${companyStore.companyId}${tab.path}`"
          class="nav-link !text-sm !font-semibold"
          active-class="active-tab"
        >
          {{ tab.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCompanyStore } from "../store";

const route = useRoute(); // Use useRoute() to get the current route
const companyStore = useCompanyStore();

const tabs = [
  { label: "Info", path: "/info" },
  { label: "Appointments", path: "/appointment" },
  { label: "Site Survey", path: "/site-survey" },
  { label: "Offers", path: "/offers" },
  { label: "Employees", path: "/employees" },
  { label: "Verticals", path: "/verticals" },
  { label: "Chats History", path: "/chat-history" },
  { label: "Finance", path: "/finance" },
];

const isActiveTab = (tabPath) => {
  return route.path.includes(tabPath); // Use route instead of $route
};

watch(
  () => route.params.companyId,
  (newId) => {
    if (newId) {
      companyStore.setCompanyId(newId);
    }
  }
);

onMounted(() => {
  if (route.params.companyId) {
    companyStore.setCompanyId(route.params.companyId);
  }
});
</script>

<style scoped>
.active-tab {
  background-color: #fff !important;
  border: none !important;
  position: relative;
  color: #5825eb !important;
}

.active-tab::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -22.5px;
  height: 3px;
  background-color: #5825eb;
  width: 100%;
  transform: translateX(-50%) scaleX(2);
  transform-origin: center center;
}

.nav-link {
  color: #868599;
  border: none !important;
  padding-bottom: 0 !important;
}

.nav-link:hover {
  color: #5825eb;
}

.active-tab .nav-link {
  color: #5825eb !important;
}
</style>
