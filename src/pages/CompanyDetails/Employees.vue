<script setup>
import { nextTick, onMounted, ref, toRaw, watch } from "vue";

import { useRoute, useRouter } from "vue-router";

import { FilterMatchMode } from "@primevue/core/api";
import { Paginator, useToast } from "primevue";
import Dropdown from "primevue/dropdown";
import api from "../../api";
import Pagination from "../../components/common/Pagination/Pagination.vue";
import ThemeDatatable from "../../components/common/ThemeDatatable/ThemeDatatable.vue";
import CompanyHeader from "../../components/CompanyHeader.vue";
import { useCompanyStore } from "../../store";
import StatusButtons from "../../components/common/StatusButtons/StatusButtons.vue";
import SearchAndFilter from "../../components/common/SearchAndFilter/SearchAndFilter.vue";
import { convertEmployeeUsersData, debounce } from "../../utils/helper.js";

const store = useCompanyStore();
// const companiesData = ref([]);
const selectedCompany = ref();
const loading = ref(true);
const error = ref(null);
const statusBtn = ref("");
const router = useRouter();
const route = useRoute();
const toast = useToast();
const searchTerm = ref("");
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

const fetchData = async (id, page = 1, perPage = null, search = "") => {
  console.log(id, page, "id and page");
  try {
    let url = `/superadmin/user/users?user_id=${route.params.companyId}&page=${page}&search=${search}`;
    if (id !== "" && id !== 1) {
      url = `/superadmin/user/users?user_id=${route.params.companyId}&page=${page}&user_type=${id}&search=${search}`;
    }
    if (perPage) {
      url = `/superadmin/user/users?user_id=${route.params.companyId}&page=${page}&per_page=${perPage}`;
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

      // console.log(data, "Data from users");
      companiesData.value = data.map((item) => convertEmployeeUsersData(item));
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error("Error in fetchData:", err);
  } finally {
    loading.value = false;
  }
};

const handleClickToDetails = (empId) => {
  const companyId = route.params.companyId;
  if (companyId) {
    router.push({
      path: `/super-admin/company-details/${companyId}/employees/${empId}/details`,
    });
  }
};

const handleFetchUsers = (id, page) => {
  searchTerm.value = "";
  fetchData(id, 1);
  statusBtn.value = id;
};

const handlePerPage = async (props) => {
  await fetchData(statusBtn.value, props[0], props[1], searchTerm.value);
};

const statusOptions = [
  "Active",
  "Deactivated",
  "Inactive",
  "Monitory",
  "Banned",
];

const statusMap = {
  Active: 1,
  Deactivated: 2,
  Inactive: 3,
  Monitory: 4,
  Banned: 5,
};
const columns = ref([
  { field: "id", header: "ID" },
  { field: "employeeName", header: "Employee Name", class: "w-32" },
  { field: "role", header: "Role" },
  {
    field: "vertical",
    header: "Assign Vertical",
    icon: "chevron-down.svg",
    iconWidth: 10,
    iconHeight: 10,
    class: "w-40",
  },
  { field: "status", header: "Status" },
  { field: "contact", header: ["Contact/ ", "Email"] },
  { field: "currentWork", header: ["Current Work ", "Status"] },
  { field: "projectDetail", header: "Project Details" },
  { field: "actions", header: "Action" },
]);

const getStatusClass = (status) => {
  switch (status) {
    case "Active":
      return "status-active";
    case "Deactivated":
      return "status-deactivated";
    case "Inactive":
      return "status-inactive";
    case "Monitory":
      return "status-monitory";
    case "Banned":
      return "status-banned";
    default:
      return "status-default";
  }
};

const getWorkStatusClass = (status) => {
  switch (status) {
    case "Working on Survey Task":
      return "status-working-survey-task";
    case "Working on Request Task":
      return "status-working-request-task";
    case "Working on Appointment Task":
      return "status-working-appointment-task";
    case "Appointment Assigned":
      return "status-appointment-assigned";
    case "Request Assigned":
      return "status-request-assigned";
    case "Survey Assigned":
      return "status-survey-assigned";
    case "Occupied":
      return "status-occupied";
    case "Site Survey":
      return "status-site-survey";
    case "Available":
      return "status-available";
    default:
      return "status-default";
  }
};

const companiesData = ref([]);

const debouncedFetch = debounce((val) => {
  fetchData(statusBtn.value, 1, null, val);
}, 500);

watch(
  () => searchTerm.value,
  (newVal, oldValue) => {
    debouncedFetch(newVal);
  }
);

onMounted(() => {
  nextTick(() => {
    fetchData(1, 1);
  });
});

const getImageUrl = (imagePath) => {
  return new URL(`../../assets/images2/${imagePath}`, import.meta.url).href;
};

const getImageIcon = (imagePath) => {
  return new URL(`../../assets/image/icons/${imagePath}`, import.meta.url).href;
};

const typeClasses = {
  "One-time": "!text-accent-green !bg-green-200",
  Reoccurring: "!text-accent-green bg-green-200",
  "Hot Orders": "!text-light-orange bg-blush-100",
};

async function updateStatus(data) {
  const statusCode = statusMap[data.status];
  try {
    const response = await api.post(
      "/superadmin/update-status",
      {
        user_id: data.id,
        status: statusCode,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: response?.data?.message || "Status updated",
        life: 3000,
      });
      await fetchData(statusBtn.value, pagination.value.currentPage);
    } else {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: response?.data?.message || "Update failed",
        life: 3000,
      });
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Something went wrong",
      life: 3000,
    });
    console.error(error);
  }
}

