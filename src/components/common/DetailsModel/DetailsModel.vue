<template>
  <div
    v-if="isVisible"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-slate-gray backdrop-blur-md z-50"
  >
    <div class="relative overflow-y-auto" :style="modalStyles">
      <div
        class="flex flex-row items-center justify-between !bg-light-lilac rounded-tl-2xl rounded-tr-2xl px-6 py-2"
      >
        <h2 class="!text-[20px] !font-semibold text-dm-blue m-0">
          More details
        </h2>
        <button
          @click="closeModal"
          class="text-dm-blue hover:text-black !text-2xl font-semibold"
          type="button"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div
        class="flex flex-col !bg-white-100 rounded-bl-2xl rounded-br-2xl px-6 py-3 shadow-soft-blue"
      >
        <p v-html="description" class="!text-dark-indigo-100 !text-base"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  defineProps,
  nextTick,
} from "vue";

const isVisible = ref(true);
const screenWidth = ref(window.innerWidth);
const screenHeight = ref(window.innerHeight);

const props = defineProps({
  title: String,
  description: String,
});

const modalStyles = computed(() => ({
  width: screenWidth.value < 768 ? "90vw" : "70vw",
  height: screenHeight.value < 600 ? "80vh" : "auto",
  maxHeight: "90vh",
}));

const closeModal = async () => {
  isVisible.value = false;

  // Wait for Vue to update DOM, then remove overflow-hidden
  await nextTick();
  document.body.classList.remove("overflow-hidden");
};

const updateScreenSize = () => {
  screenWidth.value = window.innerWidth;
  screenHeight.value = window.innerHeight;
};

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);

  // Add `overflow-hidden` when modal appears
  document.body.classList.add("overflow-hidden");
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);

  // Remove `overflow-hidden` to ensure it's not left behind
  document.body.classList.remove("overflow-hidden");
});
</script>
