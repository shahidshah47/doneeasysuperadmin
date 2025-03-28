<template>
  <div class="tabs-section mt-5">
    <ul class="nav nav-tabs flex justify-around border-0">
      <li
        class="nav-item font-bold"
        :class="{
          'active-tab':
            $route.path.includes('/super-admin/company-details/') &&
            $route.path.includes('/info'),
        }"
      >
        <router-link
          :to="`/super-admin/company-details/${companyStore.companyId}/info`"
          class="nav-link !text-sm !font-bold"
        >
          Info
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyStore.companyId}/appointment`"
          class="nav-link !text-sm !font-bold"
          active-class="active-tab"
        >
          Appointments
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyStore.companyId}/site-survey`"
          class="nav-link !text-sm !font-bold"
          active-class="active-tab"
        >
          Site Survey
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyStore.companyId}/offers`"
          class="nav-link !text-sm !font-bold"
          active-class="active-tab"
        >
          Offers
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyStore.companyId}/employees`"
          class="nav-link !text-sm !font-bold"
          active-class="active-tab"
        >
          Employees
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyStore.companyId}/verticals`"
          class="nav-link !text-sm !font-bold"
          active-class="active-tab"
        >
          Verticals
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyStore.companyId}/chat-history`"
          class="nav-link !text-sm !font-bold"
          active-class="active-tab"
        >
          Chats History
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyStore.companyId}/finance`"
          class="nav-link !text-sm !font-bold"
          active-class="active-tab"
        >
          Finance
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCompanyStore } from "../store";

const route = useRoute();
const companyStore = useCompanyStore();

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
  color: #5825eb !important; /* Active tab text color */
  font-weight: bold;
}

.active-tab::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -21px;
  height: 4px;
  background-color: #5825eb;
  width: 100%;
  margin: 0 auto;
}

.nav-link {
  color: #868599; /* Default (inactive) tab text color */
  border: none !important;
}

.nav-link:hover {
  color: #5825eb; /* Text color changes to active color on hover */
}

.active-tab .nav-link {
  color: #5825eb !important; /* Ensure active tab text remains #5825EB */
}
</style>
