<script setup>
import {nextTick, onMounted, ref, watch} from "vue";

import { useRoute, useRouter } from "vue-router";

import { FilterMatchMode } from "@primevue/core/api";
import {
  Paginator,
  useToast
} from "primevue";
import Dropdown from "primevue/dropdown";
import api from "../../api";
import Pagination from "../../components/common/Pagination/Pagination.vue";
import ThemeDatatable from "../../components/common/ThemeDatatable/ThemeDatatable.vue";
import CompanyHeader from "../../components/CompanyHeader.vue";
import { useCompanyStore } from "../../store";
import StatusButtons from "../../components/common/StatusButtons/StatusButtons.vue";
import SearchAndFilter from "../../components/common/SearchAndFilter/SearchAndFilter.vue";
import {convertEmployeeUsersData, debounce} from "../../utils/helper.js";

const store = useCompanyStore();
// const companiesData = ref([]);
const selectedCompany = ref();
const loading = ref(true);
const error = ref(null);
const statusBtn = ref('');
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

const fetchData = async (id, page = 1, perPage = null, search = '') => {
  console.log(id, page, "id and page");
  try {
    let url = `/superadmin/user/users?user_id=${route.params.companyId}&page=${page}&search=${search}`;
    if (id !== "") {
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
      console.log(data, "Data from users");
      companiesData.value = data.map(item => convertEmployeeUsersData(item));
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error("Error in fetchData:", err);
  } finally {
    loading.value = false;
  }
};

const handleClickToDetails = () => {
  const companyId = route.params.companyId;
  if (companyId) {
    router.push({
      path: `/super-admin/company-details/${companyId}/employees/details`,
    });
  }
};

const handleFetchUsers = (id, page) => {
  searchTerm.value = '';
  fetchData(id, 1);
  statusBtn.value = id;
};

const handlePerPage = async (props) => {
  await fetchData(statusBtn.value, props[0], props[1], searchTerm.value);
};


const statusOptions = ["All", "Active", "Pending", "Cancelled"];
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
    class: "w-40"
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

const getWorkStatusClass = (status) => {
  switch (status) {
    case "Occupied":
      return "!text-accent-green !bg-green-200";
    case "Site Survey":
      return "!text-accent-green !bg-green-200";
    case "Available":
      return "!text-accent-green !bg-green-200";
    default:
      return "!text-accent-green !bg-green-200";
  }
};

const updateStatus = async (data) => {};

const companiesData = ref([
  {
    id: 1,
    employeeName: { name: "John Doe", image: "Avatar.png" },
    role: "Software Engineer",
    vertical: 44,
    status: "Active",
    contact: { phone: "+1234567890", email: "john.doe@example.com" },
    currentWork: "Occupied",
    projectDetail: {
      name: "Business Setup",
      client: "Client Name",
      end_date: "11/02.2023",
      image: "Avatar.png",
    },
  },
  // {
  //   id: 2,
  //   employeeName: { name: "Jane Smith", image: "Avatar.png" },
  //   role: "Product Manager",
  //   vertical: 23,
  //   status: "Active",
  //   contact: { phone: "+9876543210", email: "jane.smith@example.com" },
  //   currentWork: "Site Survey",
  //   projectDetail: {
  //     name: "Business Setup",
  //     client: "Client Name",
  //     end_date: "11/02.2023",
  //     image: "Avatar.png",
  //   },
  // },
  // {
  //   id: 3,
  //   employeeName: { name: "Alice Johnson", image: "Avatar.png" },
  //   role: "Data Scientist",
  //   vertical: 33,
  //   status: "Active",
  //   contact: { phone: "+1928374650", email: "alice.johnson@example.com" },
  //   currentWork: "Occupied",
  //   projectDetail: {
  //     name: "Business Setup",
  //     client: "Client Name",
  //     end_date: "11/02.2023",
  //     image: "Avatar.png",
  //   },
  // },
]);

const debouncedFetch = debounce((val) => {
  fetchData(statusBtn.value, 1, null, val)
}, 500);

watch(() => searchTerm.value, (newVal, oldValue) => {
  debouncedFetch(newVal);
});

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
              <SearchAndFilter
                v-model="searchTerm"
                placeholder="Search"
              />
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
            :options="['Occupied', 'Site Survey', 'Available']"
            @change="updateStatus(data)"
            :class="[
              'p-dropdown-sm !font-semibold',
              getWorkStatusClass(data.status),
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
          <div class="flex items-center gap-2">
            <img
              :src="getImageUrl(data.projectDetail.image)"
              alt="Project Image"
              class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover"
            />
            <div class="">
              <span class="!font-semibold">
                {{ data.projectDetail.name }}
              </span>
              <div class="!text-neutral-70 !text-sm">
                <span class="">
                  {{ data.projectDetail.client }}
                </span>
                -
                <span class="">
                  {{ data.projectDetail.end_date }}
                </span>
                <button class="!text-vivid-purple !text-sm font-semibold">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </template>

        <template #status="{ data }">
          <Dropdown
            v-model="data.status"
            :options="statusOptions"
            @change="updateStatus(data)"
            :style="getStatusClass(data.status)"
            class="p-dropdown-sm !font-semibold"
            ><template #dropdownicon>
              <img
                :src="getImageIcon('chevron-down.svg')"
                alt="Employee Image"
                class="w-2.5 h-2 rounded-xl object-cover"
              /> </template
          ></Dropdown>
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
