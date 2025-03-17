<script setup>
import Breadcrumb from '../components/Breadcrumb.vue';
import SideBar from '../components/Sidebar.vue';
import TopBar from '../components/TopBar.vue';
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isVendorRoute = computed(() => route.path === "/super-admin/vendor");
if (!localStorage?.getItem("token")) {
  router.push("/super-admin/login");
}

</script>

<template>
  <div class="flex min-h-screen">
    <!-- SideBar -->
    <div class="bg-white shadow fixed left-0 top-0 bottom-0 w-[95px] overflow-y-auto">
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
</template>