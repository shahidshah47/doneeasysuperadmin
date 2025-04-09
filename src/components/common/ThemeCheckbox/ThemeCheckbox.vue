<template>
  <div class="space-y-2">
    <div
      v-for="option in options"
      :key="option.value"
      class="flex items-center gap-2"
    >
      <input
        type="radio"
        :value="option.value"
        :id="option.id"
        :name="name"
        class="custom-radio block"
        :checked="selectedValue === option.value"
        @change="updateValue(option.value)"
      />
      <label :for="option.id" class="text-dm-blue !font-semibold text-xs block">
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  selectedValue: {
    type: [String, Number],
    required: false,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:selectedValue"]);

const updateValue = (value) => {
  emit("update:selectedValue", value);
};
</script>

<style scoped>
.custom-radio {
  position: relative;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.custom-radio:checked {
  background: linear-gradient(
    98.24deg,
    #9e21ee -10%,
    #5925eb 64.63%,
    #442ae8 116.94%
  );
  border: none;
}

.custom-radio:checked::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 4px;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
}

label {
  cursor: pointer;
}
</style>
