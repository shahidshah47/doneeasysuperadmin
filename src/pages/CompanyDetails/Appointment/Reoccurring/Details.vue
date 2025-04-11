<template>
  <div class="row my-4 flex" v-if="!isReqDetails">
    <div class="col-md-6">
      <h5 class="fw-bold !text-base !text-dm-blue">Active Requests</h5>
      <RequestTable title="Order Details" :requests="requests" @viewDetail="(status, id) => handleViewDetails(status, id)" />
    </div>
    <div class="col-md-6">
      <h5 class="fw-bold !text-base !text-dm-blue">Previous Requests</h5>
      <RequestTable title="Order Summary" :requests="requests" @viewDetail="(status, id) => handleViewDetails(status, id)" />
    </div>
  </div>
  <div class="row" v-if="isReqDetails">
    <div class="col-md-12">
      <button
          class="btn !font-semibold focus:outline-none focus:ring-0 p-0 active:border-transparent"
          @click="isReqDetails = false; requestDetails = null"
          style="text-transform: none !important"
        >
        <span>
          <i class="fa-solid fa-arrow-left text-dm-blue mr-4"></i>
        </span>
        <span> Back </span>
      </button>
    </div>
  </div>
  <div class="row my-4 flex" v-if="appointDetails !== null && !requestDetails">
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
  <div class="row my-4 flex" v-if="requestDetails">
    <div class="col-md-6 flex flex-col">
      <SectionHeading
          title="Request Details"
          customClass="!text-base !font-bold text-dm-blue leading-5"
      />

      <div class="card border-0 rounded-3 flex-grow">
        <div class="card-body relative flex gap-2 flex-wrap flex-col">
          <div class="inline-flex justify-between items-start">
            <div>
              <p
                  class="text-base !text-grayish-purple font-normal leading-5 mb-1"
              >
                ID: {{ requestDetails.order_id }}
              </p>
              <h4
                  class="text-dm-blue !font-bold leading-4 !text-[20px] font-theme"
              >
                {{ requestDetails.order.title }}
              </h4>
            </div>
            <span
                :style="{ backgroundColor: getRequestStatus(requestDetails.status).bgColor, color: getRequestStatus(requestDetails.status).color }"
                class="rounded-sm text-uppercase !text-xs font-bold leading-4 px-2 py-1"
            >
              {{ getRequestStatus(requestDetails?.status)?.statusText }}</span
            >
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InfoDisplay
                label="Request Date"
                :value="
                formatDateAndTime(requestDetails.start_date)
                  ?.formattedDate
              "
            />
            <InfoDisplay
                label="Request Time"
                :value="
                formatDateAndTime(null, requestDetails.time)
                  ?.formattedTime
              "
            />
            <InfoDisplay
                label="Order Type"
                :value="getOrderType(requestDetails.order.type)"
            />
            <InfoDisplay label="Payment Status" value="Paid" />
            <InfoDisplay
                label="Order Amount"
                :value="requestDetails.order.total_budget"
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
                :description="requestDetails.summery"
                readMoreLink="#"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 flex flex-col gap-2">
      <div
          v-if="requestDetails.associates?.length > 0"
          class="h-full flex-1"
      >
        <div class="d-flex">
          <h5 class="fw-bold !text-base !text-dm-blue">Assign to</h5>
          <p
              class="!text-grayColor text-sm leading-5 !font-bold mb-0 ms-auto font-theme"
          >
            View All
          </p>
        </div>
        <div
            v-for="(associate, index) in requestDetails.associates"
            :key="associate.id || index"
        >
          <UserProfileCard
              :key="index"
              :profileImage="associate.profile_picture.file_path"
              :name="associate.name"
              :designation="associate.designation"
              :rating="4"
          />
        </div>
      </div>

      <div v-if="requestDetails.order.address" class="h-full flex-1">
        <h5 class="fw-bold !text-base !text-dm-blue">Order Location</h5>
        <LocationCard
            class="flex-grow h-full"
            :location="{
            lat: Number(requestDetails.order?.address?.lat),
            lng: Number(requestDetails.order?.address?.lng),
          }"
            :address="requestDetails.order.address.address"
            buttonText="Open Map"
        />
      </div>
    </div>
    <div class="col-md-3 flex flex-col">
      <h5 class="fw-bold !text-base !text-dm-blue">Attachments & Pictures</h5>
      <div
          v-for="(doc, index) in [...requestDetails.documents, ...requestDetails.images]"
          :key="doc.id || index"
      >
        <FileCard
            :key="index"
            fileIcon="../../../assets/images2/file-icon.png"
            :fileName="doc.file_name"
            :fileSize="doc.file_size"
        />
      </div>

      <DescriptionCard
          v-if="requestDetails.additional_terms"
          title="Additional terms"
          :content="requestDetails.additional_terms"
          linkText="read more"
          :lineClamp="3"
      />
    </div>
    <div class="col-md-12">
      <BreakDown title="Offer Breakdown" @toggle="() => {}" />
      <div class="" v-if="requestDetails.materials.length > 0">
        <div class="flex justify-between items-center">
          <h5 class="fw-bold !text-base leading-5 text-dm-blue">
            Quote for Materials
          </h5>
          <button
              @click="handleAddMaterial"
              class="text-decoration-none text-primary !text-sm !font-bold"
          >
            + Add Material
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <MaterialCard
              :key="index"
              v-for="(quote, index) in requestDetails.materials"
              :itemTitle="`Item No ${index + 1}`"
              :data="quote"
              @edit="(data) => handleEditMaterial(data)"
          />
        </div>
      </div>
    </div>
    <MaterialsModal v-if="isMaterialDetails" :materialDetails="materialDetails"
      :itemNumber="`Item No ` + (requestDetails?.materials.length + 1)"
      :appointOfferId="requestDetails?.id"
      @close="handleCloseModal" @submit="handleSubmit" />
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
import {formatDateAndTime, formatDateAtQuote, getOrderType} from "../../../../utils/helper.js";
import ProfileCard from "../../../../components/common/ProfileCard/ProfileCard.vue";
import LocationCard from "../../../../components/common/LocationCard/LocationCard.vue";
import SummaryCard from "../../../../components/common/SummaryCard/SummaryCard.vue";
import UserProfileCard from "../../../../components/common/UserProfileCard/UserProfileCard.vue";
import InfoDisplay from "../../../../components/common/InfoDisplay/InfoDisplay.vue";
import DescriptionCard from "../../../../components/common/DescriptionCard/DescriptionCard.vue";
import FileCard from "../../../../components/common/FileCard/FileCard.vue";
import {getRequestStatus} from "../../../../utils/constants.js";
import BreakDown from "../../../../components/common/BreakDown/BreakDown.vue";
import ServiceCard from "../../../../components/common/ServiceCard/ServiceCard.vue";
import MaterialCard from "../../../../components/common/MaterialCard/MaterialCard.vue";
import {useAppointmentStore} from "../../../../store/index.js";
import MaterialsModal from "../../../../components/common/MaterialsModal/MaterialsModal.vue";

