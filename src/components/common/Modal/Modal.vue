<template>
  <div
    v-if="isVisible"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-slate-gray backdrop-blur-md z-[9999]"
    @click.self="closeModal"
  >
    <div class="relative" :style="modalStyles">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  modalStyles: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:isVisible"]);

function closeModal() {
  emit("update:isVisible", false);
}
</script>

<style scoped>
/* Customize modal styles if needed */
</style>
