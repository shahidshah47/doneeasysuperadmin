<template>
  <div class="testimonial-content">
    <div class="testimonial-header">
      <img
        :src="serviceIcon"
        :alt="serviceTitle + ' Icon'"
        class="service-icon"
      />
      <div class="service-details">
        <div class="service-info">
          <h2 class="service-title mb-0">{{ serviceTitle }}</h2>
          <time class="service-date" :datetime="serviceDate">{{
            formattedDate
          }}</time>
        </div>
        <div class="rating">
          <StarRating :rating="parseFloat(rating)" :width="10" :height="10" />
        </div>
      </div>
    </div>
    <p class="testimonial-text">{{ testimonialText }}</p>
    <div class="client-info">
      <div
        class="shadow-lavendar-card border-2 border-solid border-white-100 w-9 h-9 overflow-hidden rounded-lg"
      >
        <img
          :src="clientAvatar"
          :alt="clientName"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="client-details">
        <span class="client-label">Client</span>
        <span class="client-name">{{ clientName }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import StarRating from "../../common/StarRating/StarRating.vue";

const props = defineProps({
  serviceIcon: String,
  serviceTitle: String,
  serviceDate: String,
  rating: String,
  testimonialText: String,
  clientAvatar: String,
  clientName: String,
});

const formattedDate = computed(() => {
  const date = new Date(props.serviceDate);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
});
</script>

<style scoped>
.testimonial-card {
  border-radius: 12px;
  border: 1px solid var(--Bg, #f2f4fb);
  display: flex;
  margin-top: 24px;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  padding: 12px 16px;
}

.testimonial-content {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: start;
}

.testimonial-header {
  display: flex;
  width: 100%;
  align-items: start;
  gap: 16px;
  justify-content: start;
  flex-wrap: wrap;
}

.service-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 56px;
}

.service-details {
  display: flex;
  min-width: 240px;
  flex-direction: column;
  justify-content: start;
  flex: 1;
  flex-basis: 0%;
}

.service-info {
  display: flex;
  width: 100%;
  flex-direction: column;
  font-family: Averta, sans-serif;
  line-height: 1.2;
  justify-content: start;
}

.service-title {
  color: var(--Neutrals-Neutral_100, #0e0d35);
  font-size: 14px;
  font-weight: 600;
}

.service-date {
  color: var(--Primary-Purple, #5825eb);
  font-size: 12px;
  font-weight: 400;
  margin-top: 4px;
}

.rating {
  align-self: start;
  display: flex;
  margin-top: 8px;
  align-items: start;
  gap: 3px;
  justify-content: start;
}

.star-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 12px;
}

.testimonial-text {
  color: var(--Neutrals-Neutral_50, #868599);
  margin-top: 16px;
  font: 400 12px/18px Averta, sans-serif;
}

.client-info {
  align-self: start;
  display: flex;
  margin-top: 16px;
  align-items: center;
  gap: 8px;
  font-family: Averta, sans-serif;
  line-height: 1.2;
  justify-content: start;
}

.client-avatar {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
}

.client-details {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.client-label {
  color: var(--Neutrals-Neutral_50, #868599);
  font-size: 10px;
  font-weight: 400;
}

.client-name {
  color: var(--Neutrals-Neutral_100, #0e0d35);
  font-size: 14px;
  font-weight: 600;
}

@media (max-width: 991px) {
  .testimonial-card,
  .testimonial-content,
  .testimonial-header,
  .service-details,
  .service-info,
  .service-title,
  .service-date,
  .testimonial-text {
    max-width: 100%;
  }
}
</style>
