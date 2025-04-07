<template>
  <article class="user-profile">
    <ProfileHeader />
    <ProfileTabs />
  </article>
  <div class="p-4 bg-white-100 !rounded-2xl relative">
    <ThemeDatatable
      :value="appointmentData"
      v-model:selection="selectedCompany"
      v-model:filters="filters"
      :filterFields="['id', 'companyName.name']"
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
                { label: 'In Progress', value: 2 },
                { label: 'Schedule', value: 3 },
                { label: 'Completed', value: 4 },
              ]"
              @update:statusBtn="handleFetchOrder"
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

      <template #id="{ data }">
        <span>{{ data.id }}</span>
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
      <template v-slot:company="{ data }">
        <div class="flex items-center gap-2">
          <img
            :src="getImageUrl(data.company.image)"
            alt="Employee Image"
            class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
          />
          <span class="font-semibold text-dm-blue">{{
            data.company.name
          }}</span>
        </div>
      </template>
      <template #contact="{ data }">
        <div>
          <span class="block font-semibold text-gray-800">{{
            data.contact.phone
          }}</span>
        </div>
      </template>
      <template v-slot:manager="{ data }">
        <div class="flex items-center gap-2">
          <img
            :src="getImageUrl(data.manager.image)"
            alt="Employee Image"
            class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
          />
          <span class="font-semibold text-dm-blue">{{
            data.manager.name
          }}</span>
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

      <template #delivery_date="{ data }">
        <div class="bg-white font-semibold !text-rich-navy relative group">
          <span class="whitespace-nowrap overflow-hidden text-ellipsis block">
            {{ data.delivery_date }}
          </span>
        </div>
      </template>
      <template #status="{ data }">
        <div
          :style="getStatusClass(data.status)"
          class="px-2 py-1 rounded-lg font-semibold whitespace-nowrap"
        >
          {{ data.status }}
        </div>
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
</template>

<script setup>
import ProfileHeader from "../../../components/ProfileHeader.vue";
import ProfileTabs from "../../../components/ProfileTabs.vue";
import { useRoute, useRouter } from "vue-router";
import Dropdown from "primevue/dropdown";
import { FilterMatchMode } from "@primevue/core/api";
import SearchAndFilter from "../../../components/common/SearchAndFilter/SearchAndFilter.vue";
import StatusButtons from "../../../components/common/StatusButtons/StatusButtons.vue";
const route = useRoute();
const companyId = computed(() => route.query.companyId);

import { computed, nextTick, onMounted, ref } from "vue";
import Pagination from "../../../components/common/Pagination/Pagination.vue";
import { Paginator, useToast } from "primevue";
import ThemeDatatable from "../../../components/common/ThemeDatatable/ThemeDatatable.vue";

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

const handleClickToDetails = () => {
  const companyId = route.params.companyId;
  if (companyId) {
    router.push({
      path: `/super-admin/company-details/${companyId}/employees/appointment/details`,
    });
  }
};

const handleFetchOrder = (id, page) => {
  fetchData(id, 1);
  statusBtn.value = id;
};

const selectedCompany = ref();

const statusOptions = ["All", "On-Location", "Waiting", "Cancelled"];
const columns = ref([
  { field: "id", header: "ID" },
  { field: "description", header: "Title & Description" },
  { field: "company", header: "Company Name" },
  { field: "manager", header: "Manager" },
  { field: "contact", header: "Contact" },
  {
    field: "vertical",
    header: "Vertical",
    icon: "chevron-down.svg",
    iconWidth: 10,
    iconHeight: 10,
  },
  { field: "delivery_date", header: ["Expected ", "Delivery Date & Time"] },
  { field: "status", header: "Status" },
  { field: "actions", header: "Action" },
]);

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "company.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const getStatusClass = (status) => {
  switch (status) {
    case "On-Location":
      return { backgroundColor: "#D6FFEF", color: "#00995C" }; // Green
    case "":
      return { backgroundColor: "#E7E7EB", color: "#0E0D35" }; // Yellow
    case "Waiting":
      return { backgroundColor: "#E7E7EB", color: "#575672" }; // Red
    case "Cancelled":
      return { backgroundColor: "#FCEED9", color: "#DC8B13" }; // Red

    default:
      return { backgroundColor: "#f1f1f1", color: "#000" }; // Default Gray
  }
};

const updateStatus = async (data) => {};

onMounted(() => {
  nextTick(() => {
    console.log("Hardcoded data loaded:", appointmentData.value);
  });
});

onMounted(() => {
  nextTick(() => {
    fetchData(1, 1);
  });
});

const getImageUrl = (imagePath) => {
  return new URL(`../../../assets/images2/${imagePath}`, import.meta.url).href;
};

const getImageIcon = (imagePath) => {
  return new URL(`../../../assets/image/icons/${imagePath}`, import.meta.url)
    .href;
};

const appointmentData = ref([
  {
    id: "OFC 001",
    manager: { name: "John Doe", image: "Avatar.png" },
    company: { name: "Big Kahuna Ltd.", image: "Avatar.png" },
    vertical: { name: "Event Management", image: "Avatar.png" },
    description: "Need business consultant for my startup",
    managerImage: "Avatar (5).png",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "On-Location",
    verticalSubscribed: 16,
    delivery_date: "2020-05-17, 10:00 AM",
    contact: { phone: "(239) 555-0108", email: "alice.johnson@example.com" },
  },
  {
    id: "OFC 002",
    manager: { name: "John Doe", image: "Avatar.png" },
    company: { name: "Big Kahuna Ltd.", image: "Avatar.png" },
    vertical: { name: "Event Management ", image: "Avatar.png" },
    description: "Need business consultant for my startup",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "On-Location",
    verticalSubscribed: 23,
    delivery_date: "2020-05-17, 10:00 AM",

    contact: { phone: "(239) 555-0108", email: "alice.johnson@example.com" },
  },
]);
</script>

<style scoped>
.user-profile {
  border-radius: 16px;
  background-color: #fcfdff;
  font-family: Averta, sans-serif;
  padding: 22px 22px 0;
  width: 100%;
  margin-bottom: 20px;
}
</style>
