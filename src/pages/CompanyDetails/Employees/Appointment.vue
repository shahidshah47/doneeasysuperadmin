<template>
  <article class="user-profile">
    <ProfileHeader :userDetails="userDetails" />
    <ProfileTabs />
  </article>
  
</template>

<script setup>
import ProfileHeader from "../../../components/ProfileHeader.vue";
import ProfileTabs from "../../../components/ProfileTabs.vue";
import { useRoute, useRouter } from "vue-router";
import Dropdown from "primevue/dropdown";
import { FilterMatchMode } from "@primevue/core/api";
import SearchAndFilter from "../../../components/common/SearchAndFilter/SearchAndFilter.vue";
import StatusButtons from "../../../components/common/StatusButtons/StatusButtons.vue";
const route = useRoute();
const companyId = computed(() => route.query.companyId);

import { computed, nextTick, onMounted, ref } from "vue";
import Pagination from "../../../components/common/Pagination/Pagination.vue";
import { Paginator, useToast } from "primevue";
import ThemeDatatable from "../../../components/common/ThemeDatatable/ThemeDatatable.vue";

const loading = ref(true);
const error = ref(null);
const statusBtn = ref(1);
const router = useRouter();
const userDetails = ref(null);
const toast = useToast();
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

const fetchData = async (id, page) => {
  console.log(id, page, "id and page");
};

const handleClickToDetails = () => {
  const companyId = route.params.companyId;
  if (companyId) {
    router.push({
      path: `/super-admin/company-details/${companyId}/employees/appointment/details`,
    });
  }
};

const handleFetchOrder = (id, page) => {
  fetchData(id, 1);
  statusBtn.value = id;
};

const selectedCompany = ref();

const statusOptions = ["All", "On-Location", "Waiting", "Cancelled"];
const columns = ref([
  { field: "id", header: "ID" },
  { field: "description", header: "Title & Description" },
  { field: "company", header: "Company Name" },
  { field: "manager", header: "Manager" },
  { field: "contact", header: "Contact" },
  {
    field: "vertical",
    header: "Vertical",
    icon: "chevron-down.svg",
    iconWidth: 10,
    iconHeight: 10,
  },
  { field: "delivery_date", header: ["Expected ", "Delivery Date & Time"] },
  { field: "status", header: "Status" },
  { field: "actions", header: "Action" },
]);

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "company.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
});

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

const updateStatus = async (data) => {};

onMounted(() => {
  nextTick(() => {
    console.log("Hardcoded data loaded:", appointmentData.value);
  });
});

onMounted(() => {
  nextTick(() => {
    fetchData(1, 1);
  });
});

const getImageUrl = (imagePath) => {
  return new URL(`../../../assets/images2/${imagePath}`, import.meta.url).href;
};

const getImageIcon = (imagePath) => {
  return new URL(`../../../assets/image/icons/${imagePath}`, import.meta.url)
    .href;
};

const appointmentData = ref([
  {
    id: "OFC 001",
    manager: { name: "John Doe", image: "Avatar.png" },
    company: { name: "Big Kahuna Ltd.", image: "Avatar.png" },
    vertical: { name: "Event Management", image: "Avatar.png" },
    description: "Need business consultant for my startup",
    managerImage: "Avatar (5).png",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "On-Location",
    verticalSubscribed: 16,
    delivery_date: "2020-05-17, 10:00 AM",
    contact: { phone: "(239) 555-0108", email: "alice.johnson@example.com" },
  },
  {
    id: "OFC 002",
    manager: { name: "John Doe", image: "Avatar.png" },
    company: { name: "Big Kahuna Ltd.", image: "Avatar.png" },
    vertical: { name: "Event Management ", image: "Avatar.png" },
    description: "Need business consultant for my startup",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "On-Location",
    verticalSubscribed: 23,
    delivery_date: "2020-05-17, 10:00 AM",

    contact: { phone: "(239) 555-0108", email: "alice.johnson@example.com" },
  },
]);
</script>

<style scoped>
.user-profile {
  border-radius: 16px;
  background-color: #fcfdff;
  font-family: Averta, sans-serif;
  padding: 22px 22px 0;
  width: 100%;
  margin-bottom: 20px;
}
</style>
