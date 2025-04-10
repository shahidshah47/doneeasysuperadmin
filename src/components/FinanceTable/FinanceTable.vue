<template>
  <ThemeDatatable
    :value="data"
    v-model:filters="filters"
    :filterFields="['id', 'companyName']"
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
              { label: 'Earning', value: 1 },
              { label: 'Spending', value: 2 },
              { label: 'Transactions', value: 3 },
              { label: 'SOA', value: 4 },
            ]"
            @update:statusBtn="handleFetchFinance"
          />
        </div>
        <div class="flex gap-3 items-center w-full col-span-4">
          <SearchAndFilter
            v-model="filters['global'].value"
            placeholder="Search"
          />
        </div>
      </div>
      <div class="grid grid-cols-7">
        <MetricCard
          title="Total Revenue"
          amount="532,100"
          modalTarget="totalRevenueModal"
        />
      </div>
    </template>
    <template #id="{ data }"
      ><span class="text-dm-blue font-semibold text-sm">{{
        data.id
      }}</span></template
    >

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

    <template #date="{ data }">
      <div class="bg-white font-semibold !text-rich-navy relative group">
        <span
          class="whitespace-nowrap overflow-hidden text-ellipsis block text-dark-indigo-100 font-normal text-sm"
        >
          {{ formatCompactDateTime(data.date) }}
        </span>
      </div>
    </template>

    <template #type="{ data }">
      <div class="bg-white font-semibold !text-rich-navy relative group">
        <span
          class="whitespace-nowrap overflow-hidden text-ellipsis block text-dm-blue font-semibold text-sm"
        >
          {{ data.type }}
        </span>
      </div>
    </template>
    <template #paymentStatus="{ data }">
      <div
        :style="getStatusClass(data.paymentStatus)"
        class="px-2 py-1 rounded-lg font-semibold text-sm whitespace-nowrap inline-block"
      >
        {{ data.paymentStatus }}
      </div>
    </template>

    <template #amount="{ data }">
      <div class="flex gap-2 items-center">
        <span class="text-primary font-semibold text-sm">AED</span>
        <span class="text-dm-blue font-semibold text-xl">{{
          data.amount ?? 0
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
          @click="handleDelete(data?.id)"
        >
          <img
            src="../../assets/image/icons/trash.svg"
            alt="trash-icon"
            class="w-4 h-4"
          />
        </button>
        <button
          class="border border-primary w-7 h-7 !rounded-[10px] bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
          @click="copyUrl(data?.id)"
        >
          <img
            src="../../assets/image/icons/share.svg"
            alt="share-icon"
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
        @perPageClick="(cPage, perPage) => handlePerPage(cPage, perPage)"
        :prevPageCallback="prevPageCallback"
        @nextPageClick="(page) => fetchData(statusBtn, page)"
        :nextPageCallback="nextPageCallback"
        :totalRecords="totalRecords"
        :perPage="pagination.perPage"
        :totalEntries="pagination.total"
      />
    </template>
  </Paginator>
</template>

<script setup>
import { Paginator } from "primevue";
import ThemeDatatable from "../common/ThemeDatatable/ThemeDatatable.vue";
import Pagination from "../common/Pagination/Pagination.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { FilterMatchMode } from "@primevue/core/api";
import { formatCompactDateTime } from "../../utils/helper";
import StatusButtons from "../common/StatusButtons/StatusButtons.vue";
import SearchAndFilter from "../common/SearchAndFilter/SearchAndFilter.vue";
import MetricCard from "../common/MetricCard/MetricCard.vue";

const selectedSurvey = ref();
const router = useRouter();
const route = useRoute();

const getImagePath = (imageName) => {
  return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};

const handleClickToDetails = (id, type) => {};

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

const handleFetchFinance = (id) => {};

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
    case "Active":
      return { backgroundColor: "#D6FFEF", color: "#00995C" }; // Green
    case "Submitted":
      return { backgroundColor: "#D6FFEF", color: "#00995C" }; // Green
    case "Pending":
      return { backgroundColor: "#FCEED9", color: "#DC8B13" }; // Yellow
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
  { field: "organizationName", header: ["Company Company"] },

  {
    field: "vertical",
    header: "Vertical",
    icon: "chevron-down.svg",
    iconWidth: 10,
    iconHeight: 10,
  },
  {
    field: "type",
    header: "Type",
  },
  { field: "date", header: "Date" },
  { field: "paymentStatus", header: "Payment State" },
  { field: "amount", header: "Amount" },
  { field: "actions", header: "Action" },
]);

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "organizationName.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "title.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "verticle.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
});

defineProps(["data", "getImagePath"]);
</script>
