
<template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div class="flex justify-center">
          <img src="../../../assets/image/email_confirm.png" alt="Email Confirmation" class="w-20 h-20"> <!-- Ensure you have an image -->
        </div>
        <h1 class="text-center text-2xl font-bold mt-4">Email Confirmation</h1>
        <p class="text-center mt-2 text-gray-600">
          An email has been sent to your email address. Kindly click on the link to complete the verification process and proceed with login.
        </p>
        <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          Go Back
        </button>
      </div>
    </div>
</template>


<script setup>
import {onMounted} from "vue";

onMounted(()=>{
  console.log("Email Confirmation")
})

</script>



<style scoped>

</style>