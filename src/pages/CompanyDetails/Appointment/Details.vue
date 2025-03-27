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
        :amount="paymentTerm.amount"
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
        :itemTitle="`Item No ${index + 1}`"
        :sessionName="service.title"
        serviceTitle="Service Description"
        :serviceDescription="service.description"
        editLink="/super-admin/company-details/info/authentication"
        unitPriceLabel="Unit Price"
        :unitPrice="`AED ${service.unit_price}`"
        quantityLabel="Quantity"
        :quantity="service.quantity"
        totalLabel="Total"
        :total="`AED ${service.total}`"
        deliveryTimeLabel="Delivery Time"
        :deliveryTime="
          convertTimeTo12HourFormat(service.delivery_time.split(' ')[1])
        "
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
      <ServiceCard
        :key="index"
        v-for="(quote, index) in appointmentDetails?.offer?.quotations"
        :itemTitle="`Item No ${index + 1}`"
        :sessionName="quote.item_title"
        serviceTitle="Description"
        :serviceDescription="quote.description"
        editLink="/super-admin/company-details/info/authentication"
        unitPriceLabel="Unit Price"
        :unitPrice="`AED ${quote.unit_price}`"
        quantityLabel="Quantity"
        :quantity="quote.quantity"
        totalLabel="Total"
        :total="`AED ${quote.total}`"
        deliveryTimeLabel="Procurement/lead time"
        :deliveryTime="
          convertTimeTo12HourFormat(quote.delivery_time.search('hour') > -1 ? quote.delivery_time : quote.delivery_time.split(' ')[1])
        "
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import BreakDown from "../../../components/common/BreakDown/BreakDown.vue";
import PaymentCard from "../../../components/common/PaymentCard/PaymentCard.vue";
import ServiceCard from "../../../components/common/ServiceCard/ServiceCard.vue";
import { useCompanyStore } from "../../../store";
import { useRoute } from "vue-router";
import api from "../../../api";
import { useToast } from "primevue";
import {
  convertTimeTo12HourFormat,
  formatDateAndTime,
  getOrdinalNumber,
} from "../../../utils/helper";
import { paymentTermsStatus } from "../../../utils/constants";
import AppointmentDetailCards from "../../../components/Appointment/AppointmentDetailCards.vue";

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const companyStore = useCompanyStore();
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
  companyStore.toggleIsServiceDetails();
};
onMounted(() => {
  companyStore.resetDetails();
});

const handleMaterials = () => {
  companyStore.toggleIsMaterialDetails();
};

const handleToggle = () => {
  console.log("BreakDown toggle clicked");
};


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
      const { user: offerUser, payment_terms } = offer || {};
      user.value = isVendorOrAdmin.value ? appointmentDetails?.value?.user : offerUser || appointmentUser;
      company.value = user?.value?.company || appointmentUser?.company || "";
      toast.add({
        severity: "success",
        summary: "Success",
        detail: message,
        life: 3000,
      });
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  window.scroll(0, 0);
  fetchAppointDetailsById(route.params.appointmentId);
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
