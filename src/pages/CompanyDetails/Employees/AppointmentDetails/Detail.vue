<template>
  <button
    class="btn me-2 mb-1 !font-semibold"
    @click="goBack"
    style="
      text-transform: none !important;
      outline: none;
      box-shadow: none;
      border: none;
    "
  >
    <span>
      <i class="fa-solid fa-arrow-left text-dm-blue mr-4"></i>
    </span>
    <span> Back </span>
  </button>

  <div v-if="appointmentDetails?.progress_status !== 0">
    <div class="d-flex my-2 mb-4">
      <button
        class="btn me-2 !font-semibold"
        :class="
          activeButton === 'order'
            ? '!bg-vivid-purple !text-white-100'
            : 'btn-light'
        "
        @click="setActiveButton('order')"
        style="text-transform: none !important"
      >
        Order Activity
      </button>
      <!-- <button
        class="btn me-2 !font-semibold"
        :class="
          activeButton === 'survey'
            ? '!bg-vivid-purple !text-white-100'
            : 'btn-light'
        "
        @click="setActiveButton('survey')"
        style="text-transform: none !important"
      >
        Site Survey
      </button> -->
      <button
        class="btn !font-semibold"
        :class="
          activeButton === 'summary'
            ? '!bg-vivid-purple !text-white-100'
            : 'btn-light'
        "
        @click="setActiveButton('summary')"
      >
        Order Summary
      </button>
    </div>
  </div>

  <div v-if="activeButton === 'order'">
    <OrderActivity :orderActivity="appointmentDetails" />
  </div>
  <!-- <div v-if="activeButton === 'survey'">
    <SiteSurvey />
  </div> -->
  <div v-if="activeButton === 'summary'">
    <OrderSummary :orderSummary="appointmentDetails" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "primevue";
import api from "../../../../api";
import OrderActivity from "./components/OrderActivity.vue";
import SiteSurvey from "./components/SiteSurvey.vue";
import OrderSummary from "./components/OrderSummary.vue";

import { useAppointmentStore, useCompanyStore } from "../../../../store";

const route = useRoute();
const toast = useToast();

const loading = ref(true);
const error = ref(null);
const appointmentDetails = ref(null);

const appointStore = useAppointmentStore();
const companyStore = useCompanyStore();

const activeButton = ref("order");

const setActiveButton = (button) => {
  activeButton.value = button;
};

const goBack = () => {
  window.history.back();
};

const handleServices = () => {
  appointStore.toggleIsServiceDetails();
};

const handleMaterials = () => {
  appointStore.toggleIsMaterialDetails();
};

const handleToggle = () => {
  console.log("BreakDown toggle clicked");
};

const handleClickEdit = (data) => {
  if (data.item_title) {
    appointStore.toggleIsMaterialDetails(data);
  } else {
    appointStore.toggleIsServiceDetails(data);
  }
};

const fetchAppointDetailsById = async (id) => {
  try {
    const response = await api.get(
      `/superadmin/user/emp/appointment/${id}?user_id=${route.params.companyId}`
    );
    if (response.status === 200) {
      const { data, message } = response.data;
      appointmentDetails.value = data;

      toast.add({
        severity: "success",
        summary: "Success",
        detail: message,
        life: 3000,
      });

      appointStore.setAppointmentDetails(appointmentDetails.value);
      appointStore.setIsServiceUpdated(false);
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

watch(
  () => appointStore.isServiceUpdated,
  (val) => {
    if (val) {
      fetchAppointDetailsById(route.params.appointmentId);
    }
  }
);

onMounted(() => {
  window.scrollTo(0, 0);
  fetchAppointDetailsById(route.params.appointmentId);
  companyStore.resetDetails();
});
</script>

<style scoped>
.sidebar {
  background-color: #f2f4fb;
}

.breadcrumb {
  background-color: transparent;
}

.progress-step {
  display: flex;
  align-items: center;
  position: relative;
}

.progress-step i {
  font-size: 1.5rem;
}

.progress-bar {
  height: 2px;
}

img {
  border-radius: 10px;
}

.nav-link {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #6c757d;
}

.nav-link:hover {
  color: #007bff;
}

.nav-link i {
  font-size: 1.5rem;
}
</style>
