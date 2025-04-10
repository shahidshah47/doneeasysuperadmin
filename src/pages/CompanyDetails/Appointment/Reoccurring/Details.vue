<template>
  <div class="row my-4 flex">
    <div class="col-md-6">
      <h5 class="fw-bold !text-base !text-dm-blue">Active Requests</h5>
      <RequestTable title="Order Details" :requests="requests" />
    </div>
    <div class="col-md-6">
      <h5 class="fw-bold !text-base !text-dm-blue">Previous Requests</h5>
<!--      <SectionHeading-->
<!--        title="Previous Requests"-->
<!--        customClass="!text-[20px] !font-semibold text-dm-blue leading-5 mb-3"-->
<!--      />-->
      <RequestTable title="Order Summary" :requests="requests" />
    </div>
  </div>
  <div class="row my-4 flex" v-if="appointDetails !== null">
    <div class="col-md-6 flex flex-col">
      <SectionHeading
          title="Order Details"
          customClass="!text-base !font-bold text-dm-blue leading-5"
      />

      <div class="card border-0 rounded-3 flex-grow">
        <div class="card-body relative flex gap-2 flex-wrap flex-col">
          <div class="inline-flex justify-between items-start">
            <div>
              <p class="text-base !text-grayish-purple font-normal leading-5 mb-1">
                ID: {{ appointDetails.order_id }}
              </p>
              <h4 class="text-dm-blue !font-bold leading-4 !text-[20px] font-theme">
                {{ appointDetails.order.title }}
              </h4>
            </div>
            <span class="bg-gradient-primary rounded-sm text-uppercase text-white-100 !text-xs font-bold leding-4 px-2 py-1">In Progress</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InfoDisplay
                label="Date"
                :value="
              formatDateAndTime(appointDetails.delivery_date)
                ?.formattedDate
            "
            />
            <InfoDisplay
                label="Time"
                :value="
              formatDateAndTime(null, appointDetails.delivery_time)
                ?.formattedTime
            "
            />
            <InfoDisplay
                label="Order Type"
                :value="getOrderType(appointDetails.order.type)"
            />
            <InfoDisplay label="Payment Status" value="Paid" />
            <InfoDisplay
                label="Order Amount"
                :value="appointDetails.order.total_budget"
            />
          </div>

          <div class="flex justify-between" v-if="user || company">
            <ProfileCard
                :filePath="user.profile_picture?.file_path"
                imageSrc="../../../assets/images2/manager.png"
                altText="manager img"
                subText="Manager"
                :mainText="user.name"
            />
            <ProfileCard
                :filePath="company.company_logo?.file_path"
                imageSrc="../../../assets/images2/ltd.png"
                altText="ltd"
                :mainText="company.company_name"
                linkText="View Details"
                @viewDetails="handleViewDetails()"
            />
          </div>

          <div>
            <SummaryCard
                title="Customer Summary"
                :description="appointDetails.order.description"
                readMoreLink="#"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3 flex flex-col gap-2">
      <div v-if="appointDetails.order.address" class="h-full flex-1">
        <h5 class="fw-bold !text-base !text-dm-blue">Order Location</h5>
        <LocationCard
          class="flex-grow h-full"
          :location="{
            lat: Number(appointDetails.order?.address?.lat),
            lng: Number(appointDetails.order?.address?.lng),
          }"
          :address="appointDetails.order.address.address"
          buttonText="Open Map"
        />
      </div>
    </div>

    <div class="col-md-3 flex flex-col">
      <h5 class="fw-bold !text-base !text-dm-blue">Attachments</h5>
      <div
          v-for="(doc, index) in appointDetails.order.documents"
          :key="doc.id || index"
      >
        <FileCard
            :key="index"
            fileIcon="../../../assets/images2/file-icon.png"
            :fileName="doc.file_name"
            :fileSize="doc.file_size"
        />
      </div>

      <!--      <DescriptionCard-->
      <!--          title="Additional terms"-->
      <!--          :content="appointmentDetails.offer.additional_terms"-->
      <!--          linkText="read more"-->
      <!--          :lineClamp="3"-->
      <!--      />-->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import RequestTable from "../../../../components/common/RequestTable/RequestTable.vue";
import SectionHeading from "../../../../components/common/SectionHeading/SectionHeading.vue";
import { useRoute } from "vue-router";
import { useToast } from "primevue";
import api from "../../../../api";
import AppointmentDetailCards from "../../../../components/Appointment/AppointmentDetailCards.vue";
import {formatDateAndTime, getOrderType} from "../../../../utils/helper.js";
import ProfileCard from "../../../../components/common/ProfileCard/ProfileCard.vue";
import LocationCard from "../../../../components/common/LocationCard/LocationCard.vue";
import SummaryCard from "../../../../components/common/SummaryCard/SummaryCard.vue";
import UserProfileCard from "../../../../components/common/UserProfileCard/UserProfileCard.vue";
import InfoDisplay from "../../../../components/common/InfoDisplay/InfoDisplay.vue";
import DescriptionCard from "../../../../components/common/DescriptionCard/DescriptionCard.vue";
import FileCard from "../../../../components/common/FileCard/FileCard.vue";

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const appointDetails = ref(null);
const toast = useToast();
const user = ref(null);
const company = ref(null);
const isUserAvailable = ref(JSON.parse(localStorage.getItem("user")));
const requests = ref([
  {
    date: "2020-05-17, 10:00 AM",
    status: "In Progress",
    summary: "Lorem ipsum...",
  },
  {
    date: "2020-05-17, 10:00 AM",
    status: "Cancelled",
    summary: "Proin tellus...",
  },
]);

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

const fetchAppointDetailsById = async (id) => {
  try {
    const response = await api.get("/superadmin/user/appointment/" + id);
    if (response.status === 200) {
      const { data, message } = response?.data;
      appointDetails.value = data;
      console.log(data, "appointment Details");

      const { offer, user: appointmentUser } = appointDetails?.value;
      const { user: offerUser, payment_terms } = offer || {};
      user.value = isVendorOrAdmin.value ? appointDetails?.value?.user : offerUser || appointmentUser;
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

const fetchRequestsById = async (id) => {
  try {
    const response = await api.get("/superadmin/user/appointment/request/" + id);
    if (response.status === 200) {
      const { data, message } = response?.data;
      console.log(response, "data response for fetch requests");
      toast.add({
        severity: "success",
        summary: "Success",
        detail: message,
        life: 3000,
      });
      if (!data) {
        requests.value = [];
      }
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
  fetchRequestsById(route.params.appointmentId);
  fetchAppointDetailsById(route.params.appointmentId);
});
</script>
