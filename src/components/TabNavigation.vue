<template>
  <div class="tabs-section mt-5">
    <ul class="nav nav-tabs flex justify-around border-0">
      <li v-for="(tab, index) in tabs" :key="index" class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyStore.companyId}${tab.path}`"
          class="nav-link !text-[15px] !font-semibold"
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

const route = useRoute();
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
