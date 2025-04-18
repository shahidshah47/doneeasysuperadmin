<script setup>
import { computed, reactive, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  useAppointmentStore,
  useCompanyStore,
  useEmployeeStore,
  useSurveyStore,
} from "../store";
import { storeToRefs } from "pinia";

import Breadcrumb from "../components/Breadcrumb.vue";
import SideBar from "../components/Sidebar.vue";
import TopBar from "../components/TopBar.vue";
import DetailsModel from "../components/common/DetailsModel/DetailsModel.vue";
import CompanyModal from "../components/common/CompanyModal/CompanyModal.vue";
import MaterialsModal from "../components/common/MaterialsModal/MaterialsModal.vue";
import ServicesModal from "../components/common/ServicesModal/ServicesModal.vue";
import NoteModal from "../components/common/NoteModal/NoteModal.vue";
import ExperienceModal from "../components/common/ExperienceModal/ExperienceModal.vue";

const route = useRoute();
const router = useRouter();
const companyStore = useCompanyStore();
const appointmentStore = useAppointmentStore();
const surveyStore = useSurveyStore();
const employeeStore = useEmployeeStore();

const { isVisible } = storeToRefs(employeeStore);
const { isDetail, isCompanyDetail, modalDesc } = storeToRefs(companyStore);
const {
  isMaterialDetails,
  isServiceDetails,
  serviceDetails,
  materialDetails,
  appointmentDetails,
} = storeToRefs(appointmentStore);
const { selectedNote } = storeToRefs(surveyStore);
console.log("🚀 ~ selectedNote:", selectedNote?.value);
const companyId = computed(() => route.params.id);

const isVendorRoute = computed(() => route.path === "/super-admin/vendor");
const isOrderRoute = computed(() => route.path === "/super-admin/order");
const isCompanyDetailsRoute = computed(() =>
  route.path.includes(`/employees/appointment/`)
);

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
  if (
    (!isMaterialDetails.value || !isServiceDetails.value) &&
    !isDetail.value
  ) {
    appointmentStore.setIsServiceUpdated(true);
  }

  companyStore.isDetail = false;
  companyStore.isCompanyDetail = false;
  appointmentStore.isMaterialDetails = false;
  appointmentStore.isServiceDetails = false;
  employeeStore.isVisible = false;
  surveyStore.selectedNote = null;

  // Ensure `overflow-hidden` is removed after state updates
  setTimeout(() => {
    if (
      !isDetail.value ||
      !isCompanyDetail.value ||
      !isMaterialDetails.value ||
      !isServiceDetails.value ||
      !selectedNote.value ||
      !isVisible.value
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
      class="bg-white shadow fixed left-0 top-0 bottom-0 w-[95px] overflow-y-auto z-[999] min-w-28 vivid-scrollbar"
    >
      <SideBar />
    </div>

    <!-- Content Section -->
    <div class="flex-1 pl-34 pr-10 py-3 overflow-hidden">
      <div class="p-4">
        <!-- TopBar -->
        <TopBar />
        <Breadcrumb
          v-if="!isVendorRoute && !isOrderRoute && !isCompanyDetailsRoute"
          class="pt-4"
        />

        <!-- Main Content -->
        <router-view></router-view>
      </div>
    </div>
  </div>

  <DetailsModel
    v-if="isDetail"
    @close="closeAllModals"
    title="More Details"
    :description="modalDesc"
  />
  <MaterialsModal
    v-if="isMaterialDetails"
    :materialDetails="materialDetails"
    :itemNumber="
      `Item No ` + (appointmentDetails?.offer?.quotations?.length + 1)
    "
    :appointOfferId="appointmentDetails?.offer?.id"
    @close="closeAllModals"
  />
  <ServicesModal
    v-if="isServiceDetails"
    :serviceDetails="serviceDetails"
    :itemNumber="`Item No ${
      (appointmentDetails?.offer?.quotations?.length ?? 0) + 1
    }`"
    :appointOfferId="appointmentDetails?.offer?.id"
    @close="closeAllModals"
  />
  <CompanyModal v-if="isCompanyDetail" @close="closeAllModals" />
  <NoteModal v-if="selectedNote" :note="selectedNote" @close="closeAllModals" />
  <ExperienceModal v-if="isVisible" @close="closeAllModals" />
</template>
