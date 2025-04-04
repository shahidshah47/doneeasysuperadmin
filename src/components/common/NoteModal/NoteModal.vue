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

const props = defineProps({
  note: Object, // Expecting a note object
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

const getSurveyImage = (imageName) => {
  return new URL(`../../../assets/image/${imageName}`, import.meta.url).href;
};

onMounted(() => {
  console.log("Note Data:", props.note);
  window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <Modal
    v-if="note"
    :isVisible="isModalVisible"
    @update:isVisible="isModalVisible = $event"
    :modalStyles="modalStyles"
  >
    <div
      class="flex flex-row items-center justify-between bg-light-lilac !rounded-tl-2xl !rounded-tr-2xl px-6 py-2"
    >
      <h2 class="!text-base !font-semibold !text-dm-blue m-0">View Note</h2>
      <button
        @click="emit('close')"
        class="text-dm-blue hover:text-black !text-2xl font-semibold"
        type="button"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="p-6">
      <h2 class="!text-lg !text-vivid-purple font-normal m-0">
        {{ note.title }}
      </h2>

      <p class="!text-dm-blue !text-lg mt-0">
        {{ note.content }}
      </p>

      <div v-if="note.images && note.images.length" class="mt-3 mb-2">
        <div class="flex gap-3 flex-wrap">
          <img
            v-for="(image, index) in note.images"
            :key="index"
            :src="getSurveyImage(image.src)"
            :alt="image.alt || 'Note Image'"
            class="!w-26 !h-26 rounded-[20px] object-cover border-[0.55px] border-solid border-white-100"
          />
        </div>
      </div>

      <div class="flex items-center text-xs text-grayColor mt-3">
        <span>Added by</span>
        <span class="font-semibold text-dm-blue ml-1">{{ note.author }}</span>
        <span class="mx-2">•</span>
        <span>{{ note.timestamp }}</span>
      </div>
    </div>
  </Modal>
</template>
