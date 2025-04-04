<script setup>
import { ref, onMounted, nextTick, onUnmounted, computed } from "vue";

import { useRoute, useRouter } from "vue-router";

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
import ThemeDatatable from "../../components/common/ThemeDatatable/ThemeDatatable.vue";
import Pagination from "../../components/common/Pagination/Pagination.vue";
import { useCompanyStore } from "../../store";
import CompanyHeader from "../../components/CompanyHeader.vue";

const store = useCompanyStore();
// const companiesData = ref([]);
const loading = ref(true);
const error = ref(null);
const statusBtn = ref(1);
const router = useRouter();
const route = useRoute();
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

const handleClickToDetails = () => {
  const companyId = route.params.companyId;
  if (companyId) {
    router.push({
      path: `/super-admin/company-details/${companyId}/employees/details`,
    });
  }
};

const handleFetchOrder = (id, page) => {
  fetchData(id, 1);
  statusBtn.value = id;
};

const selectedCompany = ref();

const statusOptions = ["All", "Active", "Pending", "Cancelled"];
const columns = ref([
  { field: "id", header: "ID" },
  { field: "employeeName", header: "Employee Name" },
  { field: "role", header: "Role" },
  {
    field: "vertical",
    header: "Assign Vertical",
    icon: "chevron-down.svg",
    iconWidth: 14,
    iconHeight: 14,
  },
  { field: "status", header: "Status" },
  { field: "contact", header: ["Contact/ ", "Email"] },
  { field: "currentWork", header: ["Current Work ", "Status"] },
  { field: "projectDetail", header: "Project Details" },
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

const getWorkStatusClass = (status) => {
  switch (status) {
    case "Occupied":
      return "!text-accent-green !bg-green-200";
    case "Site Survey":
      return "!text-accent-green !bg-green-200";
    case "Available":
      return "!text-accent-green !bg-green-200";
    default:
      return "!text-accent-green !bg-green-200";
  }
};

const updateStatus = async (data) => {};

const companiesData = ref([
  {
    id: 1,
    employeeName: { name: "John Doe", image: "Avatar.png" },
    role: "Software Engineer",
    vertical: 44,
    status: "Active",
    contact: { phone: "+1234567890", email: "john.doe@example.com" },
    currentWork: "Occupied",
    projectDetail: {
      name: "Business Setup",
      client: "Client Name",
      end_date: "11/02.2023",
      image: "Avatar.png",
    },
  },
  {
    id: 2,
    employeeName: { name: "Jane Smith", image: "Avatar.png" },
    role: "Product Manager",
    vertical: 23,
    status: "Active",
    contact: { phone: "+9876543210", email: "jane.smith@example.com" },
    currentWork: "Site Survey",
    projectDetail: {
      name: "Business Setup",
      client: "Client Name",
      end_date: "11/02.2023",
      image: "Avatar.png",
    },
  },
  {
    id: 3,
    employeeName: { name: "Alice Johnson", image: "Avatar.png" },
    role: "Data Scientist",
    vertical: 33,
    status: "Active",
    contact: { phone: "+1928374650", email: "alice.johnson@example.com" },
    currentWork: "Occupied",
    projectDetail: {
      name: "Business Setup",
      client: "Client Name",
      end_date: "11/02.2023",
      image: "Avatar.png",
    },
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
  return new URL(`../../assets/images2/${imagePath}`, import.meta.url).href;
};

const getImageIcon = (imagePath) => {
  return new URL(`../../assets/image/icons/${imagePath}`, import.meta.url).href;
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
    <div>
      <CompanyHeader />
    </div>

    <div class="p-4 bg-white rounded-3 shadow relative">
      <ThemeDatatable
        :value="companiesData"
        v-model:selection="selectedCompany"
        v-model:filters="filters"
        :filterFields="['id', 'companyName.name', 'description', 'verticals']"
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
                :class="`btn rounded-3 px-3 py-2 active:bg-primary !font-semibold ${
                  statusBtn === 'All' ? 'bg-primary text-white' : 'btn-light'
                }`"
              >
                All
              </button>
              <button
                @click="handleFetchOrder('Support')"
                :class="`btn rounded-3 px-3 py-2 active:bg-primary !font-semibold ${
                  statusBtn === 'Active' ? 'bg-primary text-white' : 'btn-light'
                }`"
              >
                Support
              </button>
              <button
                @click="handleFetchOrder('Admin')"
                :class="`btn rounded-3 px-3 py-2 active:bg-primary !font-semibold ${
                  statusBtn === 'Inactive'
                    ? 'bg-primary text-white'
                    : 'btn-light'
                }`"
              >
                Admin
              </button>
              <button
                @click="handleFetchOrder('Manager')"
                :class="`btn rounded-3 px-3 py-2 active:bg-primary !font-semibold ${
                  statusBtn === 'Monitory'
                    ? 'bg-primary text-white'
                    : 'btn-light'
                }`"
              >
                Manager
              </button>
              <button
                @click="handleFetchOrder('Associates')"
                :class="`btn rounded-3 px-3 py-2 active:bg-primary !font-semibold ${
                  statusBtn === 'Monitory'
                    ? 'bg-primary text-white'
                    : 'btn-light'
                }`"
              >
                Associates
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

        <template #id="{ data }">
          <span>{{ data.id }}</span>
        </template>

        <template v-slot:employeeName="{ data }">
          <div class="flex items-center gap-2">
            <img
              :src="getImageUrl(data.employeeName.image)"
              alt="Employee Image"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />
            <span class="font-semibold text-dm-blue">{{
              data.employeeName.name
            }}</span>
          </div>
        </template>

        <template #role="{ data }">
          <span class="font-semibold text-gray-800">{{ data.role }}</span>
        </template>

        <template #vertical="{ data }">
          <div class="inline-block !bg-lavender !py-[2px] !px-1 rounded-md">
            <span class="font-semibold text-dm-blue">{{ data.vertical }}</span>
          </div>
        </template>

        <template #contact="{ data }">
          <div>
            <span class="block font-semibold text-gray-800">{{
              data.contact.phone
            }}</span>
            <span class="!text-vivid-purple font-semibold">{{
              data.contact.email
            }}</span>
          </div>
        </template>

        <template #currentWork="{ data }">
          <Dropdown
            v-model="data.currentWork"
            :options="['Occupied', 'Site Survey', 'Available']"
            @change="updateStatus(data)"
            :class="[
              'p-dropdown-sm !font-semibold',
              getWorkStatusClass(data.status),
            ]"
          >
            <template #dropdownicon>
              <img
                :src="getImageIcon('chevron-down.svg')"
                alt="Employee Image"
                class="w-2.5 h-2 rounded-xl object-cover"
              />
            </template>
          </Dropdown>
        </template>

        <template #projectDetail="{ data }">
          <div class="flex items-center gap-2">
            <img
              :src="getImageUrl(data.projectDetail.image)"
              alt="Project Image"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />
            <div class="">
              <span class="!font-semibold">
                {{ data.projectDetail.name }}
              </span>
              <div class="!text-neutral-70 !text-sm">
                <span class="">
                  {{ data.projectDetail.client }}
                </span>
                -
                <span class="">
                  {{ data.projectDetail.end_date }}
                </span>
                <button class="!text-vivid-purple !text-sm font-semibold">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </template>

        <template #status="{ data }">
          <Dropdown
            v-model="data.status"
            :options="statusOptions"
            @change="updateStatus(data)"
            :style="getStatusClass(data.status)"
            class="p-dropdown-sm !font-semibold"
            ><template #dropdownicon>
              <img
                :src="getImageIcon('chevron-down.svg')"
                alt="Employee Image"
                class="w-2.5 h-2 rounded-xl object-cover"
              /> </template
          ></Dropdown>
        </template>

        <template #actions="{ data }">
          <div class="flex gap-2">
            <button
              class="border border-primary p-2 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="handleClickToDetails(data?.id)"
            >
              <i class="fa-regular fa-eye text-primary"></i>
            </button>
            <button
              class="border border-primary p-2 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="handleDelete(data?.id)"
            >
              <i class="fa-regular fa-trash-can text-primary"></i>
            </button>
            <button
              class="border border-primary p-2 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="copyUrl(data?.id)"
            >
              <i class="fa-regular fa-share-from-square text-primary"></i>
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
