<template>
  <div
    @click="onClick"
    class="text-decoration-none text-reset cursor-pointer h-full"
  >
    <div
      class="rounded-4 border-0 p-4 rounded shadow-sm bg-white-100 flex flex-col justify-between h-full"
    >
      <div>
        <div class="flex gap-4 items-center mb-3">
          <div class="icon">
            <img
              :src="getImagePath(cardData.icon)"
              alt="Category Icon"
              width="40"
            />
          </div>
          <div class="flex flex-col gap-2 items-start">
            <div
              v-if="cardData.planType"
              class="bg-mix-gradient px-2 py-1 inline-block rounded"
            >
              <p class="font-semibold text-xs text-white-100 m-0">
                {{ cardData.planType }}
              </p>
            </div>
            <h5 class="mb-0 text-base !font-semibold text-dm-blue">
              {{ cardData.title }}
            </h5>
          </div>
        </div>

        <div
          class="stats-section d-flex justify-content-between bg-light rounded py-3 px-4 mb-3"
        >
          <div class="text-center">
            <p class="text-primary mb-0">
              AED <span class="fs-4 fw-bold">{{ cardData.totalRevenue }}</span>
            </p>
            <p class="text-dm-blue mb-0 small">Total Revenue</p>
          </div>
          <div class="text-center">
            <p class="text-primary mb-0 fs-4 fw-bold">
              {{ cardData.activeOrders }}
            </p>
            <p class="text-dm-blue mb-0 small">Active Orders</p>
          </div>
          <div class="text-center">
            <p class="text-primary mb-0 fs-4 fw-bold">
              {{ cardData.offersSubmitted }}
            </p>
            <p class="text-dm-blue mb-0 small">Offers submitted</p>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <div class="flex items-center gap-4">
          <img
            :src="getImagePath(cardData.managerImage)"
            class="w-11 h-11 rounded border border-solid border-white-100"
            width="45"
            alt="Manager Profile"
          />
          <div>
            <h6 class="mb-0 fw-bold">{{ cardData.managerName }}</h6>
            <p class="text-vivid-purple mb-0 small">Assign Manager</p>
          </div>
        </div>
        <div class="text-end">
          <button
            class="text-vivid-purple text-sm uppercase font-bold"
            @click.stop
            data-bs-toggle="modal"
            data-bs-target="#changeManagerModal"
          >
            CHANGE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cardData: Object,
  onClick: Function,
});

const getImagePath = (imageName) => {
  return new URL(`../../../assets/images2/${imageName}`, import.meta.url).href;
};
</script>
