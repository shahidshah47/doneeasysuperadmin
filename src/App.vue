<script setup>
import { Avatar, Toast } from 'primevue';

</script>

<template>
  <div class="min-h-screen">
    <Toast position="bottom-right">
      <template #message="slotProps">
        <div class="flex flex-col items-start flex-auto">
          <div class="font-semibold !text-dm-blue text-base">{{ slotProps.message.summary + "!" }}</div>
          <div class="font-medium !text-gray-500 text-base">{{ slotProps.message.detail }}</div>
        </div>
      </template>
    </Toast>
    <router-view />
  </div>
</template>