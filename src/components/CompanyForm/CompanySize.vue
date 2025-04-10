<template>
  <div
    @click="handleClick"
    :class="[
      activeClass,
      'rounded-[16px] h-fit border-solid cursor-pointer w-full',
    ]"
  >
    <div class="flex flex-col bg-white py-[10px] px-4 rounded-[16px] w-full">
      <p
        v-if="heading_position !== undefined"
        class="text-left font-semibold text-dm-blue leading-[19px]"
      >
        {{ heading }}
      </p>
      <div class="flex w-[100%] items-center justify-center">
        <img
          :src="getImagePath('DoneEasy_CompanySize.webp')"
          alt="Image"
          :width="image_width"
          :height="image_height"
          class="w-14 h-auto"
        />
      </div>
      <p
        v-if="heading_position === undefined"
        class="text-center mb-0 text-base font-semibold"
      >
        {{ heading }}
      </p>
      <p v-if="description" class="mb-0">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, watch } from "vue";

const props = defineProps({
  heading: String,
  description: String,
  heading_position: [String, Number],
  image_width: Number,
  image_height: Number,
  isSelected: Boolean, // ✅ Ensure this prop is reactive
});

const emit = defineEmits(["handleSelect"]);

// Emit selected heading when clicked
const handleClick = () => {
  emit("handleSelect", props.heading);
};

const activeClass = computed(() =>
  props.isSelected ? "company_size_card" : "border-lavender-gray border-2"
);

const getImagePath = (imageName) => {
  return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};
</script>
