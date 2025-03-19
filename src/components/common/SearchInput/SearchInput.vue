<template>
  <div class="search-container position-relative">
    <input
      type="text"
      class="form-control search-input"
      :placeholder="placeholder"
      v-model="searchQuery"
      @input="$emit('update:modelValue', searchQuery)"
    />
    <img :src="searchIcon" alt="Search" class="search-icon" />
  </div>
</template>

<script>
import searchIcon from "../../../assets/image/icons/search.svg";
export default {
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: "Search",
    },
  },
  data() {
    return {
      searchQuery: this.modelValue,
      searchIcon,
    };
  },
  watch: {
    modelValue(newVal) {
      this.searchQuery = newVal;
    },
  },
};
</script>

<style scoped>
.search-container {
  position: relative;
  width: 300px;
}

.search-input {
  width: 100%;
  padding: 10px 16px 10px 16px;
  border: none;
  border-radius: 8px;
  border: 0.5px solid #eef2f7;
  background-color: #f2f4fb;
  outline: none;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.search-input::placeholder {
  color: #868599;
  font-size: 16px;
  line-height: 18px;
  font-weight: 400;
}
</style>
