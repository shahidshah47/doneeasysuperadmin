<template>
  <div class="space-y-2 cursor-pointer" @click="handleClick">
    <h2 class="!text-base !text-vivid-purple fw-normal m-0">
      {{ title }}
    </h2>

    <p class="!text-dm-blue !text-lg">{{ content }}</p>

    <div class="mt-3 mb-2">
      <div class="flex gap-3 flex-wrap">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="getSurveyImage(image.src)"
          :alt="image.alt"
          class="w-13 h-13 rounded-md object-cover border-[0.55px] border-solid border-white-100"
        />
      </div>
    </div>

    <div class="flex items-center text-xs text-grayColor mt-3">
      <span>Added by</span>
      <span class="!font-semibold !text-dm-blue ml-1">{{ author }}</span>
      <span class="mx-2">•</span>
      <span>{{ timestamp }}</span>
    </div>
    <div class="border-[0.2px] border-solid border-lavender ml-6 mt-4"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: String,
    images: Array,
    author: String,
    timestamp: String,
  },
  methods: {
    getSurveyImage(imageName) {
      return new URL(`../../../assets/image/${imageName}`, import.meta.url)
        .href;
    },
    handleClick() {
      this.$emit("note-clicked", {
        title: this.title,
        content: this.content,
        author: this.author,
        timestamp: this.timestamp,
        images: this.images,
      });
    },
  },
};
</script>
