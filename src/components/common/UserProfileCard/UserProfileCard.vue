<template>
  <div class="!bg-white-100 rounded-xl p-3">
    <div class="card-body">
      <div class="flex items-center gap-4">
        <div
          class="w-15 h-15 shadow-lavendar-card border-2 border-solid border-white-100"
        >
          <img
            :src="imageUrl"
            alt="profile"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="">
          <p
            class="text-base leading-4 !text-dm-blue font-theme font-semibold mb-1"
          >
            {{ name }}
          </p>
          <p class="!text-vivid-purple font-normal text-sm font-theme mb-1">
            {{ designation }}
          </p>
          <div class="d-flex align-items-center gap-1">
            <StarRating :rating="rating" :width="16" :height="16" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import the StarRating component
import StarRating from "../../common/StarRating/StarRating.vue";

export default {
  name: "UserProfileCard",
  components: {
    StarRating,
  },
  props: {
    profileImage: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  computed: {
    imageUrl() {
      return new URL(this.profileImage, import.meta.url).href;
    },
  },
};
</script>
