<template>
  <TopBar></TopBar>
  <div class="flex items-center justify-center min-h-screen font-averta">
    <!-- Adjusted max width and padding for a wider card -->
    <div class="px-4 py-8 bg-white rounded-lg shadow-xl w-full max-w-2xl">
      <h2 class="mb-6 text-2xl font-bold text-gray-700 text-left font-averta">Create Account</h2>
      <form @submit.prevent="signUp" class="text-left">
        <div class="mb-4">
          <label for="fullName" class="block font-bold text-gray-700 font-averta">Full Name</label>
          <input type="text" id="fullName" v-model="fullName"
                 class="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required>
        </div>
        <div class="mb-4">
          <label for="email" class="block font-bold text-gray-700 font-averta">Email</label>
          <input type="email" id="email" v-model="email"
                 class="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required>
        </div>
        <div class="mb-4 relative">
          <label for="password" class="block font-bold text-gray-700 font-averta">Password</label>
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                 class="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3" style="height: 96px;">
            <i :class="`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`" @click="showPassword = !showPassword"></i>
          </div>
        </div>
        <div class="mb-6 relative">
          <label for="password_confirmation" class="block font-bold text-gray-700 font-averta">Confirmation</label>
          <input :type="showPasswordConfirmation ? 'text' : 'password'" id="password_confirmation" v-model="passwordConfirmation"
                 class="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3" style="height: 96px;">
            <i :class="`fa ${showPasswordConfirmation ? 'fa-eye-slash' : 'fa-eye'}`" @click="showPasswordConfirmation = !showPasswordConfirmation"></i>
          </div>
        </div>
        <button type="submit"
                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-800 focus:outline-none focus:shadow-outline">
          Create Account
        </button>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import TopBar from "../../../components/TopBar.vue";

const fullName = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

function signUp() {
  // Perform sign-up logic here
  console.log({ fullName: fullName.value, email: email.value, password: password.value });
}
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>
