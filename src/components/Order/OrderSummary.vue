<template>
  <div class="row my-4 flex">
    <div class="col-md-6 flex flex-col">
      <SectionHeading
        title="Orders Details"
        customClass="!text-base !font-semibold text-dm-blue leading-5"
      />

      <div class="card border-0 rounded-3 flex-grow">
        <div class="card-body position-relative">
          <div
            class="flex items-center gap-3 bg-blue-200 py-1 px-2 rounded-md w-[20%] mb-1"
          >
            <p class="!text-sm !text-dm-blue font-semibold leading-5 mb-0">
              ID: {{ orderData.id }}
            </p>
            <div class="flex items-center gap-2">
              <img
                :src="getImageUrl('copy.svg')"
                alt="copy-icon"
                class="w-4 h-4"
              />
              <div class="bg-grayColor w-[1.5px] h-2.5"></div>
              <img
                :src="getImageUrl('share-2.svg')"
                alt="share-icon"
                class="w-4 h-4"
              />
            </div>
          </div>
          <h4
            class="text-dm-blue !font-semibold leading-4 !text-[20px] font-theme"
          >
            {{ orderData.title }}
          </h4>

          <div class="row g-2 mb-2">
            <div class="col-md-6">
              <InfoDisplay
                label="Start Duration"
                :value="formatDate(orderData?.start_date)"
                className="flex flex-col gap-1"
              />
            </div>

            <div class="col-md-6">
              <InfoDisplay
                label="End Duration"
                :value="formatDate(orderData?.end_date)"
                className="flex flex-col gap-1"
              />
            </div>

            <div class="col-md-6">
              <InfoDisplay
                label="Order Type"
                :value="getOrderType(orderData?.type)"
                className="flex flex-col gap-1"
              />
            </div>

            <div class="col-md-6">
              <InfoDisplay
                label="Contract Duration"
                :value="`${orderData?.contract_duration || 0} days`"
                className="flex flex-col gap-1"
              />
            </div>

            <div class="col-md-6">
              <InfoDisplay
                label="Service Type"
                :value="getServiceType(orderData?.service_type)"
                className="flex flex-col gap-1"
              />
            </div>

            <div class="col-md-6">
              <InfoDisplay
                label="Payment Status"
                :value="getPaymentStatus(orderData)"
                className="flex flex-col gap-1"
              />
            </div>

            <div class="col-md-6">
              <InfoDisplay
                label="Order Amount"
                :value="`AED ${orderData?.total_budget || '0.00'}`"
                className="flex flex-col gap-1"
              />
            </div>
          </div>

          <div class="row">
            <!-- User Profile -->
            <ProfileCard
              :imageSrc="'../../../assets/images2/manager.png'"
              altText="Manager Image"
              :subText="orderData?.user?.designation || 'N/A'"
              :mainText="orderData?.user?.name || 'Unknown User'"
            />

            <!-- Company Profile -->
            <ProfileCard
              :imageSrc="'../../../assets/images2/ltd.png'"
              altText="Company Logo"
              :mainText="
                orderData?.user?.company?.company_name || 'Unknown Company'
              "
              :linkText="'View Details'"
            />
          </div>

          <div class="mt-4">
            <SummaryCard
              title="Customer Summary"
              description="Lorem ipsum dolor sit amet consectetur. Proin tellus ac sit ullamcorper morbi condimentum tellus."
              readMoreLink="#"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 flex flex-col">
      <div>
        <div class="flex">
          <div class="flex items-center gap-2 mb-2">
            <h5 class="fw-semibold !text-base !text-dm-blue m-0">
              Upload Site Pictures
            </h5>
            <img
              :src="getImageUrl('info-circle-2.svg')"
              alt="info-circle-icon"
              class="w-5 h-5"
            />
          </div>
          <p
            class="!text-grayColor text-sm leading-5 !font-semibold mb-0 ms-auto font-theme"
          >
            View All
          </p>
        </div>
        <div class="flex space-x-3">
          <div class="image-gallery">
            <img
              v-for="(image, index) in orderData?.images"
              :key="index"
              :src="image.file_path"
              alt="Order Image"
              class="w-20 h-20 object-cover rounded-md"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-1 flex-col">
        <h5 class="fw-semibold mt-3 !text-base !text-dm-blue">
          Order Location
        </h5>
        <div class="flex-1 flex">
          <LocationCard
            class="flex-grow h-full"
            :location="{
              lat: Number(orderData?.address?.lat || 0),
              lng: Number(orderData?.address?.lng || 0),
            }"
            :address="orderData?.address?.address || 'No Address Available'"
            buttonText="Open Map"
          />
        </div>
      </div>
    </div>
    <div class="col-md-3 flex flex-col">
      <div>
        <div class="flex">
          <h5 class="fw-semibold !text-base !text-dm-blue mb-2">Attachments</h5>

          <p
            class="!text-grayColor text-sm leading-5 !font-semibold mb-0 ms-auto font-theme"
          >
            View All
          </p>
        </div>

        <div class="overflow-y-auto max-h-48 space-y-2">
          <div v-for="(doc, index) in orderData.documents" :key="index">
            <FileCard
              fileIcon="../../../assets/images2/file-icon.png"
              :fileName="doc.file_name"
              :fileSize="doc.file_size"
            />
          </div>
        </div>
      </div>

      <DescriptionCard
        title="Additional terms"
        content="Custom content goes here..."
        linkText="read more"
        :lineClamp="3"
      />
    </div>
  </div>
</template>

<script setup>
import { formatDate } from "../../utils/helper";
import DescriptionCard from "../common/DescriptionCard/DescriptionCard.vue";
import FileCard from "../common/FileCard/FileCard.vue";
import InfoDisplay from "../common/InfoDisplay/InfoDisplay.vue";
import LocationCard from "../common/LocationCard/LocationCard.vue";
import ProfileCard from "../common/ProfileCard/ProfileCard.vue";
import SummaryCard from "../common/SummaryCard/SummaryCard.vue";
import { defineProps } from "vue";

const getImageUrl = (path) => {
  return new URL(`../../assets/image/icons/${path}`, import.meta.url).href;
};

const getOrderType = (type) => {
  const types = { 1: "One-time", 2: "Recurring" };
  return types[type] || "Unknown";
};

const getServiceType = (type) => {
  const types = { 1: "On Demand", 2: "Scheduled" };
  return types[type] || "Unknown";
};

const getPaymentStatus = (data) => {
  return data?.payment_status ? `Paid ${data.payment_status}%` : "Pending";
};

defineProps({
  orderData: Object,
});
</script>
