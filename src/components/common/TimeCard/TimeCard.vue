<template>
  <div
    :class="[
      'relative rounded-2xl p-[1px] overflow-hidden ',
      active
        ? '!bg-[#f2f4fb] border-gradient'
        : 'bg-white-100 border-gradient-light ',
    ]"
  >
    <div class="bg-white-100 rounded-xl p-3 flex flex-col items-start">
      <div class="text-vivid-purple !font-semibold text-xs">
        Day {{ formattedDay }}
      </div>
      <div class="text-dm-blue text-sm font-semibold mt-1">
        {{ formattedHours }} Hours, {{ formattedMinutes }} Minutes and
        {{ formattedSeconds }} Seconds
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  day: {
    type: Number,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  minutes: {
    type: Number,
    required: true,
  },
  seconds: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

// Format day with leading zero
const formattedDay = computed(() => {
  return props.day.toString().padStart(2, "0");
});

// Format time values with leading zeros
const formattedHours = computed(() => {
  return props.hours.toString().padStart(2, "0");
});

const formattedMinutes = computed(() => {
  return props.minutes.toString().padStart(2, "0");
});

const formattedSeconds = computed(() => {
  return props.seconds.toString().padStart(2, "0");
});
</script>
