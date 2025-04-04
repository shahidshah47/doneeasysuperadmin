<template>
  <Modal
    :isVisible="isVisible"
    :modalStyles="modalStyles"
    @update:isVisible="closeModal"
  >
    <div class="modal-content rounded-2xl overflow-x-hidden">
      <div
        class="flex flex-row items-center justify-between !bg-light-lilac rounded-tl-2xl rounded-tr-2xl px-6 py-2"
      >
        <h2 class="!text-[20px] !font-semibold text-dm-blue m-0">
          {{ title }}
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
  </Modal>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, defineProps, defineEmits } from "vue";
import Modal from "../Modal/Modal.vue";

const isVisible = ref(true);
const screenWidth = ref(window.innerWidth);
const screenHeight = ref(window.innerHeight);

const props = defineProps({
  title: String,
  description: String,
});

const emit = defineEmits(['close']);

const modalStyles = computed(() => ({
  width: screenWidth.value < 768 ? "90vw" : "70vw",
  height: screenHeight.value < 600 ? "80vh" : "auto",
  maxHeight: "90vh",
}));

const closeModal = () => {
  isVisible.value = false;
  emit('close');
};

const updateScreenSize = () => {
  screenWidth.value = window.innerWidth;
  screenHeight.value = window.innerHeight;
};

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<style scoped>
/* You can add any additional styles for the modal here */
</style>
