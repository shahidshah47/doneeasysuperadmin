<template>
  <AppointmentDetailCards :appointmentDetails="appointmentDetails" :user="user" :company="company" />

  <div v-if="appointmentDetails?.offer.payment_terms.length > 0">
    <h5 class="fw-bold !text-base !text-dm-blue">Payment Terms</h5>
    <div
      class="bg-white rounded-xl p-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
    >
      <PaymentCard
        :key="index"
        v-for="(paymentTerm, index) in appointmentDetails.offer.payment_terms"
        :badgeText="getOrdinalNumber(index + 1) + ' Payment'"
        :paymentDescription="paymentTerm.description"
        :paymentDate="formatDateAndTime(paymentTerm.created_at)?.formattedDate"
        currency="AED"
        :amount="formatWithCommas(paymentTerm.amount)"
        :statusClass="paymentTermsStatus(paymentTerm.status)?.gradient"
        :status="paymentTermsStatus(paymentTerm.status)?.statusText"
      />
    </div>
  </div>

  <BreakDown title="Offer Breakdown" @toggle="handleToggle" />

  <div class="mb-4" v-if="appointmentDetails?.offer.services.length > 0">
    <div class="flex justify-between items-center">
      <h5 class="fw-bold !text-base leading-5 text-dm-blue">
        Quote for Services
      </h5>
      <button
        @click="handleServices"
        class="text-decoration-none text-primary !text-sm !font-bold"
      >
        + Add Service
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <ServiceCard
        :key="index"
        v-for="(service, index) in appointmentDetails.offer.services"
        :data="service"
        :itemTitle="`Item No ${index + 1}`"
        @edit="(data) => handleClickEdit(data)"
      />
    </div>
  </div>

  <div class="" v-if="appointmentDetails?.offer.quotations.length > 0">
    <div class="flex justify-between items-center">
      <h5 class="fw-bold !text-base leading-5 text-dm-blue">
        Quote for Materials
      </h5>
      <button
        @click="handleMaterials"
        class="text-decoration-none text-primary !text-sm !font-bold"
      >
        + Add Material
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <MaterialCard
        :key="index"
        v-for="(quote, index) in appointmentDetails?.offer?.quotations"
        :itemTitle="`Item No ${index + 1}`"
        :data="quote"
        @edit="(data) => handleClickEdit(data)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import BreakDown from "../../../components/common/BreakDown/BreakDown.vue";
import PaymentCard from "../../../components/common/PaymentCard/PaymentCard.vue";
import ServiceCard from "../../../components/common/ServiceCard/ServiceCard.vue";
import { useAppointmentStore, useCompanyStore } from "../../../store";
import { useRoute } from "vue-router";
import api from "../../../api";
import { useToast } from "primevue";
import {
  convertTimeTo12HourFormat,
  formatDateAndTime, formatWithCommas,
  getOrdinalNumber,
} from "../../../utils/helper";
import { paymentTermsStatus } from "../../../utils/constants";
import AppointmentDetailCards from "../../../components/Appointment/AppointmentDetailCards.vue";
import MaterialCard from "../../../components/common/MaterialCard/MaterialCard.vue";

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const companyStore = useCompanyStore();
const appointStore = useAppointmentStore();
const appointmentDetails = ref(null);
const toast = useToast();
const user = ref(null);
const company = ref(null);
const isUserAvailable = ref(JSON.parse(localStorage.getItem("user")));

const isVendorOrAdmin = computed(() => {
  const { current_user_type, user_type, role_type } = isUserAvailable.value;

  return (
    current_user_type === 3 ||
    (current_user_type === null &&
      user_type === 3 &&
      role_type === "sales_manager") ||
    current_user_type === 6 ||
    (current_user_type === null &&
      user_type === 3 &&
      role_type === "company_owner")
  );
});

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
}

const fetchAppointDetailsById = async (id) => {
  try {
    const response = await api.get("/superadmin/user/appointment/" + id);
    if (response.status === 200) {
      const { data, message } = response?.data;
      appointmentDetails.value = data;
      
      const {
        offer,
        user: appointmentUser,
      } = appointmentDetails?.value;
      const { user: offerUser, payment_terms, services, quotations } = offer || {};
      
      user.value = isVendorOrAdmin.value ? appointmentDetails?.value?.user : offerUser || appointmentUser;
      company.value = user?.value?.company || appointmentUser?.company || "";
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

watch(() => appointStore.isServiceUpdated, (val) => {
  console.log(val, "is Service Updated");
  if (val) {
    fetchAppointDetailsById(route.params.appointmentId);
  }
});

onMounted(() => {
  window.scroll(0, 0);
  fetchAppointDetailsById(route.params.appointmentId);
  companyStore.resetDetails();
});
</script>

<style scoped>
p {
  font-size: 14px;
  font-weight: 500;
}

.stats-section {
  background-color: #f2f4fb;
}
</style>
