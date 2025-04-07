<template>
  <div class="container-fluid company-details">
    <div class="row">
      <!-- Company Info and Stats -->
      <CompanyHeader />
    </div>
    <div class="p-3 mb-1 bg-white rounded-3">
      <ThemeDatatable
        :value="siteSurveysData"
        v-model:selection="selectedSurvey"
        v-model:filters="filters"
        :filterFields="filterFields"
        :columns="columns"
        :paginator="true"
        :rows="20"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :totalRecords="pagination.total"
        :totalPageCount="pagination.lastPage"
      >
        <template #header>
          <div class="grid grid-cols-10 items-center gap-4 mb-6">
            <div class="flex gap-3 col-span-6">
              <StatusButtons
                :statusBtn="statusBtn"
                :buttons="[
                  { label: 'All', value: 4 },
                  { label: 'Pending', value: 1 },
                  { label: 'Schedule', value: 2 },
                  { label: 'Completed', value: 3 },
                ]"
                @update:statusBtn="handleFetchSiteSurvey"
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

        <template #organizationName="{ data }">
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

        <template #title="{ data }">
          <div class="flex items-start gap-1 flex-col">
            <span>{{ data.title.name }}</span>
            <span class="text-sm font-bold text-dm-blue">{{ data.title.description }}</span>
          </div>
        </template>

        <template #verticle="{ data }">
          <div class="flex items-center gap-2">
            <img
              :src="data.verticle.image"
              alt="Company Logo"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />
            <span class="font-semibold text-dm-blue">{{
              data.verticle.name
            }}</span>
          </div>
        </template>

        <template #scheduleStartDateAndEndDate="{ data }">
          <p
            class="text-md text-dm-blue font-bold"
            v-html="data.scheduleStartDateAndEndDate"
          ></p>
        </template>

        <template #orderAmount="{ data }">
          <div class="flex gap-2 items-center">
            <span class="text-primary font-semibold text-sm">AED</span>
            <span class="text-2xl font-bold">{{ data.orderAmount ?? 0 }}</span>
          </div>
        </template>

        <template #surveyStatus="{ data }">
          <div
            :class="`px-3 py-2 rounded-xl font-bold`"
            :style="{
              backgroundColor: data.surveyStatus.bgColor,
              color: data.surveyStatus.color,
            }"
          >
            {{ data.surveyStatus.name }}
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
      <Paginator
        :rows="pagination.perPage"
        :totalRecords="pagination.total"
        v-if="pagination.total > 0"
      >
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
            @perPageClick="(cPage, perPage) => handlePerPage(cPage, perPage)"
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
import { nextTick, onMounted, ref } from "vue";
import CompanyHeader from "../../components/CompanyHeader.vue";
import ThemeDatatable from "../../components/common/ThemeDatatable/ThemeDatatable.vue";
import Pagination from "../../components/common/Pagination/Pagination.vue";
import { FilterMatchMode } from "@primevue/core/api";
import { IconField, InputIcon, InputText, Paginator, useToast } from "primevue";
import { useRoute, useRouter } from "vue-router";
import SearchAndFilter from "../../components/common/SearchAndFilter/SearchAndFilter.vue";
import StatusButtons from "../../components/common/StatusButtons/StatusButtons.vue";
import api from "../../api";
import { convertSiteSurveyData } from "../../utils/helper";

const selectedSurvey = ref();
const router = useRouter();
const route = useRoute();
const siteSurveysData = ref([]);
const loading = ref(true);
const error = ref(null);
const statusBtn = ref(4);
const toast = useToast();

const filterFields = ref([
  "id",
  "organizationName.name",
  "verticle.name",
  "title.name",
  "orderAmount",
  "surveyStatus.name",
]);

const handleClickToDetails = (id) => {
  router.push("/super-admin/company-details/" + route.params.companyId + "/site-survey/" + id + "/details");
};

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

const handleDelete = async (id) => {};

const fetchData = async (id, page = 1, perPage = null) => {
  try {
    let url = `/superadmin/user/site-surveys?user_id=${308}&status=${id}&page=${page}`;
    if (perPage) {
      url = `/superadmin/user/site-surveys?user_id=${308}&status=${id}&page=${page}&per_page=${perPage}`;
    }
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("token")}`,
      },
    });
    if (response?.status === 200) {
      const { data } = response.data;
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
      siteSurveysData.value = data.map((item) => convertSiteSurveyData(item));
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error("Error in fetchData:", err);
  }
};

onMounted(() => {
  nextTick(() => {
    fetchData(statusBtn.value, 1);
  });
});


const handlePerPage = async (props) => {
  fetchData(statusBtn.value, props[0], props[1]);
};

const handleFetchSiteSurvey = (id) => {
  fetchData(id, 1);
  statusBtn.value = id;
};

const copyUrl = (id) => {
  const location = window.location;
  navigator.clipboard.writeText(
    location.origin +
      "/super-admin/company-details/" +
      route.params.companyId +
      "/site-survey/" +
      id +
      "/details"
  );
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Copied to clipboard!",
    life: 3000,
  });
};

const columns = ref([
  { field: "id", header: "ID" },
  { field: "organizationName", header: "Organization Name" },
  { field: "title", header: "Title & Description" },
  { field: "verticle", header: "Vertical" },
  { field: "scheduleStartDateAndEndDate", header: "Schedule Start Date / End Date" },
  { field: "orderAmount", header: "Order Amount" },
  { field: "surveyStatus", header: "Survey Status" },
  { field: "actions", header: "Action" },
]);

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "organizationName.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "title.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "verticle.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  orderAmount: { value: null, matchMode: FilterMatchMode.CONTAINS },
  surveyStatus: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const getImagePath = (imageName) => {
  return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};

</script>
