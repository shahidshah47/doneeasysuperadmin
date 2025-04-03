<template>
  <div class="rounded-xl border-0 bg-white-100 p-4">
    <div class="text-center mb-3 rounded-[10px] overflow-hidden">
      <img :src="getImageUrl(imageName)" :alt="title" class="w-100" />
    </div>
    <p class="fw-bold mb-0">{{ title }}</p>
    <p class="text-secondary mb-0 text-sm">{{ institute }}</p>
    <p class="text-secondary text-sm">
      {{ duration }} | Credential ID {{ credentialId }}
    </p>
    <button class="text-vivid-purple font-bold text-sm !uppercase">
      View Image
    </button>
  </div>
</template>

<script>
export default {
  props: {
    imageName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    institute: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    credentialId: {
      type: String,
      required: true,
    },
  },
  methods: {
    getImageUrl(name) {
      return new URL(`../../../assets/images2/${name}`, import.meta.url).href;
    },
  },
};
</script>

<style scoped></style>
