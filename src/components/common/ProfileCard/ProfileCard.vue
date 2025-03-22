<template>
  <div class="col-md-6 d-flex align-items-center gap-2">
    <div
      class="w-9 h-9 border-2 border-solid border-white-100 shadow-lavendar-card"
    >
      <img :src="imageUrl" :alt="altText" width="32" class="rounded-lg" />
    </div>
    <div>
      <p v-if="subText" class="text-secondary mb-0">{{ subText }}</p>
      <p class="fs-6 fw-semibold mb-0">{{ mainText }}</p>
      <p v-if="linkText" class="text-primary text-sm mb-0">{{ linkText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      default: "image",
    },
    subText: {
      type: String,
      default: null,
    },
    mainText: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      default: null,
    },
  },
  computed: {
    imageUrl() {
      return new URL(this.imageSrc, import.meta.url).href;
    },
  },
};
</script>
