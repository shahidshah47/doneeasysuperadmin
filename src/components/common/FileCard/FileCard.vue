<template>
  <div class="d-flex align-items-center bg-white border-0 rounded-4 mb-3">
    <!-- Icon and File Name Section -->
    <div
      class="d-flex bg-success-subtle justify-content-center p-3 rounded-start-4"
    >
      <img
        :src="fileIconUrl"
        alt="File Icon"
        class="img-fluid"
        style="width: 30px"
      />
    </div>
    <div>
      <p class="fs-6 mb-0 ms-3">{{ fileName }}</p>
      <p class="text-secondary -font mb-0 ms-3">{{ fileSize }}</p>
    </div>

    <!-- Icons Section -->
    <div class="d-flex align-items-center cursor-pointer gap-3 me-3 ms-auto">
      <i class="fa fa-eye" @click="viewFile"></i>
      <i class="fa fa-file" @click="downloadFile"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fileIcon: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      default: "Company Profile",
    },
    fileSize: {
      type: String,
      default: "3.2mb",
    },
  },
  computed: {
    fileIconUrl() {
      return new URL(this.fileIcon, import.meta.url).href;
    },
  },
  methods: {
    viewFile() {
      console.log("Viewing file:", this.fileName);
    },
    downloadFile() {
      console.log("Downloading file:", this.fileName);
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
