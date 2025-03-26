<script setup>
import { computed, reactive, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCompanyStore, useSurveyStore } from "../store";
import { storeToRefs } from "pinia";

import Breadcrumb from "../components/Breadcrumb.vue";
import SideBar from "../components/Sidebar.vue";
import TopBar from "../components/TopBar.vue";
import DetailsModel from "../components/common/DetailsModel/DetailsModel.vue";
import CompanyModal from "../components/common/CompanyModal/CompanyModal.vue";
import MaterialsModal from "../components/common/MaterialsModal/MaterialsModal.vue";
import ServicesModal from "../components/common/ServicesModal/ServicesModal.vue";
import NoteModal from "../components/common/NoteModal/NoteModal.vue";

const route = useRoute();
const router = useRouter();
const companyStore = useCompanyStore();
const surveyStore = useSurveyStore();
const { isDetail, isCompanyDetail, isMaterialDetails, isServiceDetails, modalDesc } =
  storeToRefs(companyStore);
const { selectedNote } = storeToRefs(surveyStore);
const isDetailOpen = reactive(isDetail.value);

const isVendorRoute = computed(() => route.path === "/super-admin/vendor");
const isOrderRoute = computed(() => route.path === "/super-admin/order");

// Prevent scrolling when isDetail is true
// watchEffect(() => {
//   console.log(isDetail, isDetailOpen, "isDetail === >><< ---");
//   if (isDetail.value || isCompanyDetail.value) {
//     isDetailOpen.value = isDetail.value;
//     document.body.classList.add("overflow-hidden");
//   } else {
//     document.body.classList.remove("overflow-hidden");
//   }
// });

watch(
  () => isDetailOpen || isDetail.value,
  (count, prevCount) => {
    console.log(count, prevCount, "count & prevCount");
  }
)

// Redirect if no token
if (!localStorage?.getItem("token")) {
  router.push("/super-admin/login");
}

const handleCloseModel = () => {
  companyStore.isDetail = false;
  isDetailOpen.value = false;
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
        <Breadcrumb v-if="!isVendorRoute && !isOrderRoute" class="pt-4" />

        <!-- Main Content -->
        <router-view></router-view>
      </div>
    </div>
  </div>

  <!-- Company Details Modal -->
  <DetailsModel v-if="isDetailOpen" @close="handleCloseModel" :description="modalDesc" />
  <MaterialsModal
    v-if="isMaterialDetails"
    @close="companyStore.isMaterialDetails = false"
  />
  <ServicesModal
    v-if="isServiceDetails"
    @close="companyStore.isServiceDetails = false"
  />

  <CompanyModal
    v-if="isCompanyDetail"
    @close="companyStore.isCompanyDetail = false"
  />
  <NoteModal
    v-if="selectedNote"
    :note="selectedNote"
    @close="surveyStore.selectedNote = null"
  />
</template>
