<template>
  <div class="flex flex-col gap-2 relative">
    <div class='flex'>
      <label :class="['text-left flex-1 font-semibold text-dm-blue leading-[19px]', {'font-bold': required}]" :for="id">{{ label }} <span v-if="required">*</span></label>
      <button v-if="labelAction" @click="labelAction" :class="labelActionText !== 'Delete' ? 'text-vivid-purple' : 'text-red-500'">{{ labelActionText }}</button>
    </div>
    <div class="flex flex-row gap-4 w-full">
      <div v-if="name === 'mobile'" class="bg-light-lilac px-4 py-2 flex items-center justify-center rounded-lg">
        <!-- You need to set up your project to handle static assets like images in Vue -->
<!--        <img src="/DoneEasy_UAE_Flag.webp" alt="UAE" width="22" height="16" />-->
        <span class="font-semibold text-dm-blue pl-1">+971</span>
      </div>
      <input :type="inputType"
             :id="id"
             :name="name"
             v-model="inputValue"
             @input="handleInputChange"
             :class="{'border-red-500': error, 'hover:border-lavender-gray-2': !error}"
             :placeholder="placeholder"
             :min="minVal"
             :max="maxVal"
             :maxlength="maxlength"
             autocomplete="off"
             class="input-field"
      />
      <div v-if="type === 'password'" @click="togglePasswordVisibility"
           class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
        <img v-if="!isPasswordVisible" class="pt-[26px]" src="../assets/image/DoneEasy_VisiblePassword.webp" alt="Password Visibility" width="30" height="25" />
        <img v-else src="../assets/image/DoneEasy_InvisiablePassword.webp" class="pt-[26px]" alt="Password Visibility" width="30" height="25" />
      </div>
    </div>
    <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  label: String,
  labelAction: Function,
  labelActionText: String,
  required: Boolean,
  type: String,
  id: String,
  name: String,
  placeholder: String,
  value: String,
  minVal: Number,
  maxVal: Number,
  maxlength: Number,
  error: String
});

const inputValue = ref(props.value);
const isPasswordVisible = ref(false);

const inputType = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password';
  }
  return props.type;
});

function handleInputChange(event) {
  inputValue.value = event.target.value;
  emit('update:value', inputValue.value);
}

function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value;
}
</script>

<style scoped>
.input-field {
  padding: 15px;
  outline: 0;
  background-color: var(--light-lilac);
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  transition: border-color 0.2s ease-in-out;
}
.input-field:focus {
  //border-color: var(--light-purple);
}
.input-field:hover {
  //border-color: var(--lavender-gray-2);
}
</style>
