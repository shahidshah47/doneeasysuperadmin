<template>
  <div
    class="completion-bar"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    {{ percentage }}% Complete
  </div>
</template>

<script>
export default {
  name: "CompletionBar",
  props: {
    percentage: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.completion-bar {
  align-self: stretch;
  background-color: #a321ee;
  border-radius: 4px;
  color: #fcfdff;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.2;
  padding: 4px;
  z-index: 10;
}
</style>
