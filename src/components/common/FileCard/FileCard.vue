<template>
  <div
    class="flex items-center bg-white border-0 rounded-4 mb-3 overflow-hidden"
  >
    <div
      class="d-flex bg-success-subtle justify-content-center p-3 rounded-start-4 min-w-16"
    >
      <img
        :src="FileIcon"
        alt="File Icon"
        class="img-fluid"
        style="width: 30px"
      />
    </div>
    <div class="ml-3 max-w-60">
      <p class="text-sm font-semibold text-dm-blue mb-0 truncate">
        {{ fileName }}
      </p>
      <p class="text-vivid-purple mb-0 text-xs font-normal">{{ fileSize }}</p>
    </div>

    <div class="d-flex align-items-center cursor-pointer gap-2 ml-auto mr-3">
      <div v-if="isEyeIcon" class="bg-light-lilac p-1 rounded">
        <img
          :src="EyeIcon"
          alt="View File"
          class="icon-size"
          @click="viewFile"
        />
      </div>
      <div class="bg-light-lilac p-1 rounded">
        <img
          :src="DownloadIcon"
          alt="Download File"
          class="icon-size"
          @click="downloadFile"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import FileIcon from "../../../assets/images2/file-icon.png";
import EyeIcon from "../../../assets/image/icons/eye.svg";
import DownloadIcon from "../../../assets/image/icons/document-download.svg";

const props = defineProps({
  fileIcon: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    default: "--",
  },
  fileSize: {
    type: String,
    default: "--",
  },
  isEyeIcon: {
    type: Boolean,
    default: true,
  },
});

const getImageUrl = (imagePath) => {
  return new URL(imagePath, import.meta.url).href;
};

const viewFile = () => {
  console.log("Viewing file:", props.fileName);
};

const downloadFile = () => {
  console.log("Downloading file:", props.fileName);
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.icon-size {
  width: 20px;
  height: 20px;
}
</style>
