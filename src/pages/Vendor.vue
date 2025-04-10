<script setup>
import { ref, onMounted, nextTick, onUnmounted, computed, watch } from "vue";
import api from "../api";
// import DataTable from "datatables.net-bs5";
import {
  convertUserData,
  debounce,
  getStatusId,
  transformData,
} from "../utils/helper";
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
import Loader from "../components/common/Loader/Loader.vue";

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
const searchTerm = ref("");

const getImagePath = (imageName) => {
  return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};
const getImageIcon = (imageName) => {
  return new URL(`../assets/image/icons/${imageName}`, import.meta.url).href;
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

const fetchData = async (id, page, perPage = null, search = "") => {
  loading.value = true;
  try {
    let url = `/superadmin/dashboard?status=${id}&page=${page}&search=${search}`;
    if (perPage) {
      url = `/superadmin/dashboard?status=${id}&page=${page}&per_page=${perPage}`;
    }
    if (perPage && search !== "") {
      url = `/superadmin/dashboard?status=${id}&page=${page}&per_page=${perPage}&search=${search}`;
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
        number: response.data.stats[item.key],
      }));
      pagination.value = {
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
        perPage: response.data.per_page,
        total: response.data.total,
        firstPageUrl: response.data.first_page_url,
        lastPageUrl: response.data.last_page_url,
        nextPageUrl: response.data.next_page_url,
        prevPageUrl: response.data.prev_page_url,
        links: response.data.links,
      };
      toast.add({
        severity: "success",
        summary: "Success",
        detail: response?.data?.message,
        life: 3000,
      });
      companiesData.value = data?.map((item) => convertUserData(item));
      store.setCompanies(transformData(data));
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error("Error in fetchData:", err);
  } finally {
    loading.value = false;
  }
};

const handleClickToDetails = (id) => {
  router.push("/super-admin/company-details/" + id + "/info");
};

const debouncedFetch = debounce((val) => {
  fetchData(statusBtn.value, 1, null, val);
}, 500);

watch(
  () => searchTerm.value,
  (newVal, oldValue) => {
    console.log(newVal, oldValue, "newVal and oldValue");
    debouncedFetch(newVal);
  }
);

const handleFetchVendor = (id, page) => {
  searchTerm.value = "";
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
  { field: "companyName", header: "Organization Name", class: "w-48" },
  { field: "fullName", header: "Full Name" },
  { field: "role", header: "Role" },
  { field: "contact", header: ["Contact /", "Email"], class: "w-52" },
  { field: "totalRevenue", header: ["Total Revenue ", "Generated"] },
  { field: "totalSpending", header: ["Total ", "Spending"] },
  { field: "status", header: "Status" },
  {
    field: "verticalsSubscribed",
    header: ["List of Verticals ", "Subscribed"],
    class: "w-32",
  },
  {
    field: "registeredOn",
    header: ["Registered ", "on DE Date"],
    class: "w-32",
  },
  { field: "actions", header: "Action" },
]);

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
      searchTerm.value = "";
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
      fetchData(statusBtn.value, 1, null, searchTerm.value);
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error(err);
  }
};

const handlePerPage = async (props) => {
  fetchData(statusBtn.value, props[0], props[1], searchTerm.value);
};

onMounted(() => {
  nextTick(() => {
    fetchData(1, 1);
  });
});
</script>

