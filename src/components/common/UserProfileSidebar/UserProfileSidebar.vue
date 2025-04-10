<template>
  <div class="bg-light-lilac p-4 rounded-xl col-span-3">
    <div class="company-info flex gap-2 items-center flex-col">
      <div class="w-12 h-12 relative">
        <img
          src="../../../assets/image/profile-picture.jpg"
          alt="profile-picture"
          class="w-12 h-12 rounded-2xl object-cover"
        />
        <span
          class="absolute -bottom-1 -right-1 text-black font-theme font-theme-bold border-2 border-white text-xs w-3 h-3 rounded-full bg-profile-indicator"
        ></span>
      </div>
      <div class="flex flex-col gap-1 items-center">
        <p class="text-dm-blue font-theme font-theme-bold">Jane Cooper</p>
        <div class="flex flex-row gap-1">
          <img
            src="../../../assets/image/icons/building-2.svg"
            alt="building icon"
          />
          <p class="p-0 bg-transparent text-vivid-purple font-theme mb-0">
            Abstergo Ltd.
          </p>
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-col gap-2">
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="bg-white-100 border border-lavender px-3 pt-4 pb-6 rounded-lg w-full"
      >
        <button
          @click="toggleSection(section)"
          class="flex flex-row gap-2 justify-between items-center w-full"
        >
          <span class="flex items-center gap-2">
            <img
              v-if="section === 'Order Status'"
              src="../../../assets/image/icons/notification-status-2.svg"
              alt="status icon"
            />
            <img
              v-if="section === 'Files'"
              src="../../../assets/image/icons/paperclip.svg"
              alt="paper icon"
            />
            <img
              v-if="section === 'Links'"
              src="../../../assets/image/icons/link.svg"
              alt="link icon"
            />
            <img
              v-if="section === 'Notes'"
              src="../../../assets/image/icons/note-3.svg"
              alt="note icon"
            />
            <img
              v-if="section === 'Violence & Chat'"
              src="../../../assets/image/icons/square.svg"
              alt="square icon"
            />
            <span
              class="font-theme font-semibold text-black text-xs leading-[14px]"
            >
              {{ section }}
            </span>
          </span>
          <img
            src="../../../assets/image/icons/Arrow.svg"
            alt="Chevron"
            :class="openSection === section ? 'rotate-180' : ''"
            class="transition-transform duration-300 ease-in-out"
          />
        </button>
        <div
          v-if="openSection === section"
          class="px-4 py-2 text-sm text-gray-600"
        >
          Content for {{ section }} goes here.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const openSection = ref(null);
const sections = ["Order Status", "Files", "Links", "Notes", "Violence & Chat"];

const toggleSection = (section) => {
  openSection.value = openSection.value === section ? null : section;
};
</script>
