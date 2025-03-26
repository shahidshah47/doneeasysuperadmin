<script setup>
import { ref, onMounted, nextTick, onUnmounted, computed } from "vue";
import api from "../api";
// import DataTable from "datatables.net-bs5";
import { convertUserData, getStatusId, transformData } from "../utils/helper";
import { useRoute, useRouter } from "vue-router";
import { useCompanyStore } from "../store";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
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
import ThemeDatatable from "../components/common/ThemeDatatable/ThemeDatatable.vue";
import Pagination from "../components/common/Pagination/Pagination.vue";

const store = useCompanyStore();
// const companiesData = ref([]);
const loading = ref(true);
const error = ref(null);
const statusBtn = ref(1);
const router = useRouter();
const toast = useToast();
const vendorRes = ref(null);
const rowsPerPageDropdown = ref([]);
const pagination = ref({
  currentPage: 0,
  lastPage: 0,
  perPage: 0,
  total: 0,
  firstPageUrl: null,
  lastPageUrl: null,
  nextPageUrl: null,
  prevPageUrl: null,
  links: [],
});

const fetchData = async (id, page) => {
  console.log(id, page, "id and page");
};

const handleClickToDetails = (id, type) => {
  if (type === "Hot Orders") {
    router.push("/super-admin/order/" + id + "/details/hot-orders");
  } else {
    router.push("/super-admin/order/" + id + "/details");
  }
};

const handleFetchOrder = (id, page) => {
  fetchData(id, 1);
  statusBtn.value = id;
};

const selectedCompany = ref();