const copyUrl = (id) => {
  const location = window.location;
  navigator.clipboard.writeText(
    location.origin +
      "/super-admin/company-details/" +
      route.params.companyId +
      "/employees/" +
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
</script>

<template>
  <div>
    <div>
      <CompanyHeader />
    </div>

    <div class="p-4 bg-white rounded-3 relative">
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
                  { label: 'All', value: '' },
                  { label: 'Admin', value: 6 },
                  { label: 'Manager', value: 3 },
                  { label: 'Associates', value: 5 },
                ]"
                @update:statusBtn="handleFetchUsers"
              />
            </div>
            <div class="flex gap-3 items-center w-full col-span-4">
              <SearchAndFilter v-model="searchTerm" placeholder="Search" />
            </div>
          </div>
        </template>

        <template #id="{ data }">
          <span>{{ data.id }}</span>
        </template>

        <template v-slot:employeeName="{ data }">
          <div class="flex items-center gap-2">
            <img
              :src="data.employeeName.image"
              alt="Employee Image"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />
            <span class="font-semibold text-dm-blue">{{
              data.employeeName.name
            }}</span>
          </div>
        </template>

        <template #role="{ data }">
          <span class="font-semibold text-gray-800">{{ data.role }}</span>
        </template>

        <template #vertical="{ data }">
          <div class="inline-block !bg-lavender !py-[2px] !px-1 rounded-md">
            <span class="font-semibold text-dm-blue">{{ data.vertical }}</span>
          </div>
        </template>

        <template #contact="{ data }">
          <div>
            <span class="block font-semibold text-gray-800">{{
              data.contact.phone
            }}</span>
            <span class="!text-vivid-purple font-semibold">{{
              data.contact.email
            }}</span>
          </div>
        </template>

        <template #currentWork="{ data }">
          <Dropdown
            v-model="data.currentWork"
            :options="[
              'Occupied',
              'Survey Task',
              'Request Task',
              'Appointment Task',
              'Appointment Assigned',
              'Request Assigned',
              'Survey Assigned',
            ]"
            @change="updateStatus(data)"
            :class="[
              'p-dropdown-sm',
              'font-semibold',
              getWorkStatusClass(data.currentWork),
            ]"
          >
            <template #dropdownicon>
              <img
                :src="getImageIcon('chevron-down.svg')"
                alt="Employee Image"
                class="w-2.5 h-2 rounded-xl object-cover"
              />
            </template>
          </Dropdown>
        </template>

        <template #projectDetail="{ data }">
          <div
            v-if="
              data.projectDetail &&
              data.projectDetail.image &&
              data.projectDetail.name &&
              data.projectDetail.client &&
              data.projectDetail.end_date
            "
          >
            <div class="flex items-center gap-2">
              <img
                v-if="data.projectDetail.image"
                :src="data.projectDetail.image"
                alt="Project Image"
                class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
              />
              <div>
                <span v-if="data.projectDetail.name" class="!font-semibold">
                  {{ data.projectDetail.name }}
                </span>
                <div
                  class="!text-neutral-70 !text-sm"
                  v-if="
                    data.projectDetail.client || data.projectDetail.end_date
                  "
                >
                  <span v-if="data.projectDetail.client">
                    {{ data.projectDetail.client }}
                  </span>
                  <span
                    v-if="
                      data.projectDetail.client && data.projectDetail.end_date
                    "
                  >
                    -
                  </span>
                  <span v-if="data.projectDetail.end_date">
                    {{ data.projectDetail.end_date }}
                  </span>
                  <button class="!text-vivid-purple !text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>-</div>
        </template>

        <template #status="{ data }">
          <Dropdown
            v-model="data.status"
            :options="statusOptions"
            @change="(e) => updateStatus({ id: data?.id, status: e.value })"
            :class="[
              'p-dropdown-sm font-semibold',
              getStatusClass(data.status),
            ]"
          >
            <template #dropdownicon>
              <img
                :src="getImageIcon('chevron-down.svg')"
                alt="Status Dropdown Icon"
                class="w-2.5 h-2 rounded-xl object-cover"
              />
            </template>
          </Dropdown>
        </template>

        <template #actions="{ data }">
          <div class="flex gap-2">
            <button
              class="border border-primary w-8 h-8 !rounded-[10px] bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="handleClickToDetails(data?.id)"
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

<style scoped>
.status-default {
  background-color: #f1f1f1 !important;
  color: #000 !important;
}

.status-working-survey-task {
  background-color: #e0f7fa !important;
  color: #00796b !important;
}

.status-working-request-task {
  background-color: #fff3e0 !important;
  color: #ef6c00 !important;
}

.status-working-appointment-task {
  background-color: #f3e5f5 !important;
  color: #6a1b9a !important;
}

.status-appointment-assigned {
  background-color: #e8f5e9 !important;
  color: #2e7d32 !important;
}

.status-request-assigned {
  background-color: #fce4ec !important;
  color: #c2185b !important;
}

.status-survey-assigned {
  background-color: #ede7f6 !important;
  color: #512da8 !important;
}

.status-occupied {
  background-color: #eeeeee !important;
  color: #616161 !important;
}

.status-site-survey {
  background-color: #f1f8e9 !important;
  color: #33691e !important;
}

.status-available {
  background-color: #e0f2f1 !important;
  color: #004d40 !important;
}
</style>
