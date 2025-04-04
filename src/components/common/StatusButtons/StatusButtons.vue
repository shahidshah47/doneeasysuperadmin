<template>
  <button
    v-for="(item, index) in buttons"
    :key="index"
    @click="handleClick(item.value)"
    :class="` !rounded-lg px-3 py-2.5 active:!bg-vivid-purple font-semibold ${
      statusBtn === item.value
        ? '!bg-vivid-purple text-white'
        : 'bg-light-lilac text-dm-blue'
    }`"
  >
    {{ item.label }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  statusBtn: Number,
  buttons: Array, // Example: [{ label: 'All', value: 1 }, { label: 'Approved', value: 2 }, { label: 'Pending', value: 3 }]
});

const emit = defineEmits(["update:statusBtn"]);

const handleClick = (value) => {
  emit("update:statusBtn", value);
};
</script>
