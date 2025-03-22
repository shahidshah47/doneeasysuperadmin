<script setup>
import { computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCompanyStore } from "../store";
import { storeToRefs } from "pinia";

import Breadcrumb from "../components/Breadcrumb.vue";
import SideBar from "../components/Sidebar.vue";
import TopBar from "../components/TopBar.vue";
import CompanyDetailsModel from "../components/common/CompanyDetailsModel/CompanyDetailsModel.vue";

const route = useRoute();
const router = useRouter();
const companyStore = useCompanyStore();
const { isDetail } = storeToRefs(companyStore);

const isVendorRoute = computed(() => route.path === "/super-admin/vendor");

// Prevent scrolling when isDetail is true
watchEffect(() => {
  if (isDetail.value) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});

// Redirect if no token
if (!localStorage?.getItem("token")) {
  router.push("/super-admin/login");
}
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div
      class="bg-white shadow fixed left-0 top-0 bottom-0 w-[95px] overflow-y-auto"
    >
      <SideBar />
    </div>

    <!-- Content Section -->
    <div class="flex-1 !pl-[95px]">
      <div class="p-4">
        <!-- TopBar -->
        <TopBar />
        <Breadcrumb v-if="!isVendorRoute" class="pt-4" />
        <!-- Main Content -->
        <router-view></router-view>
      </div>
    </div>
  </div>

  <!-- Company Details Modal -->
  <CompanyDetailsModel v-if="isDetail" @close="companyStore.isDetail = false" />
</template>
