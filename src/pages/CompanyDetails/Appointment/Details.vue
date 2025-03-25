<template>
  <div class="row my-4 flex" v-if="appointmentDetails">
    <div class="col-md-6 flex flex-col">
      <SectionHeading title="Order Details" customClass="!text-base !font-bold text-dm-blue leading-5" />

      <div class="card border-0 rounded-3 flex-grow">
        <div class="card-body relative flex gap-2 flex-wrap flex-col">
          <div class="inline-flex justify-between items-start">
            <div>
              <p class="text-base !text-grayish-purple font-normal leading-5 mb-1">ID: {{ appointmentDetails.order_id }}</p>
              <h4 class="text-dm-blue !font-bold leading-4 !text-[20px] font-theme">{{ appointmentDetails.offer.order.title }}</h4>
            </div>
            <span class="bg-gradient-primary rounded-sm text-uppercase text-white-100 !text-xs font-bold leding-4 px-2 py-1">
              In Progress</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InfoDisplay label="Date" :value="formatDateAndTime(appointmentDetails.delivery_date)?.formattedDate" />
            <InfoDisplay label="Time" :value="formatDateAndTime(null, appointmentDetails.delivery_time)?.formattedTime" />
            <InfoDisplay label="Order Type" :value="getOrderType(appointmentDetails.offer.order.type)" />
            <InfoDisplay label="Payment Status" value="Paid" />
            <InfoDisplay label="Order Amount" :value="appointmentDetails.offer.order.total_budget" />
          </div>

          <div class="flex justify-between">
            <ProfileCard imageSrc="../../../assets/images2/manager.png" altText="manager img" subText="Manager"
              mainText="John Doe" />
            <ProfileCard imageSrc="../../../assets/images2/ltd.png" altText="ltd" mainText="XYZ Bito Group Pvt Ltd"
              linkText="View Details" />
          </div>

          <div>
            <SummaryCard title="Customer Summary"
              :description="appointmentDetails.offer.order.description"
              readMoreLink="#" />
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3 flex flex-col gap-2">
      <div v-if="appointmentDetails.associate_user?.length > 0" class="h-full flex-1">
        <div class="d-flex">
          <h5 class="fw-bold !text-base !text-dm-blue">Assign to</h5>
          <p class="!text-grayColor text-sm leading-5 !font-bold mb-0 ms-auto font-theme">
            View All
          </p>
        </div>
        <div v-for="(associate, index) in appointmentDetails.associate_user">
          <UserProfileCard :key="index" :profileImage="associate.profile_picture.file_path" :name="associate.name"
            :designation="associate.designation" :rating="4" />
        </div>
      </div>

      <div v-if="appointmentDetails.offer.order.address" class="h-full flex-1">
        <h5 class="fw-bold !text-base !text-dm-blue">Order Location</h5>
        <LocationCard 
          class="flex-grow h-full" 
          :location="{ 
            lat: Number(appointmentDetails?.offer?.order?.address?.lat), lng: Number(appointmentDetails?.offer?.order?.address?.lng) }"
          :address="appointmentDetails.offer.order.address.address" buttonText="Open Map" />
      </div>
    </div>

    <div class="col-md-3 flex flex-col">
      <h5 class="fw-bold !text-base !text-dm-blue">Attachments</h5>
      <div v-for="(doc, index) in appointmentDetails.offer.order.documents">
        <FileCard :key="index" fileIcon="../../../assets/images2/file-icon.png" :fileName="doc.file_name" :fileSize="doc.file_size" />
      </div>

      <DescriptionCard title="Additional terms" :content="appointmentDetails.offer.additional_terms" linkText="read more"
        :lineClamp="3" />
    </div>
  </div>

  <div v-if="appointmentDetails?.offer.payment_terms.length > 0">
    <h5 class="fw-bold !text-base !text-dm-blue">Payment Terms</h5>
    <div class="bg-white rounded-xl p-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      <PaymentCard :key="index" v-for="(paymentTerm, index) in appointmentDetails.offer.payment_terms" 
        :badgeText="getOrdinalNumber(index + 1) + ' Payment'" 
        :paymentDescription="paymentTerm.description"
        :paymentDate="formatDateAndTime(paymentTerm.created_at)?.formattedDate" 
        currency="AED" :amount="paymentTerm.amount" :statusClass="paymentTermsStatus(paymentTerm.status)?.gradient"
        :status="paymentTermsStatus(paymentTerm.status)?.statusText" />
    </div>
  </div>

  <BreakDown title="Offer Breakdown" @toggle="handleToggle" />

  <div class="mb-4" v-if="appointmentDetails?.offer.services.length > 0">
    <div class="flex justify-between items-center">
      <h5 class="fw-bold !text-base leading-5 text-dm-blue">
        Quote for Services
      </h5>
      <button @click="handleServices" class="text-decoration-none text-primary !text-sm !font-bold">
        + Add Service
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <ServiceCard :key="index" v-for="(service, index) in appointmentDetails.offer.services"
        :itemTitle="service.item_number" 
        :sessionName="service.title" 
        serviceTitle="Service Description"
        :serviceDescription="service.description"
        editLink="/super-admin/company-details/info/authentication" unitPriceLabel="Unit Price" :unitPrice="`AED ${service.unit_price}`"
        quantityLabel="Quantity" :quantity="service.quantity" totalLabel="Total" :total="`AED ${service.total}`" deliveryTimeLabel="Delivery Time"
        :deliveryTime="convertTimeTo12HourFormat(service.delivery_time.split(' ')[1])" />
    </div>
  </div>

  
  <div class="" v-if="appointmentDetails?.offer.quotations.length > 0">
    <div class="flex justify-between items-center">
      <h5 class="fw-bold !text-base leading-5 text-dm-blue">
        Quote for Materials
      </h5>
      <button @click="handleMaterials" class="text-decoration-none text-primary !text-sm !font-bold">
        + Add Material
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <ServiceCard :key="index" v-for="(quote, index) in appointmentDetails?.offer?.quotations"
        :itemTitle="quote.item_title"
        :sessionName="quote.description"
        editLink="/super-admin/company-details/info/authentication" 
        unitPriceLabel="Unit Price" :unitPrice="`AED ${quote.unit_price}`"
        quantityLabel="Quantity" :quantity="quote.quantity" 
        totalLabel="Total" :total="`AED ${quote.total}`"
        deliveryTimeLabel="Procurement/lead time" :deliveryTime="convertTimeTo12HourFormat(quote.delivery_time.split(' ')[1])" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import BreakDown from "../../../components/common/BreakDown/BreakDown.vue";
