<template>
  <header class="profile-header">
    <div class="profile-image-wrapper position-relative">
      <img
        loading="lazy"
        :src="userDetails?.user?.profile_picture?.file_path"
        class="profile-image"
        alt="User profile"
      />
      <span class="badge percentage-badge text-bg-primary">
        {{ getProfileCompletion() }}% complete
      </span>
    </div>
    <div class="profile-info">
      <div class="profile-status">
        <div class="status-label">
          <span class="status-text">{{
            getUserStatus(userDetails?.user?.status)?.statusText
          }}</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7fa5745e9ce934738f3c7c471924ca75ebd2fa8b2282ca7278f60b7b13917a2b?placeholderIfAbsent=true&apiKey=8b21d8e85c2c46cba1ed62101821a18e"
            class="status-icon"
            alt=""
          />
        </div>
        <button
          class="btn btn-primary rounded-3 !px-2 !py-[1px] !text-sm"
          style="text-transform: none !important"
        >
          {{ getUserRole(userDetails?.user?.user_type) }}
        </button>
      </div>
      <div class="user-details">
        <h1 class="user-name m-0">{{ userDetails?.user?.name }}</h1>
        <p class="user-id">ID OFC {{ userDetails?.user?.id }}</p>
      </div>
    </div>
    <div class="user-stats">
      <StatItem
        title="Revenue Contribution"
        :value="
          userDetails?.revenue_contribution
            ? formatWithCommas(userDetails.revenue_contribution)
            : '0'
        "
        currency="AED"
      />

      <StatItem
        title="No. of Order Completed"
        :value="userDetails?.total_orders"
      />
      <StatItem
        title="Assign. of Verticals"
        :value="userDetails?.vertical_count"
      />
      <div class="stat-item">
        <h2 class="stat-title text-[14.5px]">Rating</h2>
        <div class="rating-wrapper">
          <StarRating
            :rating="userDetails?.avg_rating || 1"
            :width="20"
            :height="20"
          />
          <span class="rating-value !font-semibold">{{
            userDetails?.avg_rating || 1
          }}</span>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import StarRating from "./common/StarRating/StarRating.vue";
import StatItem from "./common/StatItem/StatItem.vue";
import { getUserRole, getUserStatus } from "../utils/constants.js";
import { formatWithCommas } from "../utils/helper.js";

const props = defineProps({
  userDetails: Object,
});

const userDetails = ref(null);

const fetchFromLocalStorage = () => {
  const storedData = localStorage.getItem("employeeDetails");
  if (storedData) {
    userDetails.value = JSON.parse(storedData);
  }
};

onMounted(() => {
  fetchFromLocalStorage();
});

watch(
  () => props.userDetails,
  (newVal) => {
    if (newVal) {
      fetchFromLocalStorage();
    }
  }
);

const getProfileCompletion = () => {
  if (!userDetails.value) return 0;
  let percentage = 0;

  const sections = ["certificates", "experiences", "skills", "reviews"];
  sections.forEach((section) => {
    if (userDetails.value[section] && userDetails.value[section].length > 0) {
      percentage += 25;
    }
  });

  return percentage;
};
</script>

<style scoped>
.stat-title {
  color: #5825eb;
  font-size: 14.5px;
  font-weight: 600;
}
.profile-header {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
}

.profile-image-wrapper {
  display: flex;
  text-align: center;
}

.profile-image {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 92px;
  border-radius: 8px;
  z-index: 10;
}

.profile-info {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;
  justify-content: start;
  margin-left: 20px;
}

.profile-status {
  display: flex;
  align-items: start;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
}

.status-label {
  align-items: center;
  background-color: #d6ffef;
  border-radius: 8px;
  color: #00995c;
  display: flex;
  gap: 4px;
  justify-content: start;
  min-height: 24px;
  padding: 5px 8px;
}

.status-text {
  align-self: stretch;
  margin: auto 0;
  font-weight: 600;
}

.status-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 12px;
}

.role-label {
  align-self: stretch;
  background: linear-gradient(
    98deg,
    #38e0b2 -18.55%,
    #442ae8 28.45%,
    #5925eb 64.63%,
    #9e21ee 116.94%
  );
  border-radius: 8px;
  color: #f2f4fb;
  min-height: 24px;
  padding: 0 8px;
  width: 68px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  color: #0e0d35;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
}

.user-id {
  color: #6e6e86;
  font-size: 16px;
  margin-top: 4px;
  font-weight: 400;
  line-height: 1.4;
}

.user-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  line-height: 1.2;
  margin: auto 0;
}

.rating-wrapper {
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 16px;
  color: #0e0d35;
  margin-top: 8px;
}

.rating-stars {
  aspect-ratio: 5.95;
  object-fit: contain;
  object-position: center;
  width: 131px;
}

.rating-value {
  background-color: #f2f4fb;
  border-radius: 23.214px;
  padding: 3px 16px;
}

.percentage-badge {
  position: absolute;
  bottom: -6%;
  z-index: 999;
  background: #a321ee !important;
}

@media (max-width: 991px) {
  .profile-header,
  .user-stats {
    max-width: 100%;
  }
}
</style>
