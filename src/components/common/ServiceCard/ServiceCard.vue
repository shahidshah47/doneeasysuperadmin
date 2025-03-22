<template>
  <div class="bg-white border-0 p-4 rounded rounded-4 shadow-sm">
    <div class="d-flex flex-col justify-content-between position-relative mb-3">
      <div class="mb-2">
        <p class="text-primary -font mb-0">{{ itemTitle }}</p>
        <p class="fs-6 mb-0 pr-7">{{ sessionName }}</p>
      </div>
      <div>
        <p
          class="text-vivid-purple text-sm leading-4 font-normal mb-0 font-theme"
        >
          {{ serviceTitle }}
        </p>
        <p class="text-dm-blue font-sm leading-5 font-normal font-theme mb-0">
          {{ serviceDescription }}
        </p>
      </div>
      <div class="position-absolute end-0 me-2 mt-2 top-0">
        <a :href="editLink" class="text-reset">
          <i class="text-decoration-underline text-primary fa-pen fa-solid"></i>
        </a>
      </div>
    </div>

    <div
      class="d-flex !bg-light-lilac justify-content-between rounded mb-2 p-2 stats-section"
    >
      <InfoDisplay :label="unitPriceLabel" :value="unitPrice" />
      <InfoDisplay :label="quantityLabel" :value="quantity" />
      <InfoDisplay :label="totalLabel" :value="total" />
    </div>

    <div>
      <InfoDisplay :label="deliveryTimeLabel" :value="deliveryTime" />
    </div>
  </div>
</template>

<script>
import InfoDisplay from "../InfoDisplay/InfoDisplay.vue";

export default {
  components: {
    InfoDisplay,
  },
  props: {
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
  },
};
</script>
