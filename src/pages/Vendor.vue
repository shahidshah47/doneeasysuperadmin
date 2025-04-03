<script setup>
import { ref, onMounted, nextTick, onUnmounted, computed } from "vue";
import api from "../api";
// import DataTable from "datatables.net-bs5";
import { convertUserData, getStatusId, transformData } from "../utils/helper";
import { useRoute, useRouter } from "vue-router";
import { useCompanyStore } from "../store";
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
import SearchAndFilter from "../components/common/SearchAndFilter/SearchAndFilter.vue";
import StatusButtons from "../components/common/StatusButtons/StatusButtons.vue";

const store = useCompanyStore();
const companiesData = ref([]);
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

const getImagePath = (imageName) => {
  return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};

const dashboardStats = ref([
  {
    key: "total_vendors",
    title: "Total Vendor",
    number: "16,445",
    percentage: "20%",
    timePeriod: "Lifetime",
    percentageColor: "#D6FFEF",
    textColor: "#00995C",
  },
  {
    key: "total_active_vendors",
    title: "Active Members",
    number: "15,045",
    timePeriod: "Current Month",
  },
  {
    key: "total_new_vendors",
    title: "New Subscribe",
    number: "1,200",
    percentage: "20%",
    timePeriod: "Current Month",
    percentageColor: "#D6FFEF",
    textColor: "#00995C",
  },
  {
    key: "total_inactive_vendors",
    title: "Inactive",
    number: "200",
    percentage: "-12%",
    timePeriod: "Current Month",
    percentageColor: "#FFE5E5",
    textColor: "#FF5555",
  },
]);