const route = useRoute();
const appointStore = useAppointmentStore();
const loading = ref(true);
const error = ref(null);
const isMaterialDetails = ref(false);
const materialDetails = ref(null);
const appointDetails = ref(null);
const requestDetails = ref(null);
const toast = useToast();
const user = ref(null);
const company = ref(null);
const isReqDetails = ref(false);
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
const handleCloseModal = () => {
  isMaterialDetails.value = false;
  if (document) {
    document.body.classList.remove('overflow-hidden')
  }
}
const handleAddMaterial = () => {
  toggleMaterialModal();
  materialDetails.value = null;
}
const handleEditMaterial = (data) => {
  toggleMaterialModal()
  materialDetails.value = data;
}
const toggleMaterialModal = () => {
  isMaterialDetails.value = true;
  document.body.classList.add("overflow-hidden");
}

const handleSubmit = async (values) => {
  console.log(values, "values");
  let response;
  if (values?.id) {
    const data = { ...values, item_no: values.item_title, procurement_time: formatDateAtQuote(values.delivery_time) };
    delete data.item_title;
    console.log(data, "data updated");
    response = await api.post("/superadmin/user/appointment/request/" + requestDetails?.value.id + "/materials/add-update", {
      ...data,
      quantity: Number(values.quantity),
      unit_price: Number(values.unit_price),
      sub_total: values.total,
    });
  } else {
    const data = { ...values, item_no: values.item_title, procurement_time: formatDateAtQuote(values.delivery_time) };
    response = await api.post("/superadmin/user/appointment/request/" + requestDetails?.value.id + "/materials/add-update", {
      ...data,
      quantity: Number(values.quantity),
      unit_price: Number(values.unit_price),
      sub_total: values.total,
      total: values.total
    });
  }
  if (response && response?.status === 200) {
    isMaterialDetails.value = false;
    toast.add({
      severity: "success",
      summary: "Success",
      detail: response?.data?.message,
      life: 3000,
    });
  } else {
    toast.error({
      severity: "error",
      summary: "Error",
      detail: "Something went wrong!"
    });
  }
  await fetchRequestDetails(requestDetails?.value?.id);
}
const fetchRequestDetails = async (id) => {
  try {
    const response = await api.get("/superadmin/user/appointment/request/" + id);
    if (response.status === 200) {
      const { data, message } = response?.data;
      if (data) {
        requestDetails.value = data;
      }
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
}
const handleViewDetails = async (props) => {
  isReqDetails.value = props[0];
  await fetchRequestDetails(props[1]);
};

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
      if (data) {
        appointDetails.value = data;
        requests.value = data.order.requests?.map((item) => ({
          ...item,
          date: item.start_date,
          status: getRequestStatus(item.status)?.statusText,
          summary: item.summery
        }))
        const { offer, user: appointmentUser } = appointDetails?.value;
        const { user: offerUser, payment_terms } = offer || {};
        user.value = isVendorOrAdmin.value ? appointDetails?.value?.user : offerUser || appointmentUser;
        company.value = user?.value?.company || appointmentUser?.company || "";
      }
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
