<template>
  <div class="relative flex-1 min-w-0">
    <InputText
      :modelValue="modelValue"
      @update:modelValue="updateModelValue"
      :placeholder="placeholder"
      class="w-full !bg-light-lilac !px-4 !py-2.5 pl-10 placeholder-grayColor !rounded-lg focus:outline-none !border-[0.5px] !border-solid !border-silver-lining"
    />
    <img
      :src="searchIcon"
      alt="Search"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
    />
  </div>

  <div class="flex items-center">
    <button
      class="flex flex-row items-center border-0 gap-3 text-ds-blue text-sm leading-5 font-semibold"
    >
      Filters by
      <img :src="filterIcon" alt="Filter Icon" class="icon" />
    </button>
    <span class="bg-lavender-gray w-0.5 mx-4" style="height: 24px"></span>
    <button
      class="flex flex-row items-center border-0 gap-3 text-ds-blue text-sm leading-5 font-semibold"
    >
      Columns
      <img :src="columnIcon" alt="Column Icon" class="icon" />
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import filterIcon from "../../../assets/image/icons/candle.svg";
import columnIcon from "../../../assets/image/icons/grid.svg";
import searchIcon from "../../../assets/image/icons/search.svg";
import { InputText } from "primevue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Search",
  },
});

const emit = defineEmits();

const updateModelValue = (value) => {
  emit("update:modelValue", value);
};
</script>

<style scoped>
.icon {
  width: 24px;
  height: 24px;
  margin-left: 5px;
}
</style>
