<script setup>
import { ref, onMounted, nextTick } from "vue";
import api from "../api";
// import DataTable from "datatables.net-bs5";
import { formatDate } from "../utils/helper";
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
import { toRaw } from "vue";
import { watch } from "vue";
import StatusButtons from "../components/common/StatusButtons/StatusButtons.vue";
import SearchAndFilter from "../components/common/SearchAndFilter/SearchAndFilter.vue";
const store = useCompanyStore();
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
  try {
    let url = `/superadmin/orders?status=${id}&page=${page}&per_page=${perPage}`;

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("token")}`,
      },
    });

    if (response?.status === 200 && response.data) {
      const { data } = response;

      pagination.value = {
        currentPage: data.current_page ?? 1,
        lastPage: data.last_page ?? 1,
        perPage: data.per_page ?? perPage,
        total: data.total ?? 0,
        firstPageUrl: data.first_page_url ?? null,
        lastPageUrl: data.last_page_url ?? null,
        nextPageUrl: data.next_page_url ?? null,
        prevPageUrl: data.prev_page_url ?? null,
        links: data.links ?? [],
      };

      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.message || "Orders retrieved successfully",
        life: 3000,
      });
      ordersData.value = Array.isArray(data.data)
        ? data.data.map((item) => ({
            id: item.id,
            organizationName: {
              name: item.company?.company_name || "N/A",
              logo: item.company?.company_logo?.file_path || "",
            },
            description: item.description || "N/A",
            vertical: {
              name: item.verticle?.name || "",
              logo: item.verticle?.image_path || "",
            },
            expectedStartDate: formatDate(item.start_date),
            expectedEndDate: formatDate(item.end_date),
            noOfDays: item.days_count ?? 0,
            type: ORDER_TYPES[item?.type] || "N/A",
            offers: item.offers_count ?? 0,
            chats: item.chats_count ?? 0,
            surveyRequest: item.contract_duration ?? "N/A",
            status: item.status || "Unknown",
          }))
        : [];
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error("Error in fetchData:", err);
  }
};

const handleClickToDetails = (id, type) => {
  if (type === "Hot Orders") {
    router.push("/super-admin/order/" + id + "/details/hot-orders");
  } else {
    router.push("/super-admin/order/" + id + "/details");
  }
};

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

const getImageUrl = (imagePath) => {
  return new URL(`../assets/images2/${imagePath}`, import.meta.url).href;
};

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
  <div>
    <div class="flex justify-between items-center mb-4">
      <div class="fs-4 fw-bold">Order</div>
    </div>

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
          <div class="grid grid-cols-10 items-center gap-4 mb-6">
            <div class="flex gap-3 col-span-6">
              <StatusButtons
                :statusBtn="statusBtn"
                :buttons="[
                  { label: 'All', value: 1 },
                  { label: 'Approved', value: 2 },
                  { label: 'Cancelled', value: 3 },
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

        <template v-slot:organizationName="{ data }">
          <div class="flex items-center gap-2">
            <img
              :src="data.organizationName.logo"
              alt="Company Logo"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />
            <span class="font-semibold text-dm-blue">{{
              data.organizationName.name
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
              :src="data.vertical.logo"
              alt="Vertical Image"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />
            <span class="font-semibold text-dm-blue">
              {{ data.vertical.name }}
            </span>
          </div>
        </template>

        <template #expectedStartDate="{ data }">
          <span>{{ data.expectedStartDate }}</span>
        </template>

        <template #expectedEndDate="{ data }">
          <span>{{ data.expectedEndDate }}</span>
        </template>

        <template #noOfDays="{ data }">
          <span class="font-semibold">{{ data.noOfDays }}</span>
        </template>

        <template #type="{ data }">
          <span
            class="font-semibold px-2 py-1 rounded"
            :class="typeClasses[data.type]"
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
            class="p-dropdown-sm !font-semibold"
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
