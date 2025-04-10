<template>
  <Loader v-if="loading" />

  <div class="container-fluid company-details" v-else>
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
                @update:statusBtn="handleFetchAppointment"
              />
            </div>
            <div class="flex gap-3 items-center w-full col-span-4">
              <SearchAndFilter v-model="searchTerm" placeholder="Search" />
            </div>
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
              :src="data.organizationName.logo"
              alt="Company Logo"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />
            <span
              class="text-dm-blue font-semibold text-sm whitespace-nowrap"
              >{{ data.organizationName.name }}</span
            >
          </div>
        </template>
        <template #title="{ data }">
          <div class="group flex items-start gap-1 flex-col relative">
            <span class="text-dm-blue font-semibold text-sm whitespace-nowrap">
              {{ data.title.name }}
            </span>

            <div
              class="absolute left-1/2 -top-20 transform -translate-x-1/2 w-max max-w-sm p-3 bg-white-100 !text-rich-navy border shadow-lavendar-card rounded hidden group-hover:block z-50"
              style="white-space: normal; overflow: visible"
            >
              {{ data.title.description }}
            </div>
          </div>
        </template>

        <template #verticle="{ data }">
          <div class="flex items-center gap-2">
            <img
              :src="data.verticle.image"
              alt="Company Logo"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />
            <span
              class="text-dm-blue font-semibold text-sm whitespace-nowrap"
              >{{ data.verticle.name }}</span
            >
          </div>
        </template>
        <template #orderType="{ data }">
          <div class="text-dm-blue font-semibold text-sm whitespace-nowrap">
            {{ data.orderType }}
          </div>
        </template>
        <template #expectedDateAndTime="{ data }">
          <div
            class="text-dark-indigo-100 font-normal text-sm whitespace-nowrap"
          >
            {{ data.expectedDateAndTime }}
          </div>
        </template>
        <template #payment="{ data }">
          <div
            :class="`px-3 py-2 rounded-xl  font-semibold text-sm whitespace-nowrap`"
            :style="{
              backgroundColor: data.payment.bgColor,
              color: data.payment.color,
            }"
          >
            {{ data.payment.name }}
          </div>
        </template>
        <template #orderAmount="{ data }">
          <div class="flex gap-2 items-center">
            <span class="text-primary font-semibold text-sm">AED</span>
            <span class="text-xl font-bold">{{ data.orderAmount ?? 0 }}</span>
          </div>
        </template>
        <template #progressState="{ data }">
          <div
            :class="`px-3 py-2 rounded-xl  font-semibold text-sm`"
            :style="{
              backgroundColor: data.progressState.bgColor,
              color: data.progressState.color,
            }"
          >
            {{ data.progressState.name }}
          </div>
        </template>
        <template #actions="{ data }">
          <div class="flex gap-2">
            <button
              class="border border-primary w-8 h-8 !rounded-[10px] bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="handleClickToDetails(data)"
            >
              <img
                src="../../assets/image/icons/eye-2.svg"
                alt="eye-icon"
                class="w-4.5 h-4.5"
              />
            </button>
            <button
              class="border border-primary w-8 h-8 !rounded-[10px] bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="handleDelete(data?.id)"
            >
              <img
                src="../../assets/image/icons/trash.svg"
                alt="eye-icon"
                class="w-4.5 h-4.5"
              />
            </button>
            <button
              class="border border-primary w-8 h-8 !rounded-[10px] bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="copyUrl(data?.id)"
            >
              <img
                src="../../assets/image/icons/share.svg"
                alt="eye-icon"
                class="w-4.5 h-4.5"
              />
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
import { ref, onMounted, nextTick, watch, watchPostEffect } from "vue";
import api from "../../api";
import CompanyHeader from "../../components/CompanyHeader.vue";
import { useRoute, useRouter } from "vue-router";
import { useCompanyStore } from "../../store";
import { Paginator, useToast } from "primevue";
import ThemeDatatable from "../../components/common/ThemeDatatable/ThemeDatatable.vue";
import { convertAppointmentData, debounce } from "../../utils/helper";
import Pagination from "../../components/common/Pagination/Pagination.vue";
import SearchAndFilter from "../../components/common/SearchAndFilter/SearchAndFilter.vue";
import StatusButtons from "../../components/common/StatusButtons/StatusButtons.vue";
import Loader from "../../components/common/Loader/Loader.vue";

const store = useCompanyStore();
const appointmentsData = ref([]);
const selectedAppointment = ref();
const loading = ref(true);
const error = ref(null);
const statusBtn = ref(4);
const route = useRoute();
const router = useRouter();
const toast = useToast();
const searchTerm = ref("");
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

const handleClickToDetails = (data) => {
  let url =
    "/super-admin/company-details/" +
    route.params.companyId +
    "/appointment/" +
    data.id +
    "/details";
  if (data.orderTypeId === 2) {
    url =
      "/super-admin/company-details/" +
      route.params.companyId +
      "/appointment/" +
      data.id +
      "/reoccurring/details";
  }
  router.push(url);
};

const fetchData = async (id, page = 1, perPage = null, search = "") => {
  loading.value = true;
  try {
    let url = `/superadmin/user/appointments?all=1&user_id=${route.params.companyId}&status=${id}&page=${page}&search=${search}`;
    if (perPage) {
      url = `/superadmin/user/appointments?all=1&user_id=${route.params.companyId}&status=${id}&page=${page}&per_page=${perPage}`;
    }
    if (perPage && search !== "") {
      url = `/superadmin/user/appointments?all=1&user_id=${route.params.companyId}&status=${id}&page=${page}&per_page=${perPage}&search=${search}`;
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
      appointmentsData.value = data?.map((item) =>
        convertAppointmentData(item)
      );
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error("Error in fetchData:", err);
  } finally {
    loading.value = false;
  }
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

onMounted(() => {
  nextTick(() => {
    fetchData(statusBtn.value, 1);
  });
});

const handlePerPage = async (props) => {
  fetchData(statusBtn.value, props[0], props[1], searchTerm.value);
};

const handleFetchAppointment = (id) => {
  searchTerm.value = "";
  fetchData(id, 1);
  statusBtn.value = id;
};

const copyUrl = (id) => {
  const location = window.location;
  navigator.clipboard.writeText(
    location.origin +
      "/super-admin/company-details/" +
      route.params.companyId +
      "/appointment/" +
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

const statusOptions = ["In Progress", "On Location", "Waiting", "Cancelled"];
const columns = ref([
  { field: "id", header: "ID" },
  {
    field: "organizationName",
    header: ["Organization ", "Name / ID"],
    class: "w-48",
  },
  { field: "title", header: "Title & Description", class: "w-48" },
  {
    field: "verticle",
    header: "Vertical",

    icon: "chevron-down.svg",
    iconWidth: 10,
    iconHeight: 10,
  },
  {
    field: "orderType",
    header: "Order Type",
    icon: "chevron-down.svg",
    iconWidth: 10,
    iconHeight: 10,
  },
  {
    field: "expectedDateAndTime",
    header: "Expected Delivery Date & Time",
    class: "w-42",
  },
  { field: "payment", header: "Payment" },
  { field: "orderAmount", header: "Order Amount" },
  { field: "progressState", header: "Progress State" },
  { field: "actions", header: "Action" },
]);

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
      searchTerm.value = "";
      fetchData(statusBtn.value);
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error("Error in fetchData:", err);
  }
};
</script>
