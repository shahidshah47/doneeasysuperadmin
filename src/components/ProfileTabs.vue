<template>
  <div class="tabs-section mt-5">
    <ul class="nav nav-tabs d-flex justify-content-around border-0">
      <li class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyId}/employees/details`"
          class="nav-link"
          active-class="active-tab"
          exact
        >
          Info
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyId}/employees/appointment`"
          class="nav-link"
          active-class="active-tab"
        >
          Appointments
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyId}/employees/site-survey`"
          class="nav-link"
          active-class="active-tab"
        >
          Site Survey
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyId}/employees/chat-history`"
          class="nav-link"
          active-class="active-tab"
        >
          Chat History
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="`/super-admin/company-details/${companyId}/employees/rating-reviews`"
          class="nav-link"
          active-class="active-tab"
        >
          Rating & Reviews
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const companyId = computed(() => route.params.companyId);
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
  left: 0;
  right: 0;
  bottom: 0;
  height: 4px;
  background-color: #5825eb;
  width: 100%;
  margin: 0 auto;
}

.nav-link {
  color: #6c757d;
  border: none !important;
}

.nav-link:hover {
  color: #495057;
}
</style>
