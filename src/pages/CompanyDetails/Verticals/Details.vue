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
                :src="verticalDetails?.image_path"
                class="plan-image"
                alt="Event Management Plan Icon"
              />
              <p class="my-3 text-grayish-purple font-normal">
                ID OFC {{ verticalDetails?.id }}
              </p>
              <h4 class="mb-2 text-[22px] !font-semibold text-dm-blue">
                {{ verticalDetails?.name }}
              </h4>
            </div>
            <p class="plan-date mb-2">
              Created At:
              {{
                new Date(verticalDetails?.created_at)
                  .toLocaleDateString("en-GB")
                  .replace("/", "-")
                  .replace("/", "-") +
                " | " +
                new Date(verticalDetails?.created_at).toLocaleTimeString(
                  "en-US",
                  { hour: "2-digit", minute: "2-digit", hour12: true }
                )
              }}
            </p>

            <div class="manager-section">
              <p class="mb-2 text-sm font-normal text-dark-indigo-100">
                Manager
              </p>
              <div class="manager-info">
                <div class="manager-details">
                  <div class="manager-profile">
                    <img
                      loading="lazy"
                      :src="
                        verticalDetails?.users[0]?.profile_picture?.file_path
                      "
                      class="manager-avatar"
                      alt="Floyd Miles profile picture"
                    />
                    <span class="manager-name text-xs font-semibold">
                      {{ verticalDetails?.users[0]?.name }}</span
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
        <VerticalStats
          title="Appointment"
          :number="verticalDetails?.appointments || 0"
          linkText="View All"
        />
        <VerticalStats
          title="Completed"
          :number="verticalDetails?.offer_count || 0"
          linkText="View All"
        />
      </div>
    </div>

    <div class="col-span-2">
      <div class="flex flex-col gap-3 h-full">
        <VerticalStats
          title="Offers"
          :number="verticalDetails?.offer_count || 0"
          linkText="View All"
        />
        <VerticalStats
          title="Cancelled"
          :number="verticalDetails?.offer_rejected_count || 0"
          linkText="View All"
        />
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
        <h5 class="font-semibold text-base">Information</h5>
        <p class="text-primary mb-0 text-sm">Description</p>
        <p class="text-sm text-dm-blue">
          {{ verticalDetails?.portfolio?.company_desc }}
        </p>
        <h5 class="font-semibold text-base mb-4">Portfolios</h5>

        <!-- Carousel -->
        <div class="relative">
          <div
            class="flex transition-transform duration-500"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="mediaItem in verticalDetails?.portfolio?.media"
              :key="mediaItem.id"
              class="w-full flex-shrink-0 max-h-44 object-contain"
            >
              <img
                :src="mediaItem.file_path"
                alt="Portfolio Image"
                class="w-full h-44 object-contain"
              />
            </div>
          </div>

          <!-- Carousel Dots -->
          <div
            class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2"
          >
            <button
              v-for="(mediaItem, index) in verticalDetails?.portfolio?.media"
              :key="'dot-' + mediaItem.id"
              class="bg-lavender w-1.5 h-1.5 !rounded-full"
              :class="{
                'bg-vivid-purple w-2 h-2': currentIndex === index,
              }"
              @click="goToSlide(index)"
            ></button>
          </div>
        </div>
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
            v-for="(review, index) in filteredTestimonials"
            :key="index"
            class="testimonial-card mb-3 border border-solid !border-light-lilac p-3 rounded-xl"
          >
            <TestimonialCard
              :service-icon="verticalDetails?.image_path"
              :service-title="verticalDetails?.name"
              :service-date="review.created_at || 'No Date Available'"
              :rating="review.avg_rating || 0"
              :testimonial-text="
                review.review_text || 'No Review Text Available'
              "
              :client-avatar="
                review.reviewed_by.profile_picture.file_path ||
                'default-avatar.png'
              "
              :client-name="review.reviewed_by.name || 'Anonymous Client'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, toRaw, onBeforeUnmount } from "vue";
import VerticalStats from "../../../components/common/VerticalStats/VerticalStats.vue";
import TestimonialCard from "../../../components/common/TestimonialCard/TestimonialCard.vue";
import searchIcon from "../../../assets/image/icons/search.svg";
import filterIcon from "../../../assets/image/icons/candle.svg";
import { useToast } from "primevue";
import { useRoute } from "vue-router";
import api from "../../../api";

const searchQuery = ref("");
const route = useRoute();
const verticalDetails = ref(null);

const loading = ref(true);
const error = ref(null);
const toast = useToast();

const filteredTestimonials = computed(() => {
  const result =
    verticalDetails.value?.reviews?.filter((item) =>
      item.order_id.toString().includes(searchQuery.value.toLowerCase())
    ) || [];
  console.log(result); // Check if the filtered data is correct
  return result;
});

const fetchVerticalDetailsById = async (id) => {
  try {
    const response = await api.get("/superadmin/user/vertical/details/" + id);

    if (response.status === 200) {
      const { data, message } = response?.data;
      verticalDetails.value = data;

      toast.add({
        severity: "success",
        summary: "Success",
        detail: message,
        life: 3000,
      });
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  window.scroll(0, 0);
  fetchVerticalDetailsById(route.params.verticalId);
});

const currentIndex = ref(0);
let interval = null;

onMounted(() => {
  startAutoplay();
});

onBeforeUnmount(() => {
  clearInterval(interval);
});

const startAutoplay = () => {
  interval = setInterval(() => {
    nextSlide();
  }, 3000); // Change slide every 3 seconds
};

const nextSlide = () => {
  currentIndex.value =
    (currentIndex.value + 1) % verticalDetails.value.portfolio.media.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};
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
