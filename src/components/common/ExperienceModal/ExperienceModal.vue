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
          Experiences
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
        <div class="flex flex-row justify-center">
          <div class="w-44 h-44 overflow-hidden !shadow-lavendar-card">
            <img
              :src="modalData.logoUrl"
              class="w-full h-full object-contain"
              alt="Company Logo"
            />
          </div>
        </div>
        <div class="row">
          <div
            class="col-6"
            v-for="(value, label) in modalData.details"
            :key="label"
          >
            <p class="text-vivid-purple text-sm mb-0">{{ label }}</p>
            <p class="!font-semibold">{{ value }}</p>
          </div>
        </div>
        <p class="text-vivid-purple mb-0 text-sm">Role & Responsibilities</p>
        <ul class="text-sm cursor-pointer custom-dot-list !pl-2">
          <li
            v-for="(responsibility, index) in modalData.responsibilities"
            :key="index"
          >
            {{ responsibility }}
          </li>
        </ul>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useEmployeeStore } from "../../../store";
import Modal from "../Modal/Modal.vue";

const modalStore = useEmployeeStore();
const screenWidth = ref(window.innerWidth);
const screenHeight = ref(window.innerHeight);

const isVisible = computed(() => modalStore.isVisible);
const modalData = computed(() => modalStore.modalData);

const closeModal = () => {
  modalStore.closeModal();
};

const modalStyles = computed(() => ({
  width: screenWidth.value < 768 ? "90vw" : "38vw",
  height: screenHeight.value < 600 ? "80vh" : "auto",
  maxHeight: "90vh",
}));

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
