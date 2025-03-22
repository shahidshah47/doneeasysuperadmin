<template>
  <div class="flex bg-white justify-between rounded-lg shadow-md items-center px-6 py-4 relative">
    <div class="text-gray-600 text-sm">
      <span class="text-sm !text-grayColor font-normal leading-5">
        Showing
      </span>
      <span class="text-sm !text-dm-blue font-semibold leading-5">{{ start }}</span>
      <span class="text-sm !text-grayColor font-normal leading-5"> to </span>
      <span class="text-sm !text-dm-blue font-semibold leading-5">{{ end }}</span>
      <span class="text-sm !text-grayColor font-normal leading-5"> of Entries </span>

      <div class="inline-block relative" ref="dropdownContainer">
        <button @click="toggleDropdown"
          class="flex bg-white justify-between rounded-md text-sm !text-dm-blue focus:outline-none focus:ring-0 font-semibold gap-2 items-center leading-5">
          {{ selectedEntries }}
          <img src="../../../assets/image/icons/chevron-down.svg" alt="Dropdown Icon" class="h-3 w-3" />
        </button>

        <ul v-if="isDropdownOpen" :style="dropdownStyle"
          class="bg-white border border-gray-200 p-2 rounded-md shadow-md !w-28 absolute z-50">
          <li v-for="option in entriesOptions" :key="option" @click="selectEntry(option)" :class="['rounded-sm text-sm text-vivid-purple cursor-pointer font-semibold hover:bg-light-lilac px-2 py-1',
            option === selectedEntries ? 'bg-light-lilac font-bold' : '']">
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
        &lt; Previous
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
        Next &gt;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalEntries: 500,
      selectedEntries: 50,
      entriesOptions: [25, 50, 100, 200],
      currentPage: 1,
      perPage: 50,
      isDropdownOpen: false,
      dropdownPosition: { top: "0px", left: "0px" },
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalEntries / this.perPage);
    },
    start() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    end() {
      return Math.min(this.currentPage * this.perPage, this.totalEntries);
    },
    pages() {
      const total = this.totalPages;
      const current = this.currentPage;
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
    },
    dropdownStyle() {
      return {
        position: "absolute",
        top: this.dropdownPosition.top,
        left: this.dropdownPosition.left,
        width: "100%",
      };
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      this.calculateDropdownPosition();
    },
    selectEntry(option) {
      this.selectedEntries = option;
      this.isDropdownOpen = false;
      this.updateEntries();
    },
    calculateDropdownPosition() {
      this.$nextTick(() => {
        const button = this.$refs.dropdownContainer.querySelector("button");
        const dropdown = this.$refs.dropdownContainer.querySelector("ul");
        if (!button || !dropdown) return;

        const rect = button.getBoundingClientRect();
        const spaceAbove = rect.top;
        const spaceBelow = window.innerHeight - rect.bottom;

        if (spaceBelow < dropdown.clientHeight && spaceAbove > dropdown.clientHeight) {
          this.dropdownPosition = {
            top: `-${dropdown.clientHeight + 5}px`,
            left: "0px",
          };
        } else {
          this.dropdownPosition = {
            top: `${rect.height + 5}px`,
            left: "0px",
          };
        }
      });
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    goToPage(page) {
      this.currentPage = page;
    },
    updateEntries() {
      this.perPage = this.selectedEntries;
      this.currentPage = 1;
    },
    closeDropdown(event) {
      if (this.$refs.dropdownContainer && !this.$refs.dropdownContainer.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeDropdown);
  },
};
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
