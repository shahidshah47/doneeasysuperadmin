<template>
  <div class="flex gap-2">
    <button
      v-for="tab in tabs"
      :key="tab.name"
      @click="activeTab = tab.name"
      :class="[
        'px-4 py-3 font-semibold !rounded-lg flex items-center space-x-2',
        activeTab === tab.name
          ? '!bg-vivid-purple text-white'
          : '!bg-white-100 !text-dm-blue',
      ]"
    >
      <span>{{ tab.name }}</span>
      <span
        v-if="tab.count !== null"
        class="!bg-vivid-purple p-[2px] text-xs !font-semibold !rounded-[2px] !text-white-100"
        >{{ formatCount(tab.count) }}</span
      >
    </button>
  </div>
  <div class="row my-4 flex">
    <div class="col-md-6 flex flex-col">
      <SectionHeading
        title="Orders Details"
        customClass="!text-base !font-semibold text-dm-blue leading-5"
      />

      <div class="card border-0 rounded-3 flex-grow">
        <div class="card-body position-relative">
          <div class="position-absolute end-0 me-3 !mt-6 top-0">
            <span
              class="bg-gradient-orange rounded-sm text-uppercase text-white-100 !text-xs font-bold leding-4 px-2 py-1"
            >
              Time Left: 03:30:45
            </span>
          </div>
          <div
            class="flex items-center gap-3 bg-blue-200 py-1 px-2 rounded-md w-[20%] mb-1"
          >
            <p class="!text-sm !text-dm-blue font-semibold leading-5 mb-0">
              ID: 98374861
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
            Laundry Services
          </h4>

          <div class="grid grid-cols-3 gap-2 mb-2">
            <div class="col-span-1">
              <InfoDisplay
                label="Expected Delivery Date"
                value="Sat, 19 Nov 2023"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-span-1">
              <InfoDisplay
                label="Expected Delivery Time"
                value="08:30am - 09:00pm"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-span-1">
              <InfoDisplay
                label="Budget"
                value="AED 1,300.00"
                className="flex flex-col gap-1"
              />
            </div>
          </div>

          <div class="row">
            <ProfileCard
              imageSrc="../../../assets/images2/manager.png"
              altText="manager img"
              subText="Manager"
              mainText="John Doe"
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
      <div class="d-flex">
        <h5 class="fw-semibold !text-base !text-dm-blue">Assign to</h5>
        <p
          class="!text-vivid-purple text-sm leading-5 !font-semibold mb-0 ms-auto font-theme"
        >
          Change
        </p>
      </div>
      <UserProfileCard
        profileImage="../../../assets/images2/profile-1.png"
        name="Nancy Tolbert"
        designation="Senior Manager"
        :rating="4"
      />
      <div>
        <h5 class="fw-semibold mt-3 !text-base !text-dm-blue">
          Order Location
        </h5>
        <div class="flex-1 flex">
          <LocationCard
            class="flex-grow h-full"
            address="123 Main St."
            imageSrc="../../../assets/images2/map-2.png"
            buttonText="Open Map"
          />
        </div>
      </div>
    </div>
    <div class="col-md-3 flex flex-col">
      <div class="flex">
        <h5 class="fw-semibold !text-base !text-dm-blue mb-2">
          Attachments & Pictures
        </h5>

        <p
          class="!text-grayColor text-sm leading-5 !font-semibold mb-0 ms-auto font-theme"
        >
          View All
        </p>
      </div>
      <FileCard
        fileIcon="../../../assets/images2/file-icon.png"
        fileName="Company Profile"
        fileSize="3.2mb"
      />
    </div>
  </div>
  <h5 class="fw-semibold">Payment Terms</h5>
  <div class="card border-0 rounded-3">
    <div class="grid grid-cols-3 gap-3">
      <div class="card-body">
        <div class="row">
          <PaymentCard
            badgeText="1st payment"
            paymentDescription="25% - After event reservation."
            paymentDate="2020-05-17, 10:00 AM"
            currency="AED"
            amount="2300.00"
            status="Paid"
          />
        </div>
      </div>
    </div>
  </div>

  <BreakDown title="Offer Breakdown" @toggle="handleToggle" />

  <div class="d-flex justify-content-between align-items-center">
    <h5 class="fw-semibold !text-[20px] leading-5 text-dm-blue">
      Quote for Services
    </h5>
    <button
      @click="handleServices"
      class="text-decoration-none text-primary !text-sm !font-semibold"
    >
      + Add Service
    </button>
  </div>

  <div class="row row-gap-4 mb-5 mt-3">
    <div class="col-md-4">
      <ServiceCard
        itemTitle="Item No 1"
        sessionName="Session - Introduction"
        serviceTitle="Service Description"
        serviceDescription="Lorem ipsum dolor sit amet consectetur..."
        editLink="/super-admin/company-details/info/authentication"
        unitPriceLabel="Unit Price"
        unitPrice="AED 12.00"
        quantityLabel="Quantity"
        quantity="24"
        totalLabel="Total"
        total="AED 288.00"
        deliveryTimeLabel="Delivery Time"
        deliveryTime="Not Specific"
      />
    </div>
  </div>

  <div class="d-flex justify-content-between align-items-center">
    <h5 class="fw-semibold !text-[20px] leading-5 text-dm-blue">
      Quote for Materials
    </h5>
    <button
      @click="handleMaterials"
      class="text-decoration-none text-primary !text-sm !font-semibold"
    >
      + Add Material
    </button>
  </div>

  <div class="row row-gap-4 mb-5 mt-3">
    <div class="col-md-4">
      <ServiceCard
        itemTitle="Item No 1"
        sessionName="Lorem ipsum dolor sit amet consectetur. Proin tellus ac sit ullamcorper morbi condimentu"
        editLink="/super-admin/company-details/info/authentication"
        unitPriceLabel="Unit Price"
        unitPrice="AED 12.00"
        quantityLabel="Quantity"
        quantity="24"
        totalLabel="Total"
        total="AED 288.00"
        deliveryTimeLabel="Procurement/lead time"
        deliveryTime="12 Hours"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InfoDisplay from "../../../components/common/InfoDisplay/InfoDisplay.vue";
