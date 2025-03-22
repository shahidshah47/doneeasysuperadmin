<template>
  <div class="card border-0 rounded-3 flex-grow">
    <div class="card-body">
      <p class="!text-vivid-purple text-base font-normal font-theme mb-1">
        {{ title }}
      </p>
      <p class="clamped-text mb-0" :style="{ '-webkit-line-clamp': lineClamp }">
        {{ content }}
        <a
          role="button"
          class="!text-vivid-purple font-semibold text-sm font-theme appearance-none !no-underline hover:underline cursor-pointer"
          @click="handleClick"
        >
          {{ linkText }}
        </a>
      </p>
    </div>
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
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: { type: String, required: true },
    content: { type: String, required: true },
    linkText: { type: String, required: true },
    lineClamp: { type: Number, default: 2 },
  },
});
</script>

<style scoped>
.clamped-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
