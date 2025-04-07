<template>
  <div
    class="border border-solid border-light-lilac py-3 px-4 rounded-xl flex flex-col gap-4"
  >
    <div class="flex flex-col gap-4">
      <div class="company-info flex gap-4 items-center">
        <img
          :src="customer?.user?.profile_picture?.file_path || fallbackManager"
          @error="(event) => (event.target.src = fallbackManager)"
          class="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <p
            class="text-dm-blue font-theme font-semibold text-sm leading-4 mb-1"
          >
            {{ customer?.user?.name }}
          </p>
          <p
            class="font-theme text-xs leading-[4.4px] text-vivid-purple font-normal m-0"
          >
            {{ customer?.user?.role }}
          </p>
          <div class="flex items-center gap-[3px] mt-2">
            <StarRating :rating="stars" :width="12" :height="12" />
          </div>
        </div>
      </div>

      <p
        class="text-xs font-theme font-normal text-grayColor leading-[18px] m-0"
      >
        {{ customer?.review_text }}
      </p>
    </div>

    <div
      v-if="customer && customer.reviewed_by"
      class="company-info flex gap-4 items-center"
    >
      <img
        :src="
          customer?.reviewed_by?.profile_picture?.file_path || fallbackManager
        "
        @error="(event) => (event.target.src = fallbackManager)"
        class="w-10 h-10 rounded-lg object-cover"
      />
      <div>
        <p
          class="font-theme font-normal text-grayColor text-[10px] leading-3 mb-1"
        >
          {{ customer.reviewed_by.designation }}
        </p>
        <p class="text-dm-blue font-theme font-semibold text-sm leading-4 m-0">
          {{ customer.reviewed_by.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import StarRating from "../../common/StarRating/StarRating.vue";
defineProps({
  customer: Object,
  stars: Number,
  fallbackManager: String,
});
</script>
