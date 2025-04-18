<template>
  <div class="company-header mb-5 rounded-2xl">
    <div class="flex justify-between items-center" v-if="store.companyData">
      <div class="company-info">
        <div class="flex items-center gap-6">
          <img
            :src="
              getCompanyUserImage(store?.companyData?.user?.profile_picture)
            "
            class="w-24 h-24 object-cover rounded-2xl shadow-lavendar-card"
            alt="Company Logo"
            loading="lazy"
          />
          <div class="company-details-text">
            <div
              class="bg-green-200 mb-2 py-1.5 px-2 inline-flex items-center gap-2 rounded-lg"
            >
              <span class="text-accent-green font-theme font-semibold text-xs"
                >Active</span
              >
              <img :src="getImageUrl('chevron-down.svg')" alt="chevron-down" />
            </div>

            <h3 class="text-2xl font-bold text-dm-blue leading-7">
              {{ store?.companyData?.company?.company_name }}
            </h3>
            <p
              class="m-0 font-theme text-grayish-purple leading-5 font-normal !text-[15px] !mt-1"
            >
              ID OFC {{ store?.companyData?.company?.id }}
            </p>
          </div>
        </div>
      </div>
      <div class="inline-flex gap-6">
        <RevenueStats :companyData="store.companyData" />

        <div class="inline-flex flex-col gap-2">
          <p
            class="text-[15px] font-semibold leading-3.5 text-vivid-purple m-0"
          >
            Rating
          </p>
          <div class="flex flex-row items-center gap-3">
            <StarRating
              :rating="store?.companyData?.company?.reviews_avg_rating || 0"
              :width="20"
              :height="20"
            />
            <div class="rounded-3xl px-4 py-[3px] bg-light-lilac">
              <h5
                class="text-dm-blue text-base leading-5 font-theme !font-semibold m-0"
              >
                {{ store?.companyData?.company?.reviews_avg_rating || 0 }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <keep-alive>
      <TabNavigation />
    </keep-alive>
  </div>
</template>

<script setup>
import TabNavigation from "../components/TabNavigation.vue";
import { useCompanyStore } from "../store";
import RevenueStats from "./common/RevenueStats/RevenueStats.vue";
import StarRating from "./common/StarRating/StarRating.vue";
const store = useCompanyStore();

const getImagePath = (imageName) => {
  return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};

const getCompanyUserImage = (img) => {
  return img?.file_path;
};

const getImageUrl = (path) => {
  return new URL(`../assets/image/icons/${path}`, import.meta.url).href;
};
</script>

<style scoped>
.company-details {
  background-color: #f2f4fb;
  padding: 20px;
}

.company-header {
  background-color: #fcfdff;
  padding: 12px 16px 0px 16px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.company-details-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
}

.stars {
  color: #f8961e;
}

.company-details-text h3 {
  font-weight: 700;
  margin: 0;
}

.stat-item p {
  color: #5825eb;
  font-weight: 600;
}
</style>
