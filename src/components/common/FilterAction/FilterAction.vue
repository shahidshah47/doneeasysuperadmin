<template>
  <button
    class="flex flex-row items-center border-0 gap-3 text-ds-blue text-sm leading-5 font-semibold"
  >
    Filters by
    <img :src="filterIcon" alt="Filter Icon" class="filter-icon" />
  </button>
</template>

<script>
import filterIcon from "../../../assets/image/icons/candle.svg";

export default {
  name: "FilterAction",
  data() {
    return {
      filterIcon,
    };
  },
};
</script>

<style scoped>
.filter-icon {
  width: 24px;
  height: 24px;
  margin-left: 5px;
}
</style>
