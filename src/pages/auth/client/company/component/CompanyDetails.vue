<template>
  <div class="w-full px-6">
    <div class="pt-12 pb-8">
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold leading-8 text-rich-navy">Create a company account</h1>
        <p class="text-dl-gray text-base">Ignite your business journey with a simple sign-up! Create your company
          account now and unlock a world of opportunities.</p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 justify-center">
      <div class="bg-white-500 rounded-xl p-6">
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
                v-for="(field, index) in formFields"
                :key="index"
<!--                v-if="!field.is_hidden && field.type === 'text'"-->
                :label="field.label"
                :required="field.is_required"
                :type="field.type"
                :id="field.name"
                :name="field.name"
                :value="field.value"
                :error="field.error"
                :field-index="index"
                @change="handleInputChange(index, $event)"
            />
            <LiveSearch
                v-if="field.name === 'company_name'"
                :label="field.label"
                :type="field.type"
                :id="field.name"
                :name="field.name"
                :value="field.value"
                :error="field.error"
                :field-index="index"
                :companies="companies"
                @change="liveSearchField($event, index, field.name)"
            />
          </div>
          <div class="flex flex-col gap-2 relative">
            <label class="text-dm-blue font-semibold leading-[19px]">Company Size</label>
            <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 pb-3">
              <Card
                  v-for="(value, idx) in employees"
                  :key="idx"
                  :img="'/DoneEasy_CompanySize.webp'"
                  :field-index="index"
                  :heading="value"
                  :description="' '"
                  :checkbox="false"
                  :is-selected="selectedEmployeeRange === value"
                  @select="handleSelect(value, fieldIndex)"
                  :image-width="37"
                  :image-height="37"
              />
            </div>
            <span v-if="field.error" class="text-red-500 text-sm text-left">{{ field.error }}</span>
          </div>
          <div class="flex flex-row gap-3 ">
            <FileUpload
                v-for="(field, index) in formData[currentStep].fields"
                :key="index"
                v-if="field.type === 'file'"
                :field="field"
                :label="'Upload Company logo'"
                :update-image="handleImage"
                :field-index="index"
                :company-logo="companyLogo"
            />
          </div>
        </div>
      </div>
      <div
          :class="`bg-light-lilac rounded-xl border-4 border-white p-2 lg:float-left ml-0 md:ml-6 ${(location.lat === null) ? 'flex justify-center items-center' : ''}`">
        <div :class="`${(location.lat === null) ? 'md:px-[60px] py-[204px]' : ''}`">
<!--          <GoogleMapComponent v-if="location.lat" :location="location" />-->
<!--          <Image v-else height="162" width="191" src="/DoneEasy_MapPlaceHolder.webp" alt="Location Empty" />-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  formData: Array,
  handleChange: Function,
  currentStep: Number,
  companies: Array
});

const employees = ['1-10', '10-20', '20-50', '50-100', '100-500', '500+'];
const selectedEmployeeRange = ref('');
const location = ref({ lat: null, lng: null });
const companyLogo = ref("");

const handleSelect = (value, fieldIndex) => {
  selectedEmployeeRange.value = value;
  props.handleChange(props.currentStep, fieldIndex, value);
};

const handleInputChange = (index, event) => {
  const value = event.target.value;
  props.handleChange(props.currentStep, index, value);
};

const handleImage = (data, index) => {
  props.handleChange(props.currentStep, index, data);
};

const liveSearchField = (value, index, name) => {
  props.handleChange(props.currentStep, index, value);
  if (name === 'company_logo') {
    companyLogo.value = value;
  }
};

watch(() => location.value, () => {
  // additional logic if needed
}, { deep: true });
</script>
