<template>
  <main class="flex flex-col w-full">
    <TopBar></TopBar>
    <div class="flex justify-center items-center flex-col gap-8 py-20 bg-lavender text-center">
      <div class="bg-white rounded-xl flex justify-center items-center flex-col gap-4 px-8 py-8">
        <div>
          <img src="../../../assets/Logo.png" alt="Logo" width="216" height="49"/>
        </div>
        <div class="py-4">
          <h4 class="pt-4 text-xl">Welcome to DoneEasy</h4>
          <p class="pt-4 text-lg">
            DoneEasy helps you get more offers from a range of trusted vendors.
          </p>
          <p v-if="error" class="text-danger text-center">{{ error }}</p>
        </div>
        <div class="w-full flex flex-col gap-4">
          <div v-for="(field, index) in formData" :key="index">
            <InputField
                :label="field.label"
                :type="field.name === 'password' ? passwordType : field.type"
                :name="field.name"
                v-model="field.value"
                :error="field.error"
                @input="handleChange(index, $event)"
                input-class="w-full h-10"
            />
            <span v-if="field.error" class="text-red-500">{{ field.error }}</span>
          </div>
          <div>
            <router-link to="/forgot-password"><p class="text-vivid-purple text-right">Forgot Password?</p></router-link>
          </div>
          <div class="pt-6">
            <button @click="login" class="bg-mix-gradient w-full h-16 text-white text-base font-semibold rounded-lg uppercase transition-background">
              Login
            </button>
          </div>
          <div>
            <p class="text-dl-gray text-md">Don’t have an account? <router-link to="/register" class="text-dm-blue font-semibold">Sign Up</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue';
import InputField from "../../../components/InputField.vue";
import TopBar from "../../../components/TopBar.vue";

const formData = reactive([
  { name: 'email', type: 'email', label: 'Email', value: '', error: '' },
  { name: 'password', type: 'password', label: 'Password', value: '', error: '' }
]);
const passwordType = ref('password');
const error = ref('');

const handleChange = (fieldIndex, event) => {
  const value = event.target.value;
  formData[fieldIndex].value = value;
  // You can implement validation here if needed
};

const login = async () => {
  let is_valid = true;
  // Add validation checks here if necessary
  if (is_valid) {
    try {
      const response = await verifyLogin({
        email: formData[0].value,
        password: formData[1].value,
        device_id: 'web'
      });
      if (response.success) {
        this.$router.push('/waitlist-confirmation');
        error.value = '';
      } else {
        error.value = response.message;
      }
    } catch (e) {
      console.error("Login failed:", e);
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
.text-danger {
  color: #dc3545; /* Bootstrap danger color for example */
}
</style>
