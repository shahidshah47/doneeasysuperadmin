<template>
  <div class="grid grid-cols-12 gap-4 mt-5 mb-4">
    <div class="col-span-3">
      <div
        class="bg-white-100 rounded-2xl flex flex-col justify-between h-full py-4"
      >
        <div class="d-flex flex-column align-items-center">
          <div
            class="d-flex justify-content-center align-items-center text-white fw-bold"
            style="font-size: 10px"
          >
            <span class="plan-label text-xs text-white-100 font-semibold"
              >Yearly Plan</span
            >
          </div>
          <div
            class="mt-3 d-flex flex-column justify-content-center align-items-center text-center"
          >
            <div
              class="d-flex flex-column justify-content-center align-items-center"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4b5cd94a5ada2edf38a6428c3e725c80981d732a20068193e70a604cb679d0f?placeholderIfAbsent=true&apiKey=8b21d8e85c2c46cba1ed62101821a18e"
                class="plan-image"
                alt="Event Management Plan Icon"
              />
              <p class="my-3 text-grayish-purple font-normal">ID OFC 903823</p>
              <h4 class="mb-2 text-[22px] !font-semibold text-dm-blue">
                Event Management
              </h4>
            </div>
            <p class="plan-date mb-2">Created At: 2020-05-17 | 10:00 AM</p>
            <div class="manager-section">
              <p class="mb-2 text-sm font-normal text-dark-indigo-100">
                Manager
              </p>
              <div class="manager-info">
                <div class="manager-details">
                  <div class="manager-profile">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb193e848a7fcfc1aa143b87967dd23bec93f9c06a485de3451026a67814abaa?placeholderIfAbsent=true&apiKey=8b21d8e85c2c46cba1ed62101821a18e"
                      class="manager-avatar"
                      alt="Floyd Miles profile picture"
                    />
                    <span class="manager-name text-xs font-semibold"
                      >Floyd Miles</span
                    >
                  </div>
                </div>
                <a
                  href="#"
                  class="!text-vivid-purple font-bold text-xs text-decoration-none text-uppercase"
                  >Change</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-2">
      <div class="flex flex-col gap-3 h-full">
        <VerticalStats title="Appointment" :number="9090" linkText="View All" />
        <VerticalStats title="Offers" :number="9090" linkText="View All" />
      </div>
    </div>

    <div class="col-span-2">
      <div class="flex flex-col gap-3 h-full">
        <VerticalStats title="Completed" :number="9090" linkText="View All" />
        <VerticalStats title="Cancelled" :number="9090" linkText="View All" />
      </div>
    </div>

    <div class="col-span-5">
      <div class="h-full">
        <img
          src="../../../assets/images2/emp_graph.png"
          alt="graph"
          class="w-full h-full"
        />
      </div>
    </div>
  </div>

  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-6">
      <div class="bg-white rounded-3 p-4 h-100">
        <h5 class="!font-semibold text-base">Information</h5>
        <p class="text-primary mb-0 small-font">Description</p>
        <p class="text-xs font-normal text-dm-blue">
          At ABS Company, we craft unforgettable experiences tailored to your
          dreams. With over a decade of curating celebrations and flawless
          executions, our team ensures your moments shine brighter. Let our
          passion for perfection turn your event into a cherished memory.
        </p>
        <h5 class="!font-semibold text-base mb-4">Portfolios</h5>
        <img
          src="../../../assets/images2/portfolios.png"
          alt="portfolios"
          class="w-full"
        />
      </div>
    </div>

    <div class="col-span-6">
      <div class="bg-white rounded-3 p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="!font-semibold text-base">Customer Reviews</h5>
          <div class="d-flex gap-2">
            <div
              class="d-flex align-items-center text-center position-relative"
            >
              <input
                v-model="searchQuery"
                type="text"
                class="form-control border-0 py-2 px-3"
                style="background-color: #f2f4fb"
                placeholder="Search"
              />
              <img
                :src="searchIcon"
                alt="Search"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
              />
            </div>
            <button
              class="flex flex-row items-center border-0 gap-3 text-ds-blue text-sm leading-5 font-semibold"
            >
              Filters by
              <img :src="filterIcon" alt="Filter Icon" class="icon" />
            </button>
          </div>
        </div>
        <div
          class="overflow-y-auto max-h-[400px] space-y-4 pr-2 vivid-gradient-scrollbar"
        >
          <div
            v-for="(testimonial, index) in filteredTestimonials"
            :key="index"
            class="testimonial-card mb-3 border border-solid !border-light-lilac p-3 rounded-xl"
          >
            <TestimonialCard
              :service-icon="testimonial.serviceIcon"
              :service-title="testimonial.serviceTitle"
              :service-date="testimonial.serviceDate"
              :rating="testimonial.rating"
              :testimonial-text="testimonial.testimonialText"
              :client-avatar="testimonial.clientAvatar"
              :client-name="testimonial.clientName"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import VerticalStats from "../../../components/common/VerticalStats/VerticalStats.vue";
