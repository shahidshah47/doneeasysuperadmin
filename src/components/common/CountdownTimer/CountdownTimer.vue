<template>
  <div class="d-flex align-items-center">
    <div class="!px-3">
      <h4 class="fw-bold mb-1">{{ formattedHours }}</h4>
      <small class="text-muted">Hrs</small>
    </div>
    <p class="fs-3 fw-bold">:</p>
    <div class="!px-3">
      <h4 class="fw-bold mb-1">{{ formattedMinutes }}</h4>
      <small class="text-muted">Min</small>
    </div>
    <p class="fs-3 fw-bold">:</p>
    <div class="!px-3">
      <h4 class="fw-bold mb-1">{{ formattedSeconds }}</h4>
      <small class="text-muted">Sec</small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hours: {
      type: Number,
      default: 0,
    },
    minutes: {
      type: Number,
      default: 0,
    },
    seconds: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    formattedHours() {
      return this.hours < 10 ? `0${this.hours}` : this.hours;
    },
    formattedMinutes() {
      return this.minutes < 10 ? `0${this.minutes}` : this.minutes;
    },
    formattedSeconds() {
      return this.seconds < 10 ? `0${this.seconds}` : this.seconds;
    },
  },
};
</script>

<style scoped>
.d-flex {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
