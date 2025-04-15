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
              :src="
                cardData?.image_path ?? getImagePath('electronics-icon.png')
              "
              alt="Category Icon"
              width="40"
              class="object-cover"
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
              {{ cardData.name }}
            </h5>
          </div>
        </div>

        <div
          class="stats-section d-flex justify-content-between bg-light-lilac rounded py-3 px-4 mb-3"
        >
          <div class="text-center">
            <p class="text-primary mb-0">
              AED
              <span class="fs-4 fw-bold">
                {{
                  " " +
                  formatWithCommas(
                    Math.round(cardData.revenue ?? 0) < 10
                      ? "0" + Math.round(cardData.revenue ?? 0)
                      : Math.round(cardData.revenue ?? 0)
                  )
                }}
              </span>
            </p>
            <p class="text-dm-blue mb-0 small">Total Revenue</p>
          </div>
          <div class="text-center">
            <p class="text-primary mb-0 fs-4 fw-bold">
              {{
                " " +
                (Math.round(cardData.active_orders_count ?? 0) < 10
                  ? "0" + Math.round(cardData.active_orders_count ?? 0)
                  : Math.round(cardData.active_orders_count ?? 0))
              }}
            </p>
            <p class="text-dm-blue mb-0 small">Active Orders</p>
          </div>
          <div class="text-center">
            <p class="text-primary mb-0 fs-4 fw-bold">
              {{
                " " +
                (Math.round(cardData.offer_submitted ?? 0) < 10
                  ? "0" + Math.round(cardData.offer_submitted ?? 0)
                  : Math.round(cardData.offer_submitted ?? 0))
              }}
            </p>
            <p class="text-dm-blue mb-0 small">Offers submitted</p>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <div class="flex items-center gap-4">
          <img
            :src="
              cardData?.users[0]?.profile_picture?.file_path ||
              getImagePath('profile-pic.png')
            "
            class="w-11 h-11 rounded border border-solid border-white-100 object-cover"
            width="45"
            alt="Manager Profile"
          />
          <div>
            <h6 class="mb-0 fw-bold">{{ cardData?.users[0]?.name || "" }}</h6>
            <p class="text-vivid-purple mb-0 small">
              {{ cardData?.users[0]?.designation || "Assign Manager" }}
            </p>
          </div>
        </div>
        <!-- <div class="text-end">
          <button
            class="text-vivid-purple text-sm uppercase font-bold"
            @click="handleClickToOpen(cardData?.users[0]?.id)"
            data-bs-toggle="modal"
            data-bs-target="#changeManagerModal"
          >
            CHANGE
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatWithCommas } from "../../../utils/helper";

const props = defineProps({
  cardData: Object,
  onClick: Function,
});

const emit = defineEmits(["onClick"]);
const handleClickToOpen = (id) => {
  emit("onClick", id);
};

const getImagePath = (imageName) => {
  return new URL(`../../../assets/images2/${imageName}`, import.meta.url).href;
};
</script>