import TestimonialCard from "../../../components/common/TestimonialCard/TestimonialCard.vue";
import searchIcon from "../../../assets/image/icons/search.svg";
import filterIcon from "../../../assets/image/icons/candle.svg";

const searchQuery = ref("");

const testimonials = ref([
  {
    serviceIcon:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/66f4f7ad2a335555725f5018a220efddc1804ee02fd969249f19ecdf96bc2d81",
    serviceTitle: "Wash and Fold - Residential",
    serviceDate: "2023-11-19",
    rating: 4,
    testimonialText:
      "John is fantastic! He always delivers clean and fresh laundry with impressive efficiency. His attention to detail is remarkable, and he's a pleasure to work with. Highly recommended!",
    clientAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3235fe7f6e44e4bd4d77f87b39a0930574bdaffb9bf11e55a94dfa9be1c3f090",
    clientName: "Sarah Johnson",
  },
  {
    serviceIcon:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/66f4f7ad2a335555725f5018a220efddc1804ee02fd969249f19ecdf96bc2d81",
    serviceTitle: "Dry Cleaning - Commercial",
    serviceDate: "2023-10-01",
    rating: 5,
    testimonialText:
      "Excellent commercial service. Always on time and spotless results.",
    clientAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3235fe7f6e44e4bd4d77f87b39a0930574bdaffb9bf11e55a94dfa9be1c3f090",
    clientName: "Michael Lee",
  },
]);

const filteredTestimonials = computed(() => {
  return testimonials.value.filter((item) =>
    item.serviceTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.plan-label {
  border-radius: 4px;
  background: linear-gradient(
    98deg,
    #38e0b2 -18.55%,
    #442ae8 28.45%,
    #5925eb 64.63%,
    #9e21ee 116.94%
  );
  align-self: stretch;
  margin: auto 0;
  padding: 4px 8px;
}

.plan-image {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 88px;
  box-shadow: 0 3px 24px 0 rgba(196, 195, 247, 0.15);
}

.plan-date {
  align-self: stretch;
  border-radius: 4px;
  background: #e7e7eb;
  margin-top: 10px;
  font-size: 12px;
  color: #3e3d5d;
  font-weight: 400;
  line-height: 1.2;
  padding: 4px 8px;
}

.manager-section {
  align-self: stretch;
  display: flex;
  margin-top: 16px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
}

.manager-info {
  display: flex;
  margin-top: 4px;
  width: 100%;
  align-items: center;
  gap: 16px;
  justify-content: center;
}

.manager-details {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 12px;
  color: #0e0d35;
  font-weight: 600;
  line-height: 1.2;
  justify-content: center;
  margin: auto 0;
  padding: 4px 0;
}

.manager-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-start;
}

.manager-avatar {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  border-radius: 4px;
  align-self: stretch;
  margin: auto 0;
}

.manager-name {
  align-self: stretch;
  margin: auto 0;
}
</style>
