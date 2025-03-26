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
const { isDetail, isCompanyDetail, isMaterialDetails, isServiceDetails, modalDesc, companyDetails } =
  storeToRefs(companyStore);
const { selectedNote } = storeToRefs(surveyStore);

const isVendorRoute = computed(() => route.path === "/super-admin/vendor");
const isOrderRoute = computed(() => route.path === "/super-admin/order");

// Prevent scrolling when isDetail is true
watchEffect(() => {
  if (
    isDetail.value ||
    isCompanyDetail.value ||
    isMaterialDetails.value ||
    isServiceDetails.value ||
    selectedNote.value
  ) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});

// Redirect if no token
if (!localStorage?.getItem("token")) {
  router.push("/super-admin/login");
}

const closeAllModals = () => {
  companyStore.isDetail = false;
  companyStore.isCompanyDetail = false;
  companyStore.isMaterialDetails = false;
  companyStore.isServiceDetails = false;
  surveyStore.selectedNote = null;

  // Ensure `overflow-hidden` is removed after state updates
  setTimeout(() => {
    if (
      !isDetail.value ||
      !isCompanyDetail.value ||
      !isMaterialDetails.value ||
      !isServiceDetails.value ||
      !selectedNote.value
    ) {
      document.body.classList.remove("overflow-hidden");
    }
  }, 0);
};
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

  <DetailsModel v-if="isDetail" @close="closeAllModals" :description="modalDesc" />
  <MaterialsModal v-if="isMaterialDetails" @close="closeAllModals" />
  <ServicesModal v-if="isServiceDetails" @close="closeAllModals" />
  <CompanyModal v-if="isCompanyDetail" @close="closeAllModals" :details="companyDetails" />
  <NoteModal v-if="selectedNote" :note="selectedNote" @close="closeAllModals" />
</template>
