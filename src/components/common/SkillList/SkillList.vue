<template>
  <div class="border-0 rounded bg-white p-3 mb-3 flex gap-2 items-center">
    <div
      v-for="(tag, index) in tags"
      :key="index"
      class="!bg-light-purple rounded-xl p-2 text-white-100 font-semibold text-sm inline-block whitespace-nowrap"
    >
      {{ tag }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
};
</script>
