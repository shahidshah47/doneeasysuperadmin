<template>
  <TopBar></TopBar>
  <div class="flex items-center justify-center min-h-screen">
    <div class="p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
      <h2 class="mb-6 text-2xl font-bold text-gray-700 text-left">Log In</h2> <!-- Align title to left -->
      <form @submit.prevent="signIn" class="text-left"> <!-- Align form elements to left -->
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" v-model="username"
                 class="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required>
        </div>
        <div class="mb-6 relative">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                 class="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3" style="height: 90px">
              <i :class="`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`" @click="showPassword = !showPassword"></i>
          </div>
        </div>
        <button type="submit"
                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
          Let's Begin
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TopBar from "../../../components/TopBar.vue";

const router = useRouter();
const username = ref('');
const password = ref('');
const showPassword = ref(false);

function signIn() {
  console.log("Navigating to dashboard.");
  console.log(router)
  router.push('/dashboard').catch(err => {
    console.error("Failed to navigate:", err);
  });
}

function togglePassword() {
  showPassword.value = !showPassword.value;
}

</script>