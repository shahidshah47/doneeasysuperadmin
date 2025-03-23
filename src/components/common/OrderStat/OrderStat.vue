<template>
  <div class="space-y-1">
    <p class="!text-sm !text-grayColor m-0" v-html="formattedLabel"></p>
    <p class="!text-2xl !font-bold text-vivid-purple m-0">{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: Number,
    breakPoint: String,
  },
  computed: {
    formattedLabel() {
      return this.label.replace(
        new RegExp(`(${this.breakPoint})`, "i"),
        "$1 <br />"
      );
    },
  },
};
</script>

<style scoped></style>
