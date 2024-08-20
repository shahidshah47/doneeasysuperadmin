<template>
  <nav class="bg-white px-1 md:px-14 w-full py-6 border-b-1 border-lavender top-0 z-10">
    <div class="flex flex-row md:flex-col lg:flex-row items-center justify-between">
      <!-- Logo click handling -->
      <div @click="handleLogoClick">
        <!-- Conditional rendering for different screen sizes -->
        <img v-if="isXl" src="../assets/Logo.png" alt="Logo" width="175" height="40" class="flex-shrink-0 px-4 md:px-0"/>
        <img v-else src="../assets/Logo_small.png" alt="Logo" width="64" height="64" class="flex-shrink-0 px-4 md:px-0"/>
      </div>

      <div class="flex flex-row px-4 md:px-2">
        <p class="text-dm-blue text-base font-semibold pr-2">Need Help ?</p>
        <!-- Contact us link -->
        <a @click.prevent="handleContactUsClick" href="#contact_us" class="text-blue-800 text-base font-semibold">Contact Us</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// This could be passed as a prop if needed
const register = ref(false);

const router = useRouter();

const handleContactUsClick = () => {
  if (register.value) {
    confirmDialog('Leave Page?', 'Changes you made may not be saved', () => {
      localStorage.removeItem("currentStep");
      localStorage.removeItem("formData");
      router.push('/#contact_us');
    }, 'warning', 'Leave', 'Cancel');
  } else {
    router.push('/#contact_us');
  }
};

const handleLogoClick = () => {
  if (register.value) {
    confirmDialog('Leave Page?', 'Changes you made may not be saved', () => {
      localStorage.removeItem("currentStep");
      localStorage.removeItem("formData");
      router.push('/');
    }, 'warning', 'Leave', 'Cancel');
  } else {
    router.push('/');
  }
};

const isXl = computed(() => {
  // Implement logic to determine if screen is XL
  return window.innerWidth >= 1280; // Example breakpoint
});
</script>

<style scoped>
/* Add your CSS here */
</style>
