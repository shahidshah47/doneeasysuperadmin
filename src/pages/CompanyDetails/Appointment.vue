<template>
  <div class="container-fluid company-details">
    <div class="row">
      <!-- Company Info and Stats -->
      <keep-alive>
        <CompanyHeader />
      </keep-alive>
    </div>
    <div class="p-4 bg-white rounded-3 shadow relative">
      <ThemeDatatable
        :value="appointmentsData"
        v-model:selection="selectedAppointment"
        v-model:filters="filters"
        :filterFields="[
          'id',
          'organizationName.name',
          'verticle.name',
          'title.name',
          'orderType',
          'orderAmount',
        ]"
        :columns="columns"
        :paginator="true"
        :rows="20"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :totalRecords="120"
        :totalPageCount="6"
      >
        <template #header>
          <div class="flex justify-between items-center mb-2">
            <div class="flex gap-3">
              <button
                @click="handleFetchAppointment(1)"
                :class="`btn rounded-3 px-3 py-2 active:bg-primary ${
                  statusBtn === 1 ? 'bg-primary text-white' : 'btn-light'
                }`"
              >
                All
              </button>
              <button
                @click="handleFetchAppointment(2)"
                :class="`btn rounded-3 px-3 py-2 active:bg-primary ${
                  statusBtn === 2 ? 'bg-primary text-white' : 'btn-light'
                }`"
              >
                Pending
              </button>
              <button
                @click="handleFetchAppointment(3)"
                :class="`btn rounded-3 px-3 py-2 active:bg-primary ${
                  statusBtn === 3 ? 'bg-primary text-white' : 'btn-light'
                }`"
              >
                Schedule
              </button>
              <button
                @click="handleFetchAppointment(4)"
                :class="`btn rounded-3 px-3 py-2 active:bg-primary ${
                  statusBtn === 4 ? 'bg-primary text-white' : 'btn-light'
                }`"
              >
                Completed
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
        <template #id="{ data }"
          ><span>{{ data.id }}</span></template
        >
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
            <span class="">{{ data.title.name }}</span>
            <span class="text-sm font-bold text-dm-blue">{{
              data.title.description
            }}</span>
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
        <template #orderType="{ data }">
          <p class="text-md text-dm-blue font-bold">{{ data.orderType }}</p>
        </template>
        <template #expectedDateAndTime="{ data }">
          <p class="text-md text-dm-blue font-bold">
            {{ data.expectedDateAndTime }}
          </p>
        </template>
        <template #orderAmount="{ data }">
          <p class="text-md text-dm-blue font-bold">{{ data.orderAmount }}</p>
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

<script setup>
import { ref, onMounted } from "vue";
import api from "../../api";
import CompanyHeader from "../../components/CompanyHeader.vue";
import { useRoute } from "vue-router";
import { useCompanyStore } from "../../store";
import { IconField, InputIcon, InputText, Paginator, useToast } from "primevue";
import { FilterMatchMode } from "@primevue/core/api";
import ThemeDatatable from "../../components/common/ThemeDatatable/ThemeDatatable.vue";
import { convertAppointmentData } from "../../utils/helper";
import Pagination from "../../components/common/Pagination/Pagination.vue";

const store = useCompanyStore();
const appointmentsData = ref([]);
const loading = ref(true);
const error = ref(null);
const statusBtn = ref(1);
const route = useRoute();
const toast = useToast();
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

// const getImagePath = (imageName) => {
//   return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
// };

const fetchData = async (id, page = 1) => {
  try {
    const response = await api.get(
      `/superadmin/user/appointments?user_id=${route.params.companyId}&status=${id}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("token")}`,
        },
      }
    );
    // console.log(response, "res from appointments");
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
      appointmentsData.value = data?.map((item) =>
        convertAppointmentData(item)
      );
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error("Error in fetchData:", err);
  }
};

onMounted(() => {
  fetchData(1);
});

const handleFetchAppointment = (id) => {
  fetchData(id);
  statusBtn.value = id;
};

const selectedAppointment = ref();
const copyUrl = (id) => {
  const location = window.location;
  navigator.clipboard.writeText(
    location.origin + "/super-admin/company-details/" + id + "/info"
  );
};

const statusOptions = ["In Progress", "On Location", "Waiting", "Cancelled"];
const columns = ref([
  { field: "id", header: "ID" },
  { field: "organizationName", header: "Organization Name" },
  { field: "title", header: "Title & Description" },
  { field: "verticle", header: "Vertical" },
  { field: "orderType", header: "Order Type" },
  { field: "expectedDateAndTime", header: "Expected Delivery Date & Time" },
  { field: "payment", header: "Payment" },
  { field: "orderAmount", header: "Order Amount" },
  { field: "progressState", header: "Progress State" },
  { field: "actions", header: "Action" },
]);

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "organizationName.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "title.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "verticle.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  orderType: { value: null, matchMode: FilterMatchMode.CONTAINS },
  payment: { value: null, matchMode: FilterMatchMode.CONTAINS },
  orderAmount: { value: null, matchMode: FilterMatchMode.CONTAINS },
  progressState: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const getStatusClass = (status) => {
  switch (status) {
    case "In Progress":
      return { backgroundColor: "#D6FFEF", color: "#00995C" }; // Green
    case "On Location":
      return { backgroundColor: "#D6FFEF", color: "#00995C" }; // Green
    case "Waiting":
      return { backgroundColor: "#FCEED9", color: "#DC8B13" }; // Yellow
    case "Cancelled":
      return { backgroundColor: "#FFE5E5", color: "#FF5555" }; // Red
    default:
      return { backgroundColor: "#f1f1f1", color: "#000" }; // Default Gray
  }
};

const handleDelete = async (id) => {
  try {
    const response = await api.post(
      `/superadmin/user/appointment/${id}/delete`
    );
    console.log(response, "resp from delete");
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
</script>