import ProfileCard from "../../../components/common/ProfileCard/ProfileCard.vue";
import SummaryCard from "../../../components/common/SummaryCard/SummaryCard.vue";
import UserProfileCard from "../../../components/common/UserProfileCard/UserProfileCard.vue";
import LocationCard from "../../../components/common/LocationCard/LocationCard.vue";
import FileCard from "../../../components/common/FileCard/FileCard.vue";
import DescriptionCard from "../../../components/common/DescriptionCard/DescriptionCard.vue";
import SectionHeading from "../../../components/common/SectionHeading/SectionHeading.vue";
import PaymentCard from "../../../components/common/PaymentCard/PaymentCard.vue";
import ServiceCard from "../../../components/common/ServiceCard/ServiceCard.vue";
import BreakDown from "../../../components/common/BreakDown/BreakDown.vue";

const images = [
  { src: "site-survey.jpg", alt: "Profile 1" },
  { src: "site-survey.jpg", alt: "Profile 2" },
  { src: "site-survey.jpg", alt: "Profile 3" },
];

const activeTab = ref("Summary");
const tabs = ref([
  { name: "Summary", count: null },
  { name: "Offers", count: 15 },
  { name: "Site Survey", count: 2 },
  { name: "Chats", count: 23 },
]);

const formatCount = (count) => {
  if (count !== null && count < 10) {
    return `0${count}`;
  }
  return count;
};

const getImageUrl = (path) => {
  return new URL(`../../../assets/image/icons/${path}`, import.meta.url).href;
};

const getSurvyUrl = (imageName) => {
  return new URL(`../../../assets/image/${imageName}`, import.meta.url).href;
};
</script>

<style scoped>
button {
  transition: background-color 0.3s, color 0.3s;
}
</style>
