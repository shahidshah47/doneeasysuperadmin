<script setup>
import { ref, onMounted, nextTick } from "vue";

import { useRoute, useRouter } from "vue-router";

import {
  Button,
  IconField,
  InputIcon,
  InputText,
  Paginator,
  useToast,
} from "primevue";
import { FilterMatchMode } from "@primevue/core/api";
import Dropdown from "primevue/dropdown";
import ThemeDatatable from "../common/ThemeDatatable/ThemeDatatable.vue";
import Pagination from "../common/Pagination/Pagination.vue";

const ordersData = ref([]);
const loading = ref(true);
const error = ref(null);
const statusBtn = ref(1);
const router = useRouter();
const toast = useToast();
const rowsPerPageDropdown = ref([]);

const pagination = ref({
  currentPage: 1,
  lastPage: 0,
  perPage: 20,
  total: 0,
  firstPageUrl: null,
  lastPageUrl: null,
  nextPageUrl: null,
  prevPageUrl: null,
  links: [],
});

const handleFetchVendor = (id, page) => {
  fetchData(id, page);
  statusBtn.value = id;
};

const ORDER_TYPES = {
  1: "One-time",
  2: "Reoccurring",
};

const fetchData = async (id, page, perPage = 20) => {
  console.log(id, page, "id and page");
};

const handleClickToDetails = (id, type) => {};

const selectedCompany = ref();

const statusOptions = ["All", "Active", "Pending", "Cancelled"];
const columns = ref([
  { field: "id", header: "ID" },
  { field: "organizationName", header: ["Organisation ", "Name ID"] },
  { field: "description", header: "Description" },
  {
    field: "vertical",
    header: "Verticals",
    icon: "chevron-down.svg",
    iconWidth: 14,
    iconHeight: 14,
  },
  { field: "expectedStartDate", header: ["Expected ", " Start Date"] },
  { field: "expectedEndDate", header: ["Expected ", " End Date"] },
  { field: "noOfDays", header: ["No. of ", "Days"] },
  { field: "type", header: "Type" },
  { field: "offers", header: "Offers" },
  {
    field: "chats",
    header: "Chats",
    icon: "info-circle.svg",
    iconWidth: 20,
    iconHeight: 20,
  },
  { field: "surveyRequest", header: ["Survey ", "Request"] },
  { field: "actions", header: "Action" },
]);

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "organizationName.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "vertical.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const getStatusClass = (status) => {
  switch (status) {
    case "Active":
      return { backgroundColor: "#D6FFEF", color: "#00995C" }; // Green
    case "Deactivated":
      return { backgroundColor: "#E7E7EB", color: "#0E0D35" }; // Yellow
    case "Inactive":
      return { backgroundColor: "#E7E7EB", color: "#575672" }; // Red
    case "Monitory":
      return { backgroundColor: "#FCEED9", color: "#DC8B13" }; // Red
    case "Banned":
      return { backgroundColor: "#FFE5E5", color: "#FF5555" }; // Red
    default:
      return { backgroundColor: "#f1f1f1", color: "#000" }; // Default Gray
  }
};

const updateStatus = async (data) => {};

onMounted(() => {
  nextTick(() => {
    fetchData(1, 1);
  });
});
const handlePerPage = async (props) => {
  fetchData(statusBtn.value, props[0], props[1]);
};
const typeClasses = {
  "One-time": "!text-accent-green !bg-green-200",
  Reoccurring: "!text-accent-green !bg-green-200",
  "Hot Orders": "!text-light-orange !bg-blush-100",
};
</script>

<template>
  <div class="row my-4 flex">
    <div class="p-4 bg-white rounded-3 shadow relative">
      <ThemeDatatable
        :value="ordersData"
        v-model:selection="selectedCompany"
        v-model:filters="filters"
        :filterFields="[
          'id',
          'organizationName.name',
          'description',
          'vertical.name',
        ]"
        :columns="columns"
        :paginator="true"
        :rows="pagination.perPage"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :totalRecords="pagination.total"
        :totalPageCount="pagination.lastPage"
        :currentPage="pagination.currentPage"
      >
        <template #header>
          <div class="flex justify-end items-center mb-2">
            <div class="flex gap-3">
              <div class="flex justify-end">
                <IconField>
                  <InputText
                    v-model="filters['global'].value"
                    placeholder="Search"
                    class="!bg-[#F2F4FB] border-0 min-w-[20rem] px-3 py-2.5"
                  />
                  <InputIcon>
                    <i class="fas fa-search"></i>
                  </InputIcon>
                </IconField>
              </div>
              <div class="flex items-center">
                <button class="btn btn-light bg-white border-0">
                  Filters by <i class="fas fa-filter"></i>
                </button>
                <span class="border-start mx-2" style="height: 24px"></span>
                <button class="btn btn-light bg-white border-0">
                  Columns <i class="fas fa-columns"></i>
                </button>
              </div>
            </div>
          </div>
        </template>
      </ThemeDatatable>

      <Paginator :rows="pagination.perPage" :totalRecords="pagination.total">
        <template
          #container="{
            first,
            last,
            page,
            pageCount,
            rows,
            firstPageCallback,
            lastPageCallback,
            rowChangeCallback,
            prevPageCallback,
            nextPageCallback,
            totalRecords,
          }"
        >
          <Pagination
            :first="first"
            :last="last"
            :page="page"
            :pageCount="pageCount"
            :rows="rows"
            :firstPageCallback="firstPageCallback"
            :lastPageCallback="lastPageCallback"
            :rowChangeCallback="rowChangeCallback"
            @perPageClick="(cPage, perPage) => handlePerPage(cPage, perPage)"
            :prevPageCallback="prevPageCallback"
            @nextPageClick="(page) => fetchData(statusBtn, page)"
            :nextPageCallback="nextPageCallback"
            :totalRecords="totalRecords"
            :perPage="pagination.perPage"
            :totalEntries="pagination.total"
          />
          <!-- <div class="flex gap-4 justify-between items-center w-full">
                        <Button icon="pi pi-chevron-left" rounded text @click="prevPageCallback" :disabled="page === 0" />
                        <div class="text-color font-medium">
                            <span class="hidden sm:block">Showing {{ first }} to {{ last }} of {{ totalRecords }} Entries</span>
                        </div>
                        <div class="">
                            <button type="button"><i class="fa fa-chevron-right"></i>left</button>
                        </div>
                        <Button icon="pi pi-chevron-right" rounded text @click="nextPageCallback" :disabled="page === pageCount - 1" />
                    </div> -->
        </template>
      </Paginator>
    </div>
  </div>
</template>
