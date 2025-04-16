<template>
  <div class="row">
    <div class="col-7 px-0 d-flex gap-0 cursor-pointer" @click="handleClick">
      <div
        class="w-8 h-8 mr-2 shadow-lavendar-card border-2 border-solid border-white-100 overflow-hidden rounded-lg"
      >
        <img :src="imageSrc" :alt="altText" class="w-full h-full" />
      </div>
      <div>
        <p class="fw-bold mb-0 text-base">{{ jobTitle }}</p>
        <p class="text-secondary mb-0 font-xs">
          {{ company }} - {{ employmentType }}
        </p>
        <div class="flex items-center text-secondary mb-0 font-xs gap-2">
          <p class="mb-0">{{ duration }}</p>
          <p class="text-[8px] mb-0">●</p>
          <p class="mb-0">
            {{ experience }}
          </p>
        </div>
        <p class="text-secondary mb-0 font-xs">{{ location }}</p>
      </div>
    </div>
    <div class="col-5 px-0">
      <p class="text-primary mb-0 text-sm">Role & Responsibilities</p>
      <ul
        class="mb-0 font-xs cursor-pointer custom-dot-list !pl-2"
        data-bs-toggle="modal"
        data-bs-target="#experienceModal"
      >
        <li v-for="(responsibility, index) in responsibilities" :key="index">
          {{ responsibility }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits();

const props = defineProps({
  imageSrc: String, // Only filename, e.g., "emp_detail_1.png"
  altText: String,
  jobTitle: String,
  company: String,
  employmentType: String,
  duration: String,
  experience: String,
  location: String,
  responsibilities: Array,
});

// Resolving the image path assuming images are inside /assets/images2/
const resolvedImageSrc = computed(
  () =>
    new URL(`../../../assets/images2/${props.imageSrc}`, import.meta.url).href
);

const handleClick = () => {
  emit("click");
};
</script>

<style scoped>
.font-xs {
  font-size: 12px;
}
.cursor-pointer {
  cursor: pointer;
}

.custom-dot-list li {
  list-style: none;
  position: relative;
  padding-left: 10px;
}

.custom-dot-list li::before {
  content: "●";
  color: #0e0d35;
  font-size: 6px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
