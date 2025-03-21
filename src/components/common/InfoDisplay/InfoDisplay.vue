<template>
  <div>
    <p class="text-vivid-purple text-sm leading-4 font-normal mb-0">
      {{ label }}
    </p>
    <p class="fw-semibold !text-base text-dm-blue font-theme mb-0">
      {{ value }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Label",
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
