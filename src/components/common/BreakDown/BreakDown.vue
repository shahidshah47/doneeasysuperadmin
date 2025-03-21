<template>
  <div class="d-flex align-items-center justify-content-center my-4">
    <span class="text-muted fw-bold mx-2">{{ title }}</span>
    <div class="flex-grow-1 border-bottom"></div>
    <div
      class="d-flex align-items-center bg-white justify-content-center p-2 rounded-pill ms-3"
      @click="toggleIcon"
    >
      <i :class="iconClass"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Offer Breakdown",
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    iconClass() {
      return this.isExpanded
        ? "fa-chevron-down fa-solid"
        : "fa-chevron-up fa-solid";
    },
  },
  methods: {
    toggleIcon() {
      this.isExpanded = !this.isExpanded;
      this.$emit("toggle", this.isExpanded);
    },
  },
};
</script>

<style scoped>
.bg-white {
  cursor: pointer;
}
</style>
