<template>
  <div class="container-fluid company-details">
    <div class="row">
      <!-- Company Info and Stats -->
      <keep-alive>
        <CompanyHeader />
      </keep-alive>
    </div>
    <div class="p-3 mb-1 bg-white rounded-3">
      <div class="d-flex justify-content-between align-items-center">
        <FilterButtons
          :filters="['All', 'In Progress', 'Schedule', 'Completed']"
          v-model:activeFilter="selectedFilter"
        />
        <div class="d-flex gap-3">
          <SearchInput v-model="searchTerm" placeholder="Search" />

          <div class="d-flex align-items-center">
            <FilterAction />
            <span
              class="w-0.5 bg-lavender-gray mx-2"
              style="height: 24px"
            ></span>
            <ColumnAction />
          </div>
        </div>
      </div>
      <DataTable />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CompanyHeader from "../../components/CompanyHeader.vue";
</script>

<script>
import FilterButtons from "../../components/common/FilterButtons/FilterButtons.vue";
import SearchInput from "../../components/common/SearchInput/SearchInput.vue";
import FilterAction from "../../components/common/FilterAction/FilterAction.vue";
import ColumnAction from "../../components/common/ColumnAction/ColumnAction.vue";
import DataTable from "../../components/common/DataTable/DataTable.vue";

export default {
  components: {
    FilterButtons,
    SearchInput,
    FilterAction,
    ColumnAction,
    DataTable,
  },
  data() {
    return {
      searchTerm: "",
      selectedFilter: "All",
      items: [
        {
          id: 1,
          organization: "Acme Co.",
          description: "Business Consulting",
          status: "In Progress",
        },
        {
          id: 2,
          organization: "Beta Corp.",
          description: "Marketing Strategy",
          status: "Schedule",
        },
        {
          id: 3,
          organization: "Gamma Ltd.",
          description: "Tech Consulting",
          status: "Completed",
        },
      ],
    };
  },
  computed: {
    filteredItems() {
      if (this.selectedFilter === "All") {
        return this.items;
      }
      return this.items.filter((item) => item.status === this.selectedFilter);
    },
  },
};
</script>
