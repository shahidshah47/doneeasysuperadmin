<template>
  <div :class="className">
    <p class="text-vivid-purple text-sm leading-4 font-normal mb-1" :class="props.labelClass">
      {{ label }}
    </p>
    <p :class="props.textClass" class="fw-bold text-base text-dm-blue font-theme mb-0">
      {{ value }}
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: "Label"
  },
  value: {
    type: String,
    required: true
  },
  className: String,
  labelClass: String,
  textClass: String,
})
</script>
