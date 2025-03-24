<template>
  <div class="flex justify-between rounded-lg items-center relative w-full pt-4">
    <div class="text-gray-600 text-sm">
      <span class="text-sm !text-grayColor font-normal leading-5">
        Showing
      </span>
      <span class="text-sm !text-dm-blue font-semibold leading-5">{{ start }}</span>
      <span class="text-sm !text-grayColor font-normal leading-5"> to </span>
      <span class="text-sm !text-dm-blue font-semibold leading-5">{{ end }}</span>
      <span class="text-sm !text-grayColor font-normal leading-5"> of </span>
      <span class="text-sm !text-dm-blue font-semibold leading-5">{{ totalEntries }}</span>
      <span class="text-sm !text-grayColor font-normal leading-5 mr-2"> Entries</span>

      <div class="inline-block relative" ref="dropdownContainer">
        <button @click="toggleDropdown"
          class="flex bg-white justify-between rounded-md text-sm !text-dm-blue focus:outline-none focus:ring-0 font-semibold gap-2 items-center leading-5">
          {{ selectedEntries }}
          <img src="../../../assets/image/icons/chevron-down.svg" alt="Dropdown Icon" class="h-3 w-3" />
        </button>

        <ul v-if="isDropdownOpen" :style="dropdownStyle"
          class="bg-white border border-gray-200 p-2 rounded-md shadow-md !w-28 absolute z-50">
          <li v-for="option in entriesOptions" :key="option" 
            @click="selectEntry(option)" 
            :class="['rounded-sm text-sm text-vivid-purple cursor-pointer font-semibold hover:bg-light-lilac px-2 py-1', option === selectedEntries ? 'bg-light-lilac font-bold' : '']">
            {{ option }}
          </li>
        </ul>
      </div>
    </div>

    <div class="flex gap-2 items-center">
      <button :disabled="currentPage === 1" @click="prevPage" class="rounded-md text-sm font-normal px-3 py-2" :class="currentPage === 1
        ? 'text-grayColor cursor-not-allowed'
        : 'text-dm-blue hover:bg-gray-200'
        ">
        <i class="fa fa-chevron-left mr-2"></i> Previous
      </button>

      <button v-for="page in pages" :key="page" @click="page !== '...' && goToPage(page)"
        class="text-sm !font-semibold !rounded-md leading-5 px-3 py-2" :class="currentPage === page
          ? 'bg-vivid-purple text-white'
          : 'text-grayColor hover:bg-gray-200'
          " :disabled="page === '...'">
        {{ page }}
      </button>

      <button :disabled="currentPage === totalPages" @click="nextPage" class="rounded-md text-sm font-normal px-3 py-2"
        :class="currentPage === totalPages
          ? 'text-grayColor cursor-not-allowed'
          : 'text-dm-blue hover:bg-gray-200'
          ">
        Next <i class="fa fa-chevron-right ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const selectedEntries = ref(20);
const entriesOptions = ref([20, 50, 100, 200]);
const currentPage = ref(1);
const perPage = ref(20);
const isDropdownOpen = ref(false);
const dropdownPosition = ref({ top: "0px", left: "0px" });
const dropdownContainer = ref(null);

const props = defineProps({
  totalEntries: Number,
  perPage: Number,
  first: Number,
  last: Number,
  page: Number,
  pageCount: Number,
  rows: Number,
  firstPageCallback: Function,
  lastPageCallback: Function, rowChangeCallback: Function,
  prevPageCallback: Function,
  nextPageCallback: Function,
  perPage: Number,
})

const emit = defineEmits(['nextPageClick']);

const totalPages = computed(() => Math.ceil(props.totalEntries / props.perPage));
const start = computed(() => (currentPage.value - 1) * props.perPage + 1);
const end = computed(() => Math.min(currentPage.value * props.perPage, props.totalEntries));
const pages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pagesToShow = 5;

  if (total <= pagesToShow + 2) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  let pageNumbers = [];
  if (current <= pagesToShow) {
    pageNumbers = [
      ...Array.from({ length: pagesToShow }, (_, i) => i + 1),
      "...",
      total,
    ];
  } else if (current >= total - pagesToShow) {
    pageNumbers = [
      1,
      "...",
      ...Array.from({ length: pagesToShow }, (_, i) => total - pagesToShow + i + 1),
    ];
  } else {
    pageNumbers = [
      1,
      "...",
      current - 1,
      current,
      current + 1,
      "...",
      total,
    ];
  }

  return pageNumbers;
});
const dropdownStyle = computed(() => ({
  position: "absolute",
  top: dropdownPosition.value.top,
  left: dropdownPosition.value.left,
  width: "100%",
}));

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
  calculateDropdownPosition();
}

function selectEntry(option) {
  selectedEntries.value = option;
  isDropdownOpen.value = false;
  updateEntries();
}

function calculateDropdownPosition() {
  const button = dropdownContainer.value.querySelector("button");
  const dropdown = dropdownContainer.value.querySelector("ul");
  if (!button || !dropdown) return;

  const rect = button.getBoundingClientRect();
  const spaceAbove = rect.top;
  const spaceBelow = window.innerHeight - rect.bottom;

  if (spaceBelow < dropdown.clientHeight && spaceAbove > dropdown.clientHeight) {
    dropdownPosition.value = {
      top: `-${dropdown.clientHeight + 5}px`,
      left: "0px",
    };
  } else {
    dropdownPosition.value = {
      top: `${rect.height + 5}px`,
      left: "0px",
    };
  }
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
  emit('nextPageClick', currentPage.value);
}

function goToPage(page) {
  currentPage.value = page;
  emit('nextPageClick', page);
}

function updateEntries() {
  props.perPage = selectedEntries.value;
  currentPage.value = 1;

}

function closeDropdown(event) {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<style>
.relative {
  position: relative;
}

.absolute {
  position: absolute;
  z-index: 50;
}
</style>