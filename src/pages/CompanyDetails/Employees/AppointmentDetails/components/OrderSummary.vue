<template>
  <div class="row my-4 flex" v-if="orderSummary">
    <div class="col-md-6 flex flex-col">
      <SectionHeading
        title="Offers Details"
        customClass="!text-base !font-semibold text-dm-blue leading-5"
      />

      <div class="card border-0 rounded-3 flex-grow">
        <div class="card-body position-relative">
          <div class="position-absolute end-0 me-3 mt-3 top-0">
            <span
              :class="[
                'rounded-sm text-uppercase text-white-100 !text-xs font-bold leding-4 px-2 py-1',
                statusInfo.class,
              ]"
            >
              {{ statusInfo.label }}
            </span>
          </div>
          <p class="!text-base !text-grayish-purple font-normal leading-5 mb-0">
            ID: {{ orderSummary?.order?.id }}
          </p>
          <h4
            class="text-dm-blue !font-semibold leading-4 !text-[20px] font-theme capitalize"
          >
            {{ orderSummary?.order?.title }}
          </h4>

          <div class="row g-2 mb-2">
            <div class="col-md-6">
              <InfoDisplay
                label="Date"
                :value="formatDate(orderSummary?.delivery_date)"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                label="Time"
                :value="formatTime(orderSummary?.delivery_time)"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                label="Order Type"
                value="Online"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                label="Payment Status"
                :value="`Paid ${orderSummary?.paid_percentage}%`"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                label="Order Amount"
                :value="
                  offerDetails?.grand_total != null
                    ? Math.floor(offerDetails?.grand_total)
                    : ''
                "
                className="flex flex-col gap-1"
              />
            </div>
          </div>

          <div class="row">
            <ProfileCard
              :imageSrc="offerDetails?.user?.profile_picture?.file_path"
              :altText="`${offerDetails?.user?.name} img`"
              :subText="offerDetails?.user?.designation"
              :mainText="offerDetails?.user?.name"
            />
            <ProfileCard
              :imageSrc="offerDetails?.user?.company?.company_logo?.file_path"
              :altText="offerDetails?.user?.company?.company_name"
              :mainText="offerDetails?.user?.company?.company_name"
              linkText="View
            Details"
            />
          </div>

          <div class="mt-4">
            <SummaryCard
              title="Customer Summary"
              :description="orderSummary?.order?.description"
              readMoreLink="#"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 flex flex-col">
      <div v-if="orderSummary?.associate_user.length > 0">
        <div class="d-flex">
          <h5 class="fw-semibold !text-base !text-dm-blue">Assign to</h5>
          <p
            class="!text-grayColor text-sm leading-5 !font-semibold mb-0 ms-auto font-theme"
          >
            View All
          </p>
        </div>
        <div
          v-for="(associate, index) in orderSummary?.associate_user"
          :key="associate.id || index"
        >
          <UserProfileCard
            :key="index"
            :profileImage="associate?.profile_picture?.file_path"
            :name="associate?.name"
            :designation="associate?.designation"
            :rating="4"
          />
        </div>
      </div>

      <h5 class="fw-semibold mt-3 !text-base !text-dm-blue">Order Location</h5>
      <div class="flex-1 flex h-full">
        <LocationCard
          class="flex-grow h-full"
          :location="{
            lat: Number(orderSummary?.order?.address?.lat),
            lng: Number(orderSummary?.order?.address?.lng),
          }"
          :address="orderSummary?.order?.address?.address"
          buttonText="View Map"
        />
      </div>
    </div>
    <div
      class="col-md-3 flex flex-col"
      v-if="offerDetails.order.documents.length"
    >
      <h5 class="fw-semibold !text-base !text-dm-blue">Attachments</h5>

      <div class="overflow-y-auto vivid-scrollbar max-h-36">
        <div
          v-for="(doc, index) in offerDetails.order.documents"
          :key="doc.id || index"
        >
          <FileCard
            :key="index"
            fileIcon="../../../assets/images2/file-icon.png"
            :fileName="doc.file_name"
            :fileSize="doc.file_size"
          />
        </div>
      </div>

      <DescriptionCard
        title="Additional terms"
        :content="offerDetails?.additional_terms"
        linkText="read more"
        :lineClamp="3"
      />
    </div>
  </div>

  <div v-if="offerDetails?.payment_terms?.length > 0">
    <h5 class="fw-bold !text-base !text-dm-blue">Payment Terms</h5>
    <div
      class="bg-white rounded-xl p-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
    >
      <PaymentCard
        :key="index"
        v-for="(paymentTerm, index) in offerDetails?.payment_terms"
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

  <div class="mb-4" v-if="offerDetails?.services.length > 0">
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
        v-for="(service, index) in offerDetails?.services"
        :key="service.id"
        :data="service"
        :itemTitle="`Item No ${index + 1}`"
        @edit="(data) => handleClickEdit(data)"
      />
    </div>
  </div>

  <div v-if="offerDetails?.quotations.length > 0">
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
        v-for="(quote, index) in offerDetails?.quotations"
        :key="quote.id"
        :itemTitle="`Item No ${index + 1}`"
        :data="quote"
        @edit="(data) => handleClickEdit(data)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, toRaw, watch } from "vue";