const fetchData = async (id, page, perPage = null) => {
  console.log(id, page, "id and page");
  try {
    let url = `/superadmin/dashboard?status=${id}&page=${page}`;
    if (perPage) {
      url = `/superadmin/dashboard?status=${id}&page=${page}&per_page=${perPage}`;
    }
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("token")}`,
      },
    });

    if (response?.status === 200) {
      const { data } = response.data;
      vendorRes.value = data;
      dashboardStats.value = dashboardStats.value.map((item) => ({
        ...item,
        number: data.stats[item.key],
      }));
      pagination.value = {
        currentPage: data.current_page,
        lastPage: data.last_page,
        perPage: data.per_page,
        total: data.total,
        firstPageUrl: data.first_page_url,
        lastPageUrl: data.last_page_url,
        nextPageUrl: data.next_page_url,
        prevPageUrl: data.prev_page_url,
        links: data.links,
      };
      toast.add({
        severity: "success",
        summary: "Success",
        detail: response?.data?.message,
        life: 3000,
      });
      companiesData.value = data?.data?.map((item) => convertUserData(item));
      store.setCompanies(transformData(data.data));
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error("Error in fetchData:", err);
  }
};

const handleClickToDetails = (id) => {
  router.push("/super-admin/company-details/" + id + "/info");
};

const handleFetchVendor = (id, page) => {
  fetchData(id, 1);
  statusBtn.value = id;
};

const selectedCompany = ref();
const copyUrl = (id) => {
  const location = window.location;
  navigator.clipboard.writeText(
    location.origin + "/super-admin/company-details/" + id + "/info"
  );
};

const statusOptions = [
  "Active",
  "Deactivated",
  "Inactive",
  "Monitory",
  "Banned",
];
const columns = ref([
  { field: "id", header: "ID" },
  { field: "companyName", header: "Organization Name" },
  { field: "fullName", header: "Full Name" },
  { field: "role", header: "Role" },
  { field: "contact", header: "Contact / Email" },
  { field: "totalRevenue", header: ["Total Revenue ", "Generated"] },
  { field: "totalSpending", header: ["Total ", "Spending"] },
  { field: "status", header: "Status" },
  {
    field: "verticalsSubscribed",
    header: ["List of Verticals ", "Subscribed"],
    class: "w-40",
  },
  {
    field: "registeredOn",
    header: ["Registered ", "on DE Date"],
    class: "w-32",
  },
  { field: "actions", header: "Action" },
]);

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "companyName.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "fullName.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  role: { value: null, matchMode: FilterMatchMode.CONTAINS },
  contact: { value: null, matchMode: FilterMatchMode.CONTAINS },
  totalRevenue: { value: null, matchMode: FilterMatchMode.GREATER_THAN },
  totalSpending: { value: null, matchMode: FilterMatchMode.GREATER_THAN },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  verticlesSubscribed: { value: null, matchMode: FilterMatchMode.GREATER_THAN },
  registeredOn: { value: null, matchMode: FilterMatchMode.DATE_IS },
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

const handleDelete = async (id) => {
  try {
    const response = await api.post(`/superadmin/del-user`, { user_id: id });
    if (response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: response?.data?.message,
        life: 3000,
      });
      fetchData(statusBtn.value);
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error("Error in fetchData:", err);
  }
};

const updateStatus = async (data) => {
  try {
    const response = await api.post("/superadmin/update-status", {
      user_id: data?.id,
      status: getStatusId(data?.status),
    });
    if (response.status === 200) {
      fetchData(statusBtn.value, 1);
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error(err);
  }
};

const handlePerPage = async (props) => {
  fetchData(statusBtn.value, props[0], props[1]);
};

onMounted(() => {
  nextTick(() => {
    fetchData(1, 1);
  });
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <div class="fs-4 fw-bold">Vendor</div>
      <div class="fs-4">
        <button class="btn btn-primary py-2 px-4">Add Vendor</button>
      </div>
    </div>

    <div class="row mb-4" id="dashboard-stats">
      <div
        v-for="(stat, index) in dashboardStats"
        :key="index"
        class="col-md-3"
      >
        <div class="card border-0 shadow p-2">
          <div class="card-header bg-white fw-bold border-bottom-0 mt-1">
            {{ stat.title }}
            <img class="float-end" :src="getImagePath('Frame 48096300.png')" />
          </div>
          <div class="card-body flex justify-between">
            <div>
              <p class="fs-3 fw-bold mb-0 !text-[3.5rem] leading-24">
                {{ stat.number }}
              </p>
              <p class="fs-6 text-muted">{{ stat.timePeriod }}</p>
            </div>
            <div
              v-if="stat.percentage"
              class="self-center fs-6 p-2 rounded-2 fw-bold text-center ms-2"
              :style="{
                backgroundColor: stat.percentageColor || '#fff',
                color: stat.textColor,
              }"
            >
              {{ stat.percentage }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 bg-white rounded-3 shadow relative">
      <ThemeDatatable
        :value="companiesData"
        v-model:selection="selectedCompany"
        v-model:filters="filters"
        :filterFields="['id', 'companyName.name', 'fullName.name', 'role']"
        :columns="columns"
        :paginator="true"
        :rows="pagination.perPage"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :totalRecords="pagination.total"
        :totalPageCount="pagination.lastPage"
        :currentPage="pagination.currentPage"
      >
        <template #header>
          <div class="grid grid-cols-10 items-center gap-4 mb-6">
            <div class="flex gap-3 col-span-6">
              <StatusButtons
                :statusBtn="statusBtn"
                :buttons="[
                  { label: 'All', value: 1 },
                  { label: 'Approved', value: 2 },
                  { label: 'Pending', value: 3 },
                ]"
                @update:statusBtn="handleFetchVendor"
              />
            </div>
            <div class="flex gap-3 items-center w-full col-span-4">
              <SearchAndFilter
                v-model="filters['global'].value"
                placeholder="Search"
              />
            </div>
          </div>
        </template>

        <template #id="{ data }"
          ><span>{{ data.id }}</span></template
        >

        <template #companyName="{ data }">
          <div class="flex items-center gap-2">
            <img
              :src="data.companyName.logo"
              alt="Company Logo"
              class="xl:min-w-10 xl:max-w-10 xl:min-h-10 xl:max-h-10 md:min-w-8 lg:max-w-8 lg:min-h-8 lg:max-h-8 w-full rounded-xl object-cover"
            />
            <span class="font-semibold text-dm-blue lg:text-xs xl:text-sm">{{
              data.companyName.name
            }}</span>
          </div>
        </template>

        <template #fullName="{ data }">
          <div class="flex items-center gap-2">
            <img
              :src="data.fullName.profilePicture"
              alt="Company Logo"
              class="xl:min-w-10 xl:max-w-10 xl:min-h-10 xl:max-h-10 md:min-w-8 lg:max-w-8 lg:min-h-8 lg:max-h-8 w-full rounded-xl object-cover"
            />
            <span class="font-semibold text-dm-blue lg:text-xs xl:text-sm">{{
              data.fullName.name
            }}</span>
          </div>
        </template>

        <template #role="{ data }">
          <span class="font-semibold lg:text-xs xl:text-sm text-dm-blue">{{
            data.role
          }}</span>
        </template>

        <template #contact="{ data }">
          <div
            class="w-max flex flex-col flex-wrap gap-0 lg:text-xs xl:text-sm"
          >
            <span class="font-semibold text-dm-blue">{{
              data.contact.mobile
            }}</span>
            <span class="text-primary font-semibold">{{
              data.contact.email
            }}</span>
          </div>
        </template>

        <template #totalRevenue="{ data }">
          <div class="flex gap-2 items-center">
            <span class="text-primary font-semibold text-sm">AED</span>
            <span class="text-2xl font-bold">{{ data.totalRevenue ?? 0 }}</span>
          </div>
        </template>

        <template #totalSpending="{ data }">
          <div class="flex gap-2 items-center">
            <span class="text-primary font-semibold text-sm">AED</span>
            <span class="text-2xl font-bold">{{
              data.totalSpending ?? 0
            }}</span>
          </div>
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

        <template #verticalsSubscribed="{ data }">
          <span
            class="px-3 py-2 rounded-xl font-semibold text-[#0E0D35] bg-light-lilac"
            >{{ data.verticalsSubscribed }}</span
          >
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
