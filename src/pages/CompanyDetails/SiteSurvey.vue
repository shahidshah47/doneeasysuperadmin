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
                  { label: 'Completed', value: 3 },
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
          <span>{{ data.id }}</span>
        </template>

        <template #organizationName="{ data }">
          <div class="flex items-center gap-2">
            <img
              :src="getImagePath(data.companyImage)"
              alt="Company Logo"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />

            <span class="font-semibold text-dm-blue">{{
              data.companyName
            }}</span>
          </div>
        </template>

        <template #title="{ data }">
          <div class="flex items-start gap-1 flex-col">
            <span>{{ data.ceoManager }}</span>
            <span class="text-sm font-bold text-dm-blue">{{
              data.contactEmail
            }}</span>
          </div>
        </template>

        <template #verticle="{ data }">
          <p class="text-md text-dm-blue font-bold">
            {{ data.verticalSubscribed }}
          </p>
        </template>

        <template #orderType="{ data }">
          <p class="text-md text-dm-blue font-bold">{{ data.status }}</p>
        </template>

        <template #expectedDateAndTime="{ data }">
          <p
            class="text-md text-dm-blue font-bold"
            v-html="formatDate(data.registeredDate)"
          ></p>
        </template>

        <template #orderAmount="{ data }">
          <div class="flex flex-col">
            <p class="text-md text-dm-blue font-bold">
              {{ data.totalRevenue }}
            </p>
            <p class="text-md text-dm-blue font-bold">
              {{ data.totalSpending }}
            </p>
          </div>
        </template>

        <template #actions="{ data }">
          <div class="flex gap-2">
            <button
              class="border border-primary p-2 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="handleClickToDetails()"
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

<script setup>
import { onMounted, ref } from "vue";
import CompanyHeader from "../../components/CompanyHeader.vue";
import ThemeDatatable from "../../components/common/ThemeDatatable/ThemeDatatable.vue";
import Pagination from "../../components/common/Pagination/Pagination.vue";
import { FilterMatchMode } from "@primevue/core/api";
import { IconField, InputIcon, InputText, Paginator, useToast } from "primevue";
import { useRoute, useRouter } from "vue-router";
import SearchAndFilter from "../../components/common/SearchAndFilter/SearchAndFilter.vue";
import StatusButtons from "../../components/common/StatusButtons/StatusButtons.vue";
const selectedSurvey = ref();
const router = useRouter();
const route = useRoute();
const formatDate = (date) => {
  return date.replace(/\n/g, "<br>"); // Convert newlines to <br>
};
const handleClickToDetails = () => {
  const companyId = route.params.companyId;
  if (companyId) {
    router.push({
      path: `/super-admin/company-details/${companyId}/site-survey/details`,
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
      path: "/super-admin/company-details/site-survey/SurveyDetails/details",
      query: { companyId },
    });
  }
};

const handleDelete = async (id) => {};

const fetchData = async (_id, page = 1) => {
  //   try {
  //     const response = await api.get(
  //       `/superadmin/user/appointments?user_id=${route.params.companyId}&status=${id}&page=${page}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage?.getItem("token")}`,
  //         },
  //       }
  //     );
  //     // console.log(response, "res from appointments");
  //     if (response?.status === 200) {
  //       const { data } = response.data;
  //       pagination.value = {
  //         currentPage: response.data.current_page,
  //         lastPage: response.data.last_page,
  //         perPage: response.data.per_page,
  //         total: response.data.total,
  //         firstPageUrl: response.data.first_page_url,
  //         lastPageUrl: response.data.last_page_url,
  //         nextPageUrl: response.data.next_page_url,
  //         prevPageUrl: response.data.prev_page_url,
  //         links: response.data.links,
  //       };
  //       toast.add({
  //         severity: "success",
  //         summary: "Success",
  //         detail: response?.data?.message,
  //         life: 3000,
  //       });
  //       appointmentsData.value = data?.map((item) =>
  //         appointmentsData(item)
  //       );
  //     }
  //   } catch (err) {
  //     error.value = "Error fetching data";
  //     console.error("Error in fetchData:", err);
  //   }
};

// onMounted(() => {
//   fetchData(1);
// });

const columns = ref([
  { field: "id", header: "ID" },
  { field: "organizationName", header: "Organization Name" },
  { field: "title", header: "Title & Description" },
  { field: "verticle", header: "Vertical" },
  { field: "orderType", header: "Order Type" },
  {
    field: "expectedDateAndTime",
    header: ["Expected Delivery", "Date & Time"],
  },
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

const getImagePath = (imageName) => {
  return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};

const vendorData = ref([
  {
    id: "OFC 001",
    companyName: "ABS Company Pvt.",
    companyImage: "Avatar.png",
    ceoManager: "Floyd Miles",
    managerImage: "Avatar (5).png",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "Active",
    verticalSubscribed: 16,
    registeredDate: "2020-05-17<br>10:00 AM",
    statusColor: "lightgreen",
  },
  {
    id: "OFC 002",
    companyName: "Big Kahuna Ltd.",
    companyImage: "Avatar.png",
    ceoManager: "Kristin Watson",
    managerImage: "Avatar (4).png",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "Banned",
    verticalSubscribed: 23,
    registeredDate: "2020-05-17<br>10:00 AM",
    statusColor: "#ffb09c",
  },
  {
    id: "OFC 003",
    companyName: "Barone LLC.",
    companyImage: "Avatar (5).png",
    ceoManager: "Albert Flores",
    managerImage: "Avatar (4).png",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "Inactive",
    verticalSubscribed: 23,
    registeredDate: "2020-05-17<br>10:00 AM",
    statusColor: "lightgrey",
  },
  {
    id: "OFC 004",
    companyName: "Biffco Enterprises Ltd.",
    companyImage: "Avatar.png",
    ceoManager: "Dianne Russell",
    managerImage: "Avatar (4).png",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "Monitory",
    verticalSubscribed: 23,
    registeredDate: "2020-05-17<br>10:00 AM",
    statusColor: "lightyellow",
  },
]);
</script>
