<template>
  <div class="flex gap-1.5">
    <img
      v-for="index in 5"
      :key="index"
      :src="index <= Math.round(rating) ? filledStar : emptyStar"
      :width="width"
      :height="height"
      alt="star"
    />
  </div>
</template>

<script>
import filledStar from "../../../assets/image/icons/filled-star.svg";
import emptyStar from "../../../assets/image/icons/empty-star.svg";

export default {
  props: {
    rating: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
    },
  },
  data() {
    return {
      filledStar,
      emptyStar,
    };
  },
};
</script>