import DescriptionCard from "../../../components/common/DescriptionCard/DescriptionCard.vue";
import FileCard from "../../../components/common/FileCard/FileCard.vue";
import InfoDisplay from "../../../components/common/InfoDisplay/InfoDisplay.vue";
import LocationCard from "../../../components/common/LocationCard/LocationCard.vue";
import PaymentCard from "../../../components/common/PaymentCard/PaymentCard.vue";
import ProfileCard from "../../../components/common/ProfileCard/ProfileCard.vue";
import SectionHeading from "../../../components/common/SectionHeading/SectionHeading.vue";
import ServiceCard from "../../../components/common/ServiceCard/ServiceCard.vue";
import StarRating from "../../../components/common/StarRating/StarRating.vue";
import SummaryCard from "../../../components/common/SummaryCard/SummaryCard.vue";
import UserProfileCard from "../../../components/common/UserProfileCard/UserProfileCard.vue";
import { useCompanyStore } from "../../../store";
import { useRoute } from 'vue-router';
import api from '../../../api';
import GoogleMapComponent from '../../../components/common/GoogleMapComponent.vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import { useToast } from 'primevue';
import { convertTimeTo12HourFormat, formatDateAndTime, getOrderType, getOrdinalNumber } from '../../../utils/helper';
import { paymentTermsStatus } from '../../../utils/constants';

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const companyStore = useCompanyStore();
const appointmentDetails = ref(null);
const locationData = ref(null);
const toast = useToast();

const handleServices = () => {
  companyStore.toggleIsServiceDetails();
};

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
      console.log(data, "data");
      appointmentDetails.value = data;
      toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
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
