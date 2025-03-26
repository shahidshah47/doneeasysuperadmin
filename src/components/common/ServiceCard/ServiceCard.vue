<template>
  <div class="bg-white border-0 p-3 rounded rounded-4 shadow-sm">
    <div class="flex flex-col justify-between gap-3 relative">
      <InfoDisplay v-if="sessionName" :label="itemTitle" :value="sessionName" textClass="!font-normal" />
      <div
        class="absolute right-0 me-2 top-0"
        @click="clickHandler"
      >
        <a :href="editLink" class="text-reset">
          <!-- <i class="text-decoration-underline text-primary text-xs fa-pen fa-solid"></i> -->
          <img :src="imageUrl" alt="Edit Icon" class="icon-size" />
        </a>
      </div>
      <InfoDisplay v-if="serviceDescription" :label="serviceTitle" :value="serviceDescription" textClass="!font-normal" />
      <div
        class="d-flex !bg-light-lilac justify-content-between rounded p-2 stats-section"
      >
        <InfoDisplay :label="unitPriceLabel" :value="unitPrice" />
        <InfoDisplay :label="quantityLabel" :value="quantity" />
        <InfoDisplay :label="totalLabel" :value="total" />
      </div>
  
      <InfoDisplay :label="deliveryTimeLabel" :value="deliveryTime" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import InfoDisplay from "../InfoDisplay/InfoDisplay.vue";

const props = defineProps({
  itemTitle: String,
  sessionName: String,
  serviceTitle: String,
  serviceDescription: String,
  editLink: String,
  unitPriceLabel: String,
  unitPrice: String,
  quantityLabel: String,
  quantity: String,
  totalLabel: String,
  total: String,
  deliveryTimeLabel: String,
  deliveryTime: String,
  clickHandler: Function,
});

const imageUrl = new URL("../../../assets/image/icons/edit-2.svg", import.meta.url ).href
</script>