import api from "../../../../../api";
import BreakDown from "../../../../../components/common/BreakDown/BreakDown.vue";
import DescriptionCard from "../../../../../components/common/DescriptionCard/DescriptionCard.vue";
import FileCard from "../../../../../components/common/FileCard/FileCard.vue";
import InfoDisplay from "../../../../../components/common/InfoDisplay/InfoDisplay.vue";
import LocationCard from "../../../../../components/common/LocationCard/LocationCard.vue";
import PaymentCard from "../../../../../components/common/PaymentCard/PaymentCard.vue";
import ProfileCard from "../../../../../components/common/ProfileCard/ProfileCard.vue";
import SectionHeading from "../../../../../components/common/SectionHeading/SectionHeading.vue";
import ServiceCard from "../../../../../components/common/ServiceCard/ServiceCard.vue";
import MaterialCard from "../../../../../components/common/MaterialCard/MaterialCard.vue";
import SummaryCard from "../../../../../components/common/SummaryCard/SummaryCard.vue";
import UserProfileCard from "../../../../../components/common/UserProfileCard/UserProfileCard.vue";
import MapIcon from "../../../../../assets/images2/map-2.png";
import ManagerIcon from "../../../../../assets/images2/manager.png";
import CompanyIcon from "../../../../../assets/images2/ltd.png";
import {
  getStatusInfo,
  formatDate,
  formatTime,
  getOrdinalNumber,
  formatDateAndTime,
  formatWithCommas,
} from "../../../../../utils/helper";
import { paymentTermsStatus } from "../../../../../utils/constants";
import { useAppointmentStore } from "../../../../../store";

const props = defineProps({
  orderSummary: Object,
});

const appointStore = useAppointmentStore();

const handleServices = () => {
  appointStore.toggleIsServiceDetails();
};

const handleMaterials = () => {
  appointStore.toggleIsMaterialDetails();
};

const handleClickEdit = (data) => {
  if (data.item_title) {
    appointStore.toggleIsMaterialDetails(data);
  } else {
    appointStore.toggleIsServiceDetails(data);
  }
};

const statusInfo = computed(() => {
  return props.orderSummary?.status
    ? getStatusInfo(props.orderSummary.status)
    : { class: "", label: "" };
});

const offerDetails = ref(null);

watch(
  () => props.orderSummary,
  async (newVal) => {
    if (newVal?.offer?.id) {
      try {
        const response = await api.get(
          `/superadmin/user/offer/${newVal.offer.id}`
        );
        offerDetails.value = response.data.data;
      } catch (error) {
        console.error("Failed to fetch offer details:", error);
      }
    }
  },
  { immediate: true }
);

watch(offerDetails, (newVal) => {
  const rawData = toRaw(newVal);
  console.log("Raw offer details:", rawData);
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
