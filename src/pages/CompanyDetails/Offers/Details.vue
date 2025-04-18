<template>
  
  <AppointmentDetailCards :appointmentDetails="offerDetails" 
    :user="user" :company="company" mainCardHeading="Offer Details" associateHeading="Offer Created by" />

  
  <div v-if="offerDetails?.offer.payment_terms.length > 0">
    <h5 class="fw-bold !text-base !text-dm-blue">Payment Terms</h5>
    <div
      class="bg-white rounded-xl p-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
    >
      <PaymentCard
        :key="index"
        v-for="(paymentTerm, index) in offerDetails.offer.payment_terms"
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

  <!-- <BreakDown title="Offer Breakdown" @toggle="handleToggle" />

  <div class="mb-4" v-if="services.length > 0">
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
        v-for="(service, index) in services"
        :key="service.id"
        :data="service"
        :itemTitle="`Item No ${index + 1}`"
        @edit="(data) => handleClickEdit(data)"
      />
    </div>
  </div>

  <div v-if="quotations.length > 0">
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
        v-for="(quote, index) in quotations"
        :key="quote.id"
        :itemTitle="`Item No ${index + 1}`"
        :data="quote"
        @edit="(data) => handleClickEdit(data)"
      />
    </div>
  </div> -->
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import BreakDown from "../../../components/common/BreakDown/BreakDown.vue";
import DescriptionCard from "../../../components/common/DescriptionCard/DescriptionCard.vue";
import FileCard from "../../../components/common/FileCard/FileCard.vue";
import InfoDisplay from "../../../components/common/InfoDisplay/InfoDisplay.vue";
import LocationCard from "../../../components/common/LocationCard/LocationCard.vue";
import PaymentCard from "../../../components/common/PaymentCard/PaymentCard.vue";
import ProfileCard from "../../../components/common/ProfileCard/ProfileCard.vue";
import SectionHeading from "../../../components/common/SectionHeading/SectionHeading.vue";
import ServiceCard from "../../../components/common/ServiceCard/ServiceCard.vue";
import SummaryCard from "../../../components/common/SummaryCard/SummaryCard.vue";
import UserProfileCard from "../../../components/common/UserProfileCard/UserProfileCard.vue";
import MapIcon from "../../../assets/images2/map-2.png";
import ManagerIcon from "../../../assets/images2/manager.png";
import CompanyIcon from "../../../assets/images2/ltd.png";
import AppointmentDetailCards from "../../../components/Appointment/AppointmentDetailCards.vue";
import { useRoute } from "vue-router";
import { useToast } from "primevue";
import api from "../../../api";
import { formatDateAndTime, formatWithCommas, getOrdinalNumber } from "../../../utils/helper";
import { paymentTermsStatus } from "../../../utils/constants";

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const offerDetails = ref(null);
const toast = useToast();
const user = ref(null);
const company = ref(null);

const handleClickEdit = (data) => {
  // if (data.item_title) {
  //   appointStore.toggleIsMaterialDetails(data);
  // } else {
  //   appointStore.toggleIsServiceDetails(data);
  // }
};

const fetchOfferDetailsById = async (id) => {
  try {
    const response = await api.get("/superadmin/user/offer/" + id);
    if (response.status === 200) {
      const { data, message } = response?.data;
      offerDetails.value = { offer: data };
      user.value = data.user;
      company.value = data.user.company;
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
  fetchOfferDetailsById(route.params.offerId);
});

const services = ref([
  {
    id: 578,
    offer_id: 419,
    item_number: "Item No 1 update",
    title: "Session - Introduction 21",
    description:
      "Lorem ipsum dolor sit amet consectetur. Proin tellus ac sit ullamcorper morbi condimentum tellus.",
    unit_price: "15.00",
    quantity: 38,
    sub_total: "570.00",
    delivery_time: "2026-05-12 20:53:00",
    total: "570.00",
    created_at: "2025-03-07T14:02:00.000000Z",
    updated_at: "2025-04-04T09:31:53.000000Z",
    serviceable_type: null,
    serviceable_id: null,
    user_id: null,
  },
  {
    id: 610,
    offer_id: 419,
    item_number: "Item No 2",
    title: "New service 4",
    description: "Test service description for this 2",
    unit_price: "40.00",
    quantity: 25,
    sub_total: "1000.00",
    delivery_time: "2025-04-04 16:23:00",
    total: "1000.00",
    created_at: "2025-04-03T09:22:00.000000Z",
    updated_at: "2025-04-04T09:28:47.000000Z",
    serviceable_type: null,
    serviceable_id: null,
    user_id: null,
  },
]);

const quotations = ref([
  {
    id: 608,
    offer_id: 419,
    item_title: "Tsgsh",
    description: "Hajsj",
    unit_price: "56.00",
    quantity: 30,
    sub_total: "1680.00",
    delivery_time: "2025-04-05 00:00:00",
    total: "1680.00",
    type: 1,
    created_at: "2025-03-07T14:02:00.000000Z",
    updated_at: "2025-04-04T09:18:28.000000Z",
  },
]);
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
