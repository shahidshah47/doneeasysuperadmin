<template>
  <div class="progress-step flex items-center gap-2">
    <div class="!bg-lavender p-1 !rounded-sm">
      <img :src="imageSrc" :alt="text" class="icon-img" />
    </div>
    <div class="flex flex-col">
      <span
        class="fw-semibold !text-sm"
        :class="isActive ? 'text-dm-blue' : 'text-gray-500'"
        >{{ text }}</span
      >
      <span class="!text-ds-blue !text-xs !font-normal">{{ date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    imageSrc() {
      return new URL(
        `../../../assets/image/icons/${this.icon}`,
        import.meta.url
      ).href;
    },
  },
};
</script>
