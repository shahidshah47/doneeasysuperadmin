<template>
  <div
    class="flex items-center justify-between py-4 px-6 bg-white shadow-md rounded-lg"
  >
    <div class="text-sm text-gray-600">
      <span class="!text-grayColor text-sm leading-5 font-normal">
        Showing
      </span>
      <span class="!text-dm-blue text-sm leading-5 font-semibold">{{
        start
      }}</span>
      <span class="!text-grayColor text-sm leading-5 font-normal"> to </span>
      <span class="!text-dm-blue text-sm leading-5 font-semibold">{{
        end
      }}</span>
      <span class="!text-grayColor text-sm leading-5 font-normal">
        of Entries</span
      >

      <div class="relative inline-block">
        <select
          v-model="selectedEntries"
          @change="updateEntries"
          class="appearance-none text-sm focus:outline-none focus:ring-0 !w-13"
        >
          <option
            v-for="option in entriesOptions"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        <img
          src="../../../assets/image/icons/chevron-down.svg"
          alt="Dropdown Icon"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none"
        />
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button
        :disabled="currentPage === 1"
        @click="prevPage"
        class="px-3 py-2 text-sm rounded-md"
        :class="
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-200'
        "
      >
        &lt; Previous
      </button>

      <button
        v-for="page in pages"
        :key="page"
        @click="page !== '...' && goToPage(page)"
        class="px-3 py-2 text-sm !font-semibold leading-5 !rounded-md"
        :class="
          currentPage === page
            ? 'bg-vivid-purple text-white'
            : 'text-gray-700 hover:bg-gray-200'
        "
        :disabled="page === '...'"
      >
        {{ page }}
      </button>

      <button
        :disabled="currentPage === totalPages"
        @click="nextPage"
        class="px-3 py-2 text-sm rounded-md"
        :class="
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-200'
        "
      >
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
      const pagesToShow = 4; // Number of pages before "..."

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
      } else if (current >= total - pagesToShow + 1) {
        pageNumbers = [
          1,
          "...",
          ...Array.from(
            { length: pagesToShow },
            (_, i) => total - pagesToShow + i + 1
          ),
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
  },
  methods: {
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
  },
};
</script>

<style>
select::-webkit-inner-spin-button,
select::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

select {
  background-image: none !important;
}
</style>
