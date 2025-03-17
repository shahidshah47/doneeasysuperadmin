<template>
  <div class="d-flex gap-3">
    <button
      v-for="(filter, index) in filters"
      :key="index"
      class="btn !rounded-[10px] px-4 py-3"
      :class="{
        'button-primary !bg-vivid-purple ': activeFilter === filter,
        'button-light !bg-light-lilac ': activeFilter !== filter,
      }"
      @click="setActiveFilter(filter)"
    >
      {{ filter }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
      required: true,
    },
    activeFilter: {
      type: String,
      default: "All",
    },
  },
  emits: ["update:activeFilter"],
  methods: {
    setActiveFilter(filter) {
      this.$emit("update:activeFilter", filter);
    },
  },
};
</script>

<style scoped>
.button-primary {
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  font-weight: 600;
}
.button-light {
  font-size: 14px;
  line-height: 18px;
  color: #0e0d35;
  font-weight: 600;
}
.btn {
  transition: background-color 0.3s, color 0.3s;
}
</style>
