<template>
  <div class="company-details">
    <!-- Company Info and Stats -->
    <CompanyHeader />
    <div class="p-4 bg-white rounded-3 shadow relative">
      <ThemeDatatable
        :value="offersData"
        v-model:selection="selectedOffer"
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
                @update:statusBtn="handleFetchOffers"
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

        <template #order="{ data }">
          <div class="group flex items-start gap-1 flex-col relative">
            <span class="text-dm-blue font-semibold text-sm whitespace-nowrap">
              {{ data.order.name }}
            </span>

            <div
              class="absolute left-1/2 -top-20 transform -translate-x-1/2 w-max max-w-sm p-3 bg-white-100 !text-rich-navy border shadow-lavendar-card rounded hidden group-hover:block z-50"
              style="white-space: normal; overflow: visible"
            >
              {{ data.order.description }}
            </div>
          </div>
        </template>
        
        <template #orderType="{ data }">
          <div class="text-dm-blue font-semibold text-sm whitespace-nowrap">
            {{ data.orderType }}
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
        <template #offerSentDate="{ data }">
          <div
            class="text-dark-indigo-100 font-normal text-sm whitespace-nowrap"
          >
            {{ data.offerSentDate }}
          </div>
        </template>
        
        <template #status="{ data }">
          <div
            :class="`px-3 py-2 rounded-xl  font-semibold text-sm`"
            :style="{
              backgroundColor: data.status.bgColor,
              color: data.status.color,
            }"
          >
            {{ data.status.statusText }}
          </div>
        </template>

        <template #offerValue="{ data }">
          <div class="flex gap-2 items-center">
            <span class="text-primary font-semibold text-sm">AED</span>
            <span class="text-xl font-bold">{{ data.offerValue ?? 0 }}</span>
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
import { nextTick, onMounted, ref, watch } from "vue";
import CompanyHeader from "../../components/CompanyHeader.vue";
import ThemeDatatable from "../../components/common/ThemeDatatable/ThemeDatatable.vue";
import Pagination from "../../components/common/Pagination/Pagination.vue";
import { FilterMatchMode } from "@primevue/core/api";

import { useRoute, useRouter } from "vue-router";
import StatusButtons from "../../components/common/StatusButtons/StatusButtons.vue";
import SearchAndFilter from "../../components/common/SearchAndFilter/SearchAndFilter.vue";
import { convertOffersData, debounce, formatCompactDateTime, formatDate } from "../../utils/helper";

import { Paginator, useToast } from "primevue";
import api from "../../api";
const selectedOffer = ref();
const loading = ref(true);
const error = ref(null);
const statusBtn = ref(4);
const route = useRoute();
const router = useRouter();
const toast = useToast();
const searchTerm = ref("");
const offersData = ref([]);
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

const columns = ref([
  { field: "id", header: "ID" },
  { field: "organizationName", header: ["Organization ", "Name / ID"] },
  { field: "order", header: "Title & Description" },
  {
    field: "orderType",
    header: "Order Type",
    icon: "chevron-down.svg",
    iconWidth: 10,
    iconHeight: 10,
  },
  {
    field: "verticle",
    header: "Vertical",
    icon: "chevron-down.svg",
    iconWidth: 10,
    iconHeight: 10,
  },
  { field: "offerSentDate", header: "Offer Sent Date" },
  { field: "status", header: "Offer status" },
  { field: "offerValue", header: "Offer Value" },
  { field: "actions", header: "Action" },
]);

const copyUrl = (id) => {
  const location = window.location;
  navigator.clipboard.writeText(
    location.origin +
      "/super-admin/company-details/" +
      route.params.companyId +
      "/offers/" +
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

const handleClickToDetails = (data) => {
  let url =
    "/super-admin/company-details/" +
    route.params.companyId +
    "/offers/" +
    data.id +
    "/details";
  router.push(url);
};

const fetchData = async (id, page = 1, perPage = null, search = "") => {
  loading.value = true;
  try {
    let url = `/superadmin/user/offers?user_id=${308}&status=${id}&page=${page}&search=${search}`;
    if (perPage) {
      url = `/superadmin/user/offers?user_id=${308}&status=${id}&page=${page}&per_page=${perPage}`;
    }
    if (perPage && search !== "") {
      url = `/superadmin/user/offers?user_id=${308}&status=${id}&page=${page}&per_page=${perPage}&search=${search}`;
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
      console.log(data, "Data from offers");
      offersData.value = data.map((item) => convertOffersData(item));

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
  await fetchData(statusBtn.value, props[0], props[1], searchTerm.value);
};

const handleFetchOffers = (id) => {
  searchTerm.value = "";
  fetchData(id, 1);
  statusBtn.value = id;
};
</script>
