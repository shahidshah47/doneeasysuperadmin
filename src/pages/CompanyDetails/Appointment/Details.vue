<template>
  <div class="row my-4 flex" v-if="appointmentDetails">
    <div class="col-md-6 flex flex-col">
      <SectionHeading title="Order Details" customClass="!text-base !font-semibold text-dm-blue leading-5" />

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

    <div class="col-md-3 flex flex-col">
      <div class="d-flex">
        <h5 class="fw-semibold !text-base !text-dm-blue">Assign to</h5>
        <p class="!text-grayColor text-sm leading-5 !font-semibold mb-0 ms-auto font-theme">
          View All
        </p>
      </div>
      <UserProfileCard profileImage="../../../assets/images2/profile-1.png" name="Nancy Tolbert"
        designation="Senior Manager" :rating="4" />

      <h5 class="fw-semibold mt-3 !text-base !text-dm-blue">Order Location</h5>
      <div class="flex-1 flex">
        <LocationCard class="flex-grow h-full" address="123 Main St." imageSrc="../../../assets/images2/map-2.png"
          buttonText="Open Map" />
      </div>
    </div>

    <div class="col-md-3 flex flex-col">
      <h5 class="fw-semibold !text-base !text-dm-blue">Attachments</h5>
      <FileCard fileIcon="../../../assets/images2/file-icon.png" fileName="Company Profile" fileSize="3.2mb" />

      <DescriptionCard title="Additional terms" content="Custom content goes here..." linkText="read more"
        :lineClamp="3" />
    </div>
  </div>

  <h5 class="fw-semibold">Payment Terms</h5>
  <div class="card border-0 rounded-3">
    <div class="card-body">
      <div class="row">
        <PaymentCard badgeText="1st payment" paymentDescription="25% - After event reservation."
          paymentDate="2020-05-17, 10:00 AM" currency="AED" amount="2300.00" status="Paid" />
      </div>
    </div>
  </div>

  <BreakDown title="Offer Breakdown" @toggle="handleToggle" />

  <div class="d-flex justify-content-between align-items-center">
    <h5 class="fw-semibold !text-[20px] leading-5 text-dm-blue">
      Quote for Services
    </h5>
    <button @click="handleServices" class="text-decoration-none text-primary !text-sm !font-semibold">
      + Add Service
    </button>
  </div>

  <div class="row row-gap-4 mb-5 mt-3">
    <div class="col-md-4">
      <ServiceCard itemTitle="Item No 1" sessionName="Session - Introduction" serviceTitle="Service Description"
        serviceDescription="Lorem ipsum dolor sit amet consectetur..."
        editLink="/super-admin/company-details/info/authentication" unitPriceLabel="Unit Price" unitPrice="AED 12.00"
        quantityLabel="Quantity" quantity="24" totalLabel="Total" total="AED 288.00" deliveryTimeLabel="Delivery Time"
        deliveryTime="Not Specific" />
    </div>
  </div>

  <div class="d-flex justify-content-between align-items-center">
    <h5 class="fw-semibold !text-[20px] leading-5 text-dm-blue">
      Quote for Materials
    </h5>
    <button @click="handleMaterials" class="text-decoration-none text-primary !text-sm !font-semibold">
      + Add Material
    </button>
  </div>

  <div class="row row-gap-4 mb-5 mt-3">
    <div class="col-md-4">
      <ServiceCard itemTitle="Item No 1"
        sessionName="Lorem ipsum dolor sit amet consectetur. Proin tellus ac sit ullamcorper morbi condimentu"
        editLink="/super-admin/company-details/info/authentication" unitPriceLabel="Unit Price" unitPrice="AED 12.00"
        quantityLabel="Quantity" quantity="24" totalLabel="Total" total="AED 288.00"
        deliveryTimeLabel="Procurement/lead time" deliveryTime="12 Hours" />
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
import { formatDateAndTime, getOrderType } from '../../../utils/helper';

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
      console.log(response, "response fetch appoint details");
      const { data, message } = response?.data?.data;
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
