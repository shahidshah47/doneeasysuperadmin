<template>
  <div class="flex items-center gap-2">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="hidden peer"
    />
    <div
      class="w-5 h-5 border-2 border-solid border-lavender-gray rounded-md peer-checked:bg-vivid-purple peer-checked:border-vivid-purple flex items-center justify-center transition-all"
    >
      <svg
        v-if="modelValue"
        xmlns="http://www.w3.org/2000/svg"
        class="w-3 h-3 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L9 11.586l6.293-6.293a1 1 0 0 1 1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <label :for="id" class="!text-dm-blue !text-base !font-semibold">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
    label: String,
    id: String,
  },
  emits: ["update:modelValue"],
};
</script>
