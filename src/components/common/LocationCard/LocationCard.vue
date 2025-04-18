<template>
  <div :class="['card border-0 rounded-3 flex flex-col h-full', $attrs.class]">
    <div class="flex card-body flex-col gap-2">
      <div class="flex justify-between items-center">
        <p class="text-primary mb-0 flex flex-row items-center gap-2">
          <i class="fa-location-dot fa-solid"></i>
          <span class="!text-dm-blue font-normal text-sm font-theme">
            {{ address }}
          </span>
        </p>
        <p
          class="!text-vivid-purple uppercase whitespace-nowrap !font-bold !text-xs mb-0 ms-auto cursor-pointer"
          @click="viewMap"
        >
          {{ buttonText }}
        </p>
      </div>
      <div v-if="!location" class="h-full">
        <img
          class="w-full h-full object-cover rounded-b-3"
          :src="imageUrl"
          :alt="altText"
        />
      </div>
      <div v-if="props.location" class="h-full">
        <GoogleMapComponent
          :mapCustomStyles="true"
          :height="180"
          :location="props.location"
          :iconUrl="'/location-marker.svg'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import GoogleMapComponent from "../GoogleMapComponent.vue";

const props = defineProps({
  address: {
    type: String,
    default: "--",
  },
  imageSrc: {
    type: String,
    required: false,
  },
  altText: {
    type: String,
    default: "map",
  },
  buttonText: {
    type: String,
    default: "View Map",
  },
  location: {
    type: Object,
  },
});

const imageUrl = computed(() => new URL(props.imageSrc, import.meta.url).href);

const viewMap = () => {
  console.log("Viewing map for:", props.address);
};
</script>