<template>
  <Loader v-if="loading" />
  <div v-else>
    <div class="flex justify-between items-center mb-4">
      <div class="text-xl font-semibold text-rich-navy m-0">Vendor</div>
      <div class="fs-4">
        <button
          class="theme-button-primary bg-mix-gradient !border-none !py-3 !px-9 !font-bold !text-base !rounded-lg"
        >
          Add Vendor
        </button>
      </div>
    </div>

    <div class="row mb-4" id="dashboard-stats">
      <div
        v-for="(stat, index) in dashboardStats"
        :key="index"
        class="col-md-3"
      >
        <div class="bg-white border-0 px-4 py-6 rounded-xl">
          <div class="font-semibold border-bottom-0 mt-1 text-lg">
            {{ stat.title }}
            <img class="float-end" :src="getImagePath('Frame 48096300.png')" />
          </div>
          <div class="card-body flex justify-between mt-4">
            <div class="w-full">
              <div class="flex justify-between items-center mb-1">
                <p class="text-4xl text-dm-blue font-bold m-0">
                  {{ stat.number }}
                </p>
                <div
                  v-if="stat.percentage"
                  class="self-center text-sm px-3 py-1 rounded font-bold text-center"
                  :style="{
                    backgroundColor: stat.percentageColor || '#fff',
                    color: stat.textColor,
                  }"
                >
                  {{ stat.percentage }}
                </div>
              </div>
              <p class="text-grayColor text-base font-normal m-0">
                {{ stat.timePeriod }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 bg-white-100 !rounded-2xl relative">
      <ThemeDatatable
        :value="companiesData"
        v-model:selection="selectedCompany"
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
              <button
                class="primary-btn px-4 py-3 bg-gradient-aqua-lavender relative"
              >
                <img
                  src="../assets/image/icons/star-1.svg"
                  alt="star icon"
                  class="w-4 h-4 absolute -top-2 z-10 left-1"
                />
                <img
                  src="../assets/image/icons/star-2.svg"
                  alt="star icon"
                  class="w-5 h-5 absolute top-1 -left-1"
                />
                <span class="font-semibold text-base text-dm-blue"
                  >Newbies</span
                >
                <img
                  src="../assets/image/icons/star-1.svg "
                  alt="star icon"
                  class="w-4 h-4 absolute -top-2 right-1"
                />
                <img
                  src="../assets/image/icons/star-2.svg"
                  alt="star icon"
                  class="w-4 h-4 absolute -right-1 top-1 rotate-[62deg]"
                />
              </button>
            </div>
            <div class="flex gap-3 items-center w-full col-span-4">
              <SearchAndFilter v-model="searchTerm" placeholder="Search" />
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
            <span class="font-semibold text-dm-blue text-sm">{{
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
            <span class="font-semibold text-dm-blue text-sm">{{
              data.fullName.name
            }}</span>
          </div>
        </template>

        <template #role="{ data }">
          <span class="font-semibold text-sm text-dm-blue">{{
            data.role
          }}</span>
        </template>

        <template #contact="{ data }">
          <div class="flex flex-col flex-wrap gap-0 text-sm">
            <span class="font-semibold text-dm-blue">{{
              data.contact.mobile
            }}</span>
            <span class="text-primary font-semibold line-clamp-1">{{
              data.contact.email
            }}</span>
          </div>
        </template>

        <template #totalRevenue="{ data }">
          <div class="flex gap-2 items-center">
            <span class="text-primary font-semibold text-sm">AED</span>
            <span class="text-xl font-bold">{{ data.totalRevenue ?? 0 }}</span>
          </div>
        </template>

        <template #totalSpending="{ data }">
          <div class="flex gap-2 items-center">
            <span class="text-primary font-semibold text-sm">AED</span>
            <span class="text-xl font-bold">{{ data.totalSpending ?? 0 }}</span>
          </div>
        </template>

        <template #status="{ data }">
          <Dropdown
            v-model="data.status"
            :options="statusOptions"
            @change="updateStatus(data)"
            :style="getStatusClass(data.status)"
            class="p-dropdown-sm font-bold"
          >
            <template #dropdownicon>
              <img
                :src="getImageIcon('chevron-down.svg')"
                class="w-2.5 h-2.5"
              />
            </template>
          </Dropdown>
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
              class="border border-primary w-8 h-8 !rounded-[10px] bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="handleClickToDetails(data?.id)"
            >
              <img
                src="../assets/image/icons/eye-2.svg"
                alt="eye-icon"
                class="w-4.5 h-4.5"
              />
            </button>
            <button
              class="border border-primary w-8 h-8 !rounded-[10px] bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="handleDelete(data?.id)"
            >
              <img
                src="../assets/image/icons/trash.svg"
                alt="trash-icon"
                class="w-4 h-4"
              />
            </button>
            <button
              class="border border-primary w-8 h-8 !rounded-[10px] bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="copyUrl(data?.id)"
            >
              <img
                src="../assets/image/icons/share.svg"
                alt="share-icon"
                class="w-4.5 h-4.5"
              />
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
