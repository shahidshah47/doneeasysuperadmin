<template>
  <div
    class="bg-white-100 py-4 px-3 rounded-xl flex flex-col gap-4 justify-between flex-1"
  >
    <div class="flex flex-col gap-4">
      <div class="company-info flex gap-4 items-center">
        <img
          :src="associate?.user?.profile_picture?.file_path || fallbackManager"
          :alt="`Profile of ${associate?.user?.name}`"
          class="w-14 h-14 rounded-2xl object-cover"
          ref="profileImgRef"
          @error="handleProfileImgError"
        />
        <div>
          <p
            class="text-dm-blue font-theme font-semibold text-sm leading-4 mb-1"
          >
            {{ associate?.user?.name }}
          </p>
          <p
            class="font-theme text-xs leading-[4.4px] text-vivid-purple font-normal m-0"
          >
            {{ associate?.user?.role }}
          </p>
          <div class="flex items-center gap-[3px] mt-2">
            <StarRating :rating="stars" :width="12" :height="12" />
          </div>
        </div>
      </div>

      <p
        class="text-xs font-theme font-normal text-grayColor leading-[18px] m-0"
      >
        {{ associate?.review_text }}
      </p>

      <div
        v-if="associate && Object.keys(associate).length > 0"
        class="flex flex-col gap-2"
      >
        <div v-for="(value, key) in filteredCategories" :key="key">
          <CategoryRating
            v-if="value"
            :category="{ label: categoryKeys[key] }"
            :rating="value"
          />
          <!-- Empty div for categories that have no value -->
          <div v-else class="empty-category-div"></div>
        </div>
      </div>
    </div>

    <div class="company-info flex gap-4 items-center">
      <img
        :src="
          associate?.reviewed_by?.profile_picture?.file_path || fallbackManager
        "
        alt="profile Logo"
        class="w-10 h-10 rounded-lg border-2 border-solid border-white-100 object-cover shadow-lavendar-card"
        ref="reviewImgRef"
        @error="handleReviewImgError"
      />
      <div>
        <p
          class="font-theme font-normal text-grayColor text-[10px] leading-3 mb-1"
        >
          {{ associate?.reviewed_by?.designation }}
        </p>
        <p class="text-dm-blue font-theme font-semibold text-sm leading-4 m-0">
          {{ associate?.reviewed_by?.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import StarRating from "../../common/StarRating/StarRating.vue";
import CategoryRating from "../../common/CategoryRating/CategoryRating.vue";

import fallbackManager from "../../../assets/images2/manager.png";

const props = defineProps({
  associate: Object,
  stars: Number,
});

const profileImgRef = ref(null);
const reviewImgRef = ref(null);

function handleProfileImgError() {
  if (profileImgRef.value) {
    profileImgRef.value.src = fallbackManager;
  }
}

function handleReviewImgError() {
  if (reviewImgRef.value) {
    reviewImgRef.value.src = fallbackManager;
  }
}

const categoryKeys = {
  after_sale_support: "After sale support",
  communication: "Communication",
  pre_sale_support: "Pre sale support",
  problem_resolution: "Problem resolution",
  response_time: "Response time",
  service_quality: "Service quality",
};

const filteredCategories = computed(() => {
  const categories = props.associate || {};
  const result = {};

  Object.keys(categoryKeys).forEach((key) => {
    result[key] = categories[key] || null; // Assign value or null for empty divs
  });

  return result;
});
</script>

<style scoped>
.empty-category-div {
  height: 40px; /* Adjust height as per design */
  background-color: #f0f0f0; /* Light gray background for empty divs */
}
</style>
