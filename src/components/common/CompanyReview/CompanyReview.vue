<template>
  <div class="bg-white-100 py-4 px-3 rounded-xl flex flex-col gap-4">
    <div class="company-info flex gap-4 items-center">
      <img
        :src="profilePic || fallbackCompany"
        :alt="`${name} profile`"
        class="w-14 h-14 rounded-2xl object-cover"
        @error="handleProfileImgError"
        ref="profileImgRef"
      />
      <div>
        <p class="text-dm-blue font-theme font-semibold text-sm leading-4 mb-1">
          {{ orderTitle }}
        </p>
        <p class="text-xs text-vivid-purple m-0">
          {{ reviewDate }}
        </p>
        <div class="flex items-center gap-[3px] mt-2">
          <StarRating :rating="stars" :width="12" :height="12" />
        </div>
      </div>
    </div>

    <p class="text-xs font-theme font-normal text-grayColor leading-[18px] m-0">
      {{ review }}
    </p>

    <div class="company-info flex gap-4 items-center">
      <img
        :src="reviewImg || fallbackManager"
        alt="profile Logo"
        class="w-10 h-10 rounded-lg border-2 border-solid border-white-100 object-cover shadow-lavendar-card"
        @error="handleReviewImgError"
        ref="reviewImgRef"
      />
      <div>
        <p
          class="font-theme font-normal text-grayColor text-[10px] leading-3 mb-1"
        >
          {{ role }}
        </p>
        <p class="text-dm-blue font-theme font-semibold text-sm leading-4 m-0">
          {{ name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import StarRating from "../../common/StarRating/StarRating.vue";
import fallbackManager from "../../../assets/images2/manager.png";
import fallbackCompany from "../../../assets/image/company-profile.png";

const props = defineProps({
  profilePic: String,
  name: String,
  reviewDate: String,
  role: String,
  stars: Number,
  review: String,
  reviewImg: String,
  orderTitle: String,
});

const profileImgRef = ref(null);
const reviewImgRef = ref(null);

function handleProfileImgError() {
  if (profileImgRef.value) {
    profileImgRef.value.src = fallbackCompany;
  }
}

function handleReviewImgError() {
  if (reviewImgRef.value) {
    reviewImgRef.value.src = fallbackManager;
  }
}
</script>
