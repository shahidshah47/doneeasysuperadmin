<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  onMounted,
  onBeforeUnmount,
  computed,
} from "vue";
import Modal from "../Modal/Modal.vue";
import { formatDate, formatTime } from "../../../utils/helper";

const props = defineProps({
  note: Object,
});

const emit = defineEmits(["close"]);

const screenWidth = ref(window.innerWidth);
const screenHeight = ref(window.innerHeight);

const updateScreenSize = () => {
  screenWidth.value = window.innerWidth;
  screenHeight.value = window.innerHeight;
};

// Dynamically compute modal styles
const modalStyles = computed(() => ({
  width: screenWidth.value < 768 ? "90vw" : "45vw",
  height: screenHeight.value < 600 ? "80vh" : "auto",
  maxHeight: "90vh",
}));

onMounted(() => {
  console.log("Note Data:", props.note);
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <Modal
    :isVisible="!!note"
    @update:isVisible="handleClose"
    :modalStyles="modalStyles"
  >
    <template v-if="note">
      <div
        class="flex flex-row items-center justify-between bg-light-lilac !rounded-tl-2xl !rounded-tr-2xl px-6 py-2"
      >
        <h2 class="!text-base !font-semibold !text-dm-blue m-0">View Note</h2>
        <button
          @click="handleClose"
          class="text-dm-blue hover:text-black !text-2xl font-semibold"
          type="button"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div
        class="flex flex-col gap-4 !bg-white-100 rounded-bl-2xl rounded-br-2xl px-6 py-3 shadow-soft-blue"
      >
        <h2 class="!text-lg !text-vivid-purple font-normal m-0">
          {{ note.title || "Untitled Note" }}
        </h2>

        <p class="!text-dm-blue !text-lg mt-0 mb-0">
          {{ note.description || "No description provided" }}
        </p>

        <div v-if="note.media && note.media.length" class="mt-3 mb-2">
          <div class="flex gap-3 flex-wrap">
            <img
              v-for="(mediaItem, index) in note.media"
              :key="index"
              :src="mediaItem?.file_path"
              :alt="mediaItem.name || 'Note Image'"
              class="!w-26 !h-26 rounded-[20px] object-cover border-[0.55px] border-solid border-white-100"
            />
          </div>
        </div>

        <div class="flex items-center text-xs text-grayColor mt-3">
          <span>Added by</span>
          <span class="font-semibold text-dm-blue ml-1">Harris</span>
          <span class="mx-2">•</span>
          <span
            >{{ formatDate(note.created_at) }} at
            {{ formatTime(note.created_at) }}</span
          >
        </div>
      </div>
    </template>
  </Modal>
</template>
