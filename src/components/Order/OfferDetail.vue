<script setup>
import { ref, onMounted, nextTick } from "vue";
import api from "../../api";
// import DataTable from "datatables.net-bs5";
import { formatDate, formatTime } from "../../utils/helper";
import { useRoute, useRouter } from "vue-router";
import { useCompanyStore } from "../../store";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {
  Button,
  IconField,
  InputIcon,
  InputText,
  Paginator,
  useToast,
} from "primevue";
import { FilterMatchMode } from "@primevue/core/api";
import ThemeDatatable from "../../components/common/ThemeDatatable/ThemeDatatable.vue";
import Pagination from "../../components/common/Pagination/Pagination.vue";
import SearchAndFilter from "../../components/common/SearchAndFilter/SearchAndFilter.vue";
import { toRaw } from "vue";
import { watch } from "vue";
const offersData = ref([]);

const error = ref(null);
const statusBtn = ref(1);
const router = useRouter();
const toast = useToast();
const route = useRoute();

const pagination = ref({
  currentPage: 1,
  lastPage: 0,
  perPage: 20,
  total: 0,
  firstPageUrl: null,
  lastPageUrl: null,
  nextPageUrl: null,
  prevPageUrl: null,
  links: [],
});

const ORDER_TYPES = {
  1: "One-time",
  2: "Reoccurring",
};

const fetchData = async (id, page, perPage = 20) => {
  console.log(id, page, "id and page");
  try {
    let url = `/superadmin/order/offers/list?order_id=${id}&page=${page}&per_page=${perPage}`;

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("token")}`,
      },
    });

    if (response?.status === 200 && response.data) {
      const { data } = response;

      pagination.value = {
        currentPage: data.current_page ?? 1,
        lastPage: data.last_page ?? 1,
        perPage: data.per_page ?? perPage,
        total: data.total ?? 0,
        firstPageUrl: data.first_page_url ?? null,
        lastPageUrl: data.last_page_url ?? null,
        nextPageUrl: data.next_page_url ?? null,
        prevPageUrl: data.prev_page_url ?? null,
        links: data.links ?? [],
      };

      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.message || "Orders retrieved successfully",
        life: 3000,
      });

      offersData.value = Array.isArray(data.data)
        ? data.data.map((item) => ({
            id: item.id,
            organizationName: {
              name: item.company?.company_name || "N/A",
              logo: item.company?.company_logo?.file_path || "",
            },
            deliveryTime: formatTime(item.delivery_time) || "N/A",
            deliveryDate: formatDate(item.delivery_date) || "N/A",
            materialsCount: item.materials_count ?? 0,
            servicesCount: item.services_count ?? 0,
            type: ORDER_TYPES[item?.type] || "N/A",
            offers: item.grand_total ?? "0.00",
            actions: "View", // Placeholder, update with an actual handler if needed
          }))
        : [];
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error("Error in fetchData:", err);
  }
};

const handleClickToDetails = (id, type) => {
  // if (type === "Hot Orders") {
  //   router.push("/super-admin/order/" + id + "/details/hot-orders");
  // } else {
  //   router.push("/super-admin/order/" + id + "/details");
  // }
};

const columns = ref([
  { field: "id", header: "ID" },
  { field: "organizationName", header: ["Organisation ", "Name ID"] },

  { field: "deliveryTime", header: ["Proposed ", "Delivery Time"] },
  { field: "deliveryDate", header: ["Proposed ", " Delivery Date"] },
  { field: "materialsCount", header: ["No. ", "of Materials"] },
  { field: "servicesCount", header: ["No. ", "of Services"] },
  { field: "type", header: "Type" },
  { field: "offers", header: "Total Offer Value" },
  { field: "actions", header: "Action" },
]);

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "organizationName.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
});

onMounted(() => {
  nextTick(() => {
    const idFromUrl = route.params.id || route.path.split("/").pop();
    fetchData(idFromUrl, 1);
  });
});

const handlePerPage = async (props) => {
  fetchData(statusBtn.value, props[0], props[1]);
};
const typeClasses = {
  "One-time": "!text-accent-green !bg-green-200",
  Reoccurring: "!text-accent-green !bg-green-200",
  "Hot Orders": "!text-light-orange !bg-blush-100",
};

watch(offersData, (newData) => {
  console.log("orderData updated:", toRaw(newData));
});
</script>

<template>
  <div>
    <div class="p-4 bg-white rounded-3 shadow relative mt-4">
      <ThemeDatatable
        :value="offersData"
        v-model:filters="filters"
        :filterFields="['id', 'organizationName.name']"
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
            <div class="flex gap-3 items-center w-full col-span-4 col-start-7">
              <SearchAndFilter
                v-model="filters['global'].value"
                placeholder="Search"
              />
            </div>
          </div>
        </template>

        <template #id="{ data }"
          ><span>{{ data.id }}</span></template
        >

        <template v-slot:organizationName="{ data }">
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

        <template #deliveryTime="{ data }">
          <span>{{ data.deliveryTime }}</span>
        </template>

        <template #deliveryDate="{ data }">
          <span>{{ data.deliveryDate }}</span>
        </template>
        <template #materialsCount="{ data }">
          <span>{{ data.materialsCount }}</span>
        </template>
        <template #servicesCount="{ data }">
          <span>{{ data.servicesCount }}</span>
        </template>
        <template #type="{ data }">
          <span
            class="font-semibold px-2 py-1 rounded"
            :class="typeClasses[data.type]"
          >
            {{ data.type }}
          </span>
        </template>
        <template #offers="{ data }">
          <div class="flex items-center gap-2">
            <span class="text-vivid-purple !text-sm">AED</span>
            <span class="font-semibold text-dm-blue !text-xl">{{
              data.offers
            }}</span>
          </div>
        </template>

        <template #actions="{ data }">
          <div class="flex gap-2">
            <button
              class="border border-primary w-8 h-8 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="handleClickToDetails(data?.id)"
            >
              <img
                src="../../assets/image/icons/eye-2.svg"
                alt="eye-icon"
                class="w-4.5 h-4.5"
              />
            </button>
            <button
              class="border border-primary w-8 h-8 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="handleClickToDetails(data?.id)"
            >
              <img
                src="../../assets/image/icons/trash.svg"
                alt="eye-icon"
                class="w-4.5 h-4.5"
              />
            </button>
            <button
              class="border border-primary w-8 h-8 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
              @click="handleClickToDetails(data?.id)"
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
