<template>
  <button
    class="flex flex-row items-center border-0 gap-3 text-ds-blue text-sm leading-5 font-semibold"
  >
    Columns
    <img :src="columnIcon" alt="Column Icon" class="column-icon" />
  </button>
</template>

<script>
import columnIcon from "../../../assets/image/icons/grid.svg";

export default {
  name: "ColumnAction",
  data() {
    return {
      columnIcon,
    };
  },
};
</script>

<style scoped>
.column-icon {
  width: 24px;
  height: 24px;
  margin-left: 5px;
}
</style>
