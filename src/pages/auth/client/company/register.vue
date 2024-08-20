<template>
  <div class="flex flex-col bg-white">
    <header class="bg-white text-white">
      <TopBar :register="true" />
    </header>
    <main class="flex bg-light-lilac main_body">
      <aside class="hidden w-96 bg-white p-4 lg:block sidebar">
        <div class="flex justify-center items-center lg:pt-20">
          <div class="flex flex-col gap-10 justify-center">
            <StepIndicator :currentStep="currentStep" :step="0" stepLabel="Create a company account" />
            <StepIndicator :currentStep="currentStep" :step="1" stepLabel="Upload Documents" />
            <StepIndicator :currentStep="currentStep" :step="2" stepLabel="Your personal details" />
          </div>
        </div>
      </aside>
      <div class="overflow-y-auto p-2 lg:p-6 content w-full">
        <component :is="formComponents[currentStep]" :formData="formData" :handleChange="validateField" :currentStep="currentStep" :companies="companies" :roles="roles" :checkTerms="setTermsCheck" />
      </div>
    </main>
    <footer class="flex self-end w-full lg:w-footer-content pr-6 lg:pr-11">
      <div class='py-4 px-4 flex flex-col-reverse gap-2 md:gap-0 md:flex-row w-full items-center md:items-baseline justify-between bg-white'>
        <button type="button" :disabled="isLoading" @click="cancelRegistration" class="px-[32px] text-vivid-purple text-lg text-bold rounded-[16px] bg-white uppercase h-[54px]">
          Cancel
        </button>
        <div class="flex gap-4">
          <button type="button" :disabled="currentStep === 0 || isLoading" @click="prevStep" class="md:w-[129px] h-[54px] px-[32px] text-lg text-bold rounded-[16px] bg-white uppercase">
            {{ isLastStep ? 'Edit' : 'Back' }}
          </button>
          <button type="button" :disabled="isLoading || !isStepValid" @click="nextStep" class="p-[14px] text-white text-lg text-bold rounded-2xl uppercase w-[129px] h-[56px]">
            <FontAwesomeIcon v-if="isLoading" icon="spinner" spin />
            <span v-else>{{ secondLastStep ? 'Submit' : 'Next' }}</span>
          </button>
          <button type="button" :disabled="isLoading" @click="sendOtp" v-if="isLastStep" class="bg-mix p-[14px] text-white text-lg text-bold rounded-2xl uppercase w-[129px] h-[56px]">
            <FontAwesomeIcon v-if="isLoading" icon="spinner" spin />
            <span v-else>OTP</span>
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TopBar from "../../../../components/TopBar.vue";
import CompanyDetails from "./component/CompanyDetails.vue"; // Adjust the path as necessary

const currentStep = ref(0);
const formData = ref([]);
const isLoading = ref(false);
const terms = ref(false);
const companies = ref([]);
const roles = ref([]);

// Components mapping for dynamic component rendering
const formComponents = {
  0: CompanyDetails,
  // 1: DocumentUploads,
  // 2: PersonalDetails,
  // 3: OverView
};

onMounted(async () => {
  const value = localStorage.getItem('currentStep');
  if (value) {
    currentStep.value = value;
  } else {
    localStorage.setItem("currentStep", currentStep.value.toString());
  }
  // Retrieve formData from localStorage
  const storedFormData = localStorage.getItem('formData');
  if (storedFormData) {
    const parsedFormData = JSON.parse(storedFormData);
    if (parsedFormData && Array.isArray(parsedFormData)) {
      formData.value = parsedFormData;
    }
  } else {
    localStorage.setItem('formData', JSON.stringify(formSteps));
  }
  await basicValues();
});

const basicValues = async () => {
  const data = await getBasicValues();
  const companiesList = await getCompanies();
  if (data) {
    roles.value = data.value.roles;
  }
  if (companiesList) {
    companies.value = companiesList;
  }
};

const validateField = async (stepIndex, fieldIndex, value) => {
  // Implementation here
};

const nextStep = async () => {
  // Implementation here
};

const prevStep = () => {
  // Implementation here
};

const cancelRegistration = () => {
  // Implementation here
};

const sendOtp = async () => {
  // Implementation here
};
</script>