const statusOptions = [
  "Active",
  "Deactivated",
  "Inactive",
  "Monitory",
  "Banned",
];
const columns = ref([
  { field: "id", header: "ID" },
  { field: "companyName", header: ["Organisation ", "Name ID"] },
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
  { field: "noOfDays", header: ["Expected ", "Days"] },
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
  "companyName.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
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

const companiesData = ref([
  {
    id: 1,
    companyName: { name: "TechCorp", logo: "Avatar.png" },
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
    vertical: { name: "Software", image: "Avatar.png" },
    expectedStartDate: "2024-07-10",
    expectedEndDate: "2025-07-10",
    noOfDays: 365,
    type: "One-time",
    offers: "20",
    chats: 15,
    surveyRequest: 3,
    status: "Active",
  },
  {
    id: 2,
    companyName: { name: "HealthPlus", logo: "Avatar.png" },
    description: "Healthcare solutions provider",
    vertical: { name: "Software", image: "Avatar.png" },
    expectedStartDate: "2024-08-01",
    expectedEndDate: "2025-08-01",
    noOfDays: 365,
    type: "Reoccurring",
    offers: "250",
    chats: 8,
    surveyRequest: 2,
    status: "Inactive",
  },
  {
    id: 3,
    companyName: { name: "EduSmart", logo: "Avatar.png" },
    description: "E-learning platform",
    vertical: { name: "Software", image: "Avatar.png" },
    expectedStartDate: "2024-09-15",
    expectedEndDate: "2025-09-15",
    noOfDays: 365,
    type: "Hot Orders",
    offers: "300",
    chats: 20,
    surveyRequest: 5,
    status: "Monitory",
  },
]);

onMounted(() => {
  nextTick(() => {
    console.log("Hardcoded data loaded:", companiesData.value);
  });
});

onMounted(() => {
  nextTick(() => {
    fetchData(1, 1);
  });
});

const getImageUrl = (imagePath) => {
  return new URL(`../assets/images2/${imagePath}`, import.meta.url).href;
};

const handleNextPage = (page) => {
  console.log(page, "page");
};

const typeClasses = {
  "One-time": "!text-accent-green !bg-green-200",
  Reoccurring: "!text-accent-green bg-green-200",
  "Hot Orders": "!text-light-orange bg-blush-100",
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <div class="fs-4 fw-bold">Order</div>
    </div>

    <div class="p-4 bg-white rounded-3 shadow relative">
      <ThemeDatatable
        :value="companiesData"
        v-model:selection="selectedCompany"
        v-model:filters="filters"
        :filterFields="[
          'id',
          'companyName.name',
          'description',
          'verticals',
          'expectedStartDate',
          'expectedEndDate',
          'noOfDays',
          'type',
          'offers',
          'chats',
          'surveyRequest',
          'status',
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
          <div class="flex justify-between items-center mb-2">
            <div class="flex gap-3">
              <button
                @click="handleFetchOrder('All')"
                :class="`btn rounded-3 px-3 py-2 active:bg-primary ${
                  statusBtn === 'All' ? 'bg-primary text-white' : 'btn-light'
                }`"
              >
                All
              </button>
              <button
                @click="handleFetchOrder('Active')"
                :class="`btn rounded-3 px-3 py-2 active:bg-primary ${
                  statusBtn === 'Active' ? 'bg-primary text-white' : 'btn-light'
                }`"
              >
                Active
              </button>
              <button
                @click="handleFetchOrder('Inactive')"
                :class="`btn rounded-3 px-3 py-2 active:bg-primary ${
                  statusBtn === 'Inactive'
                    ? 'bg-primary text-white'
                    : 'btn-light'
                }`"
              >
                Inactive
              </button>
              <button
                @click="handleFetchOrder('Monitory')"
                :class="`btn rounded-3 px-3 py-2 active:bg-primary ${
                  statusBtn === 'Monitory'
                    ? 'bg-primary text-white'
                    : 'btn-light'
                }`"
              >
                Monitory
              </button>
            </div>
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
            </div>
          </div>
        </template>

        <template #id="{ data }"
          ><span>{{ data.id }}</span></template
        >

        <template v-slot:companyName="{ data }">
          <div class="flex items-center gap-2">
            <img
              :src="getImageUrl(data.companyName.logo)"
              alt="Company Logo"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />
            <span class="font-semibold text-dm-blue">{{
              data.companyName.name
            }}</span>
          </div>
        </template>

        <template #description="{ data }">
          <div class="bg-white font-semibold !text-rich-navy relative group">
            <span
              class="whitespace-nowrap overflow-hidden text-ellipsis block w-40"
            >
              {{
                data.description.length > 30
                  ? data.description.slice(0, 30) + "..."
                  : data.description
              }}
            </span>
            <div
              class="absolute left-1/2 -top-20 transform -translate-x-1/2 w-max max-w-sm p-3 bg-white-100 !text-rich-navy border shadow-lavendar-card rounded hidden group-hover:block z-50"
              style="white-space: normal; overflow: visible"
            >
              {{ data.description }}
            </div>
          </div>
        </template>

        <template v-slot:vertical="{ data }">
          <div class="flex items-center gap-2">
            <img
              :src="getImageUrl(data.vertical.image)"
              alt="Vertical Image"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />
            <span class="font-semibold text-dm-blue">
              {{ data.vertical.name }}
            </span>
          </div>
        </template>

        <template #expectedStartDate="{ data }">
          <span>{{
            new Date(data.expectedStartDate).toLocaleDateString()
          }}</span>
        </template>

        <template #expectedEndDate="{ data }">
          <span>{{ new Date(data.expectedEndDate).toLocaleDateString() }}</span>
        </template>

        <template #noOfDays="{ data }">
          <span class="font-semibold">{{ data.noOfDays }}</span>
        </template>

        <template #type="{ data }">
          <span
            class="font-semibold px-2 py-1 rounded"
            :class="typeClasses[data.type] || 'text-gray-600 bg-gray-200'"
          >
            {{ data.type }}
          </span>
        </template>
        <template #offers="{ data }">
          <span class="!font-semibold !text-rich-navy">{{ data.offers }}</span>
        </template>

        <template #chats="{ data }">
          <span class="!font-semibold !text-rich-navy">{{ data.chats }}</span>
        </template>

        <template #surveyRequest="{ data }">
          <span class="!font-semibold !text-rich-navy">{{
            data.surveyRequest
          }}</span>
        </template>

        <template #status="{ data }">
          <Dropdown
            v-model="data.status"
            :options="statusOptions"
            @change="updateStatus(data)"
            :style="getStatusClass(data.status)"
            class="p-dropdown-sm font-bold"
          ></Dropdown>
        </template>

        <template #actions="{ data }">
          <div class="flex gap-2">
            <button
              class="border border-primary p-2 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="handleClickToDetails(data?.id, data?.type)"
            >
              <i class="fa-regular fa-eye text-primary"></i>
            </button>
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
            :prevPageCallback="prevPageCallback"
            @nextPageClick="(page) => fetchData(statusBtn, page)"
            :nextPageCallback="nextPageCallback"
            :totalRecords="totalRecords"
            :perPage="pagination.perPage"
            :totalEntries="pagination.total"
          />
        </template>
      </Paginator>
    </div>
  </div>
</template>
