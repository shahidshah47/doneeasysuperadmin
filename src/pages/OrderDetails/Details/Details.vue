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

          <div class="row g-2 mb-2">
            <div class="col-md-6">
              <InfoDisplay
                label="Start Duration"
                value="Sat, 19 Nov 2023"
                className="flex flex-col gap-1"
              />
            </div>

            <div class="col-md-6">
              <InfoDisplay
                label="End Duration"
                value="Sat, 19 Nov 2023"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                label="Order Type"
                value="Recurring"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                label="Contract duration"
                value="Yearly 365 days"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                label="Service Type"
                value="On Demand"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                label="Payment Status"
                value="Paid 50%"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                label="Order Amount"
                value="AED 1230.00"
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
            <ProfileCard
              imageSrc="../../../assets/images2/ltd.png"
              altText="ltd"
              mainText="XYZ Bito Group Pvt Ltd"
              linkText="View Details"
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
          <img
            v-for="(image, index) in images"
            :key="index"
            :src="getSurvyUrl(image.src)"
            :alt="image.alt"
            class="w-24 h-24 !rounded-xl object-cover border border-white-100"
          />
        </div>
      </div>
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
        <div>
          <h5 class="fw-semibold !text-base !text-dm-blue mt-3">Attachments</h5>
          <FileCard
            fileIcon="../../../assets/images2/file-icon.png"
            fileName="Company Profile"
            fileSize="3.2mb"
          />
        </div>
      </div>
    </div>
    <div class="col-md-3 flex flex-col">
      <div class="flex">
        <h5 class="fw-semibold !text-base !text-dm-blue mb-2">Attachments</h5>

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
import { ref } from "vue";
import InfoDisplay from "../../../components/common/InfoDisplay/InfoDisplay.vue";
import ProfileCard from "../../../components/common/ProfileCard/ProfileCard.vue";
import SummaryCard from "../../../components/common/SummaryCard/SummaryCard.vue";
import UserProfileCard from "../../../components/common/UserProfileCard/UserProfileCard.vue";
import LocationCard from "../../../components/common/LocationCard/LocationCard.vue";
import FileCard from "../../../components/common/FileCard/FileCard.vue";
import DescriptionCard from "../../../components/common/DescriptionCard/DescriptionCard.vue";
import SectionHeading from "../../../components/common/SectionHeading/SectionHeading.vue";

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
