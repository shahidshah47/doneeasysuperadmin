<template>
  <div :class="['card border-0 rounded-3 flex flex-col h-full', $attrs.class]">
    <div class="d-flex card-body">
      <p class="text-primary mb-0 flex flex-row items-center gap-2">
        <i class="fa-location-dot fa-solid"></i>
        <span class="!text-dm-blue font-normal text-base font-theme">
          {{ address }}
        </span>
      </p>
      <p
        class="!text-vivid-purple text-uppercase fw-bold !text-sm mb-0 ms-auto cursor-pointer"
        @click="viewMap"
      >
        {{ buttonText }}
      </p>
    </div>
    <div class="">
      <img
        class="w-full h-full object-cover rounded-b-3"
        :src="imageUrl"
        :alt="altText"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      default: "775 Rolling Green Rd.",
    },
    imageSrc: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      default: "map",
    },
    buttonText: {
      type: String,
      default: "View Map",
    },
  },
  computed: {
    imageUrl() {
      return new URL(this.imageSrc, import.meta.url).href;
    },
  },
  methods: {
    viewMap() {
      console.log("Viewing map for:", this.address);
    },
  },
};
</script>
