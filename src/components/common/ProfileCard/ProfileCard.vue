<template>
  <div class="col-md-6 d-flex align-items-center gap-2">
    <div
      class="w-12 h-12 border-2 border-solid border-white-100 shadow-lavendar-card"
    >
      <img
        :src="filePath ?? imageUrl"
        :alt="altText"
        class="rounded-2xl w-full h-full object-cover"
      />
    </div>
    <div>
      <p v-if="subText" class="text-secondary mb-0">{{ subText }}</p>
      <p class="fs-6 fw-semibold mb-0">{{ mainText }}</p>
      <p
        v-if="linkText"
        class="text-primary text-sm mb-0 cursor-pointer"
        @click="handleClick"
      >
        {{ linkText }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCompanyStore } from "../../../store";
import { onMounted, defineProps, computed } from "vue";

const companyStore = useCompanyStore();
const { isDetail } = storeToRefs(companyStore);

const props = defineProps({
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
  filePath: String
});

const emit = defineEmits(["viewDetails"]);

const handleClick = () => {
  emit("viewDetails");
};

const imageUrl = computed(() => {
  return props.imageSrc ? new URL(props.imageSrc, import.meta.url).href : "";
});

onMounted(() => {
  companyStore.resetDetails();
});
</script>
