<template>
  <div>
    <p class="text-vivid-purple text-sm leading-4 font-normal mb-1 font-theme">
      {{ title }}
    </p>
    <p class="text-dm-blue font-sm leading-5 font-normal font-theme m-0">
      {{ description }}
      <a
        v-if="readMoreLink"
        @click="handleClick"
        class="!text-vivid-purple font-bold text-sm font-theme appearance-none !no-underline hover:underline cursor-pointer"
      >
        {{ readMoreText }}
      </a>
    </p>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCompanyStore } from "../../../store";

const companyStore = useCompanyStore();
const { isDetail } = storeToRefs(companyStore);

const handleClick = () => {
  companyStore.toggleDetail();
};
</script>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    readMoreText: {
      type: String,
      default: "read more",
    },
    readMoreLink: {
      type: String,
      default: null,
    },
  },
};
</script>
