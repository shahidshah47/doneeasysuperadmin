<template>
  <div class="container-fluid company-details">
    <div class="row">
      <!-- Company Info and Stats -->
      <CompanyHeader />
    </div>
    <div class="p-3 mb-1 bg-white rounded-3">
      <ThemeDatatable
        :value="vendorData"
        v-model:selection="selectedSurvey"
        v-model:filters="filters"
        :columns="columns"
        :paginator="true"
        :rows="20"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :totalRecords="120"
        :totalPageCount="6"
      >
        <template #header>
          <div class="grid grid-cols-10 items-center gap-4 mb-6">
            <div class="flex gap-3 col-span-6">
              <StatusButtons
                :statusBtn="statusBtn"
                :buttons="[
                  { label: 'All', value: 1 },
                  { label: 'Pending', value: 2 },
                  { label: 'Schedule', value: 3 },
                  { label: 'Completed', value: 4 },
                ]"
                @update:statusBtn="handleFetchAppointment"
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
          <span class="text-dm-blue font-semibold text-sm">{{ data.id }}</span>
        </template>

        <template #organizationName="{ data }">
          <div class="flex items-center gap-2">
            <img
              :src="getImagePath(data.companyImage)"
              alt="Company Logo"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />

            <span class="text-dm-blue font-semibold text-sm">{{
              data.companyName
            }}</span>
          </div>
        </template>

        <template #description="{ data }">
          <div class="bg-white font-semibold !text-rich-navy relative group">
            <span
              class="whitespace-nowrap overflow-hidden text-ellipsis block w-40 text-dm-blue font-semibold text-sm"
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
              :src="getImagePath(data.vertical.image)"
              alt="Vertical Image"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />
            <span class="text-dm-blue font-semibold text-sm">
              {{ data.vertical.name }}
            </span>
          </div>
        </template>

        <template #orderType="{ data }">
          <p class="text-dm-blue font-semibold text-sm whitespace-nowrap">
            {{ data.orderType }}
          </p>
        </template>

        <template #status="{ data }">
          <div
            :style="getStatusClass(data.status)"
            class="px-2 py-1 rounded-lg font-semibold text-sm whitespace-nowrap inline-block"
          >
            {{ data.status }}
          </div>
        </template>

        <template #date="{ data }">
          <div class="bg-white font-semibold !text-rich-navy relative group">
            <span
              class="whitespace-nowrap overflow-hidden text-ellipsis block text-dark-indigo-100 font-normal text-sm"
            >
              {{ formatCompactDateTime(data.date) }}
            </span>
          </div>
        </template>

        <template #offerValue="{ data }">
          <div class="flex gap-2 items-center">
            <span class="text-primary font-semibold text-sm">AED</span>
            <span class="text-dm-blue font-semibold text-xl">{{
              data.offerValue ?? 0
            }}</span>
          </div>
        </template>

        <template #actions="{ data }">
          <div class="flex gap-2">
            <button
              class="border border-primary w-7 h-7 !rounded-[10px] bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="handleClickToDetails(data?.id)"
            >
              <img
                src="../../assets/image/icons/eye-2.svg"
                alt="eye-icon"
                class="w-4 h-4"
              />
            </button>
            <button
              class="border border-primary w-7 h-7 !rounded-[10px] bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
            >
              <img
                src="../../assets/image/icons/trash.svg"
                alt="eye-icon"
                class="w-4 h-4"
              />
            </button>
            <button
              class="border border-primary w-7 h-7 !rounded-[10px] bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
            >
              <img
                src="../../assets/image/icons/share.svg"
                alt="eye-icon"
                class="w-4 h-4"
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

<script setup>
import { ref } from "vue";
import CompanyHeader from "../../components/CompanyHeader.vue";
import ThemeDatatable from "../../components/common/ThemeDatatable/ThemeDatatable.vue";
import Pagination from "../../components/common/Pagination/Pagination.vue";
import { FilterMatchMode } from "@primevue/core/api";

import { useRoute, useRouter } from "vue-router";
import StatusButtons from "../../components/common/StatusButtons/StatusButtons.vue";
import SearchAndFilter from "../../components/common/SearchAndFilter/SearchAndFilter.vue";
import { formatCompactDateTime, formatDate } from "../../utils/helper";
const selectedSurvey = ref();
const router = useRouter();
const route = useRoute();

const getImagePath = (imageName) => {
  return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};

const handleClickToDetails = (id, type) => {
  const companyId = route.params.companyId;
  if (companyId) {
    router.push({
      path: `/super-admin/company-details/${companyId}/offers/details`,
    });
  }
};

const statusBtn = ref(1);

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

const handleFetchAppointment = (id) => {};

const copyUrl = (id) => {
  const companyId = route.params.companyId;
  if (companyId) {
    router.push({
      path: "/super-admin/company-details/offers/details",
      query: { companyId },
    });
  }
};

const handleDelete = async (id) => {};

const fetchData = async (_id, page = 1) => {};

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

const columns = ref([
  { field: "id", header: "ID" },
  { field: "organizationName", header: ["Organization ", "Name / ID"] },
  { field: "description", header: "Title & Description" },
  {
    field: "orderType",
    header: "Order Type",
    icon: "chevron-down.svg",
    iconWidth: 10,
    iconHeight: 10,
  },
  {
    field: "vertical",
    header: "Vertical",
    icon: "chevron-down.svg",
    iconWidth: 10,
    iconHeight: 10,
  },
  { field: "date", header: "Offer Sent Date" },
  { field: "status", header: "Offer status" },
  { field: "offerValue", header: "Offer Value" },
  { field: "actions", header: "Action" },
]);

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "organizationName.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "title.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "verticle.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const vendorData = ref([
  {
    id: "98374861",
    companyName: "ABS Company Pvt.",
    companyImage: "Avatar.png",
    ceoManager: "Floyd Miles",
    managerImage: "Avatar (5).png",
    vertical: { name: "Event Management", image: "Avatar.png" },
    description: "Need business consultant for my startup",
    orderType: "One-Time",
    status: "On-Location",
    date: "2025-03-28T11:42:02.000000Z",
    offerValue: "4000",
  },
  {
    id: "98374861",
    companyName: "Big Kahuna Ltd.",
    companyImage: "Avatar.png",
    ceoManager: "Kristin Watson",
    managerImage: "Avatar (4).png",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    vertical: { name: "Event Management", image: "Avatar.png" },
    description: "Need business consultant for my startup",
    orderType: "One-Time",
    status: "On-Location",
    date: "2025-03-28T11:42:02.000000Z",
    offerValue: "4000",
  },
  {
    id: "98374861",
    companyName: "Barone LLC.",
    companyImage: "Avatar (5).png",
    ceoManager: "Albert Flores",
    managerImage: "Avatar (4).png",
    vertical: { name: "Event Management", image: "Avatar.png" },
    description: "Need business consultant for my startup",
    orderType: "One-Time",
    status: "On-Location",
    date: "2025-03-28T11:42:02.000000Z",
    offerValue: "4000",
  },
  {
    id: "98374861",
    companyName: "Biffco Enterprises Ltd.",
    companyImage: "Avatar.png",
    ceoManager: "Dianne Russell",
    managerImage: "Avatar (4).png",
    vertical: { name: "Event Management", image: "Avatar.png" },
    description: "Need business consultant for my startup",
    orderType: "One-Time",
    status: "On-Location",
    date: "2025-03-28T11:42:02.000000Z",
    offerValue: "4000",
  },
]);
</script>
