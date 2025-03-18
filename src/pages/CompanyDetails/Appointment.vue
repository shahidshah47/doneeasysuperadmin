<template>
  <div class="container-fluid company-details">
    <div class="row">
      <!-- Company Info and Stats -->
      <CompanyHeader />
    </div>
    <div class="p-3 mb-1 bg-white rounded-3">
      <div class="d-flex justify-content-between align-items-center">
        <FilterButtons
          :filters="['All', 'In Progress', 'Schedule', 'Completed']"
          v-model:activeFilter="selectedFilter"
        />
        <div class="d-flex gap-3">
          <SearchInput v-model="searchTerm" placeholder="Search" />

          <div class="d-flex align-items-center">
            <FilterAction />
            <span
              class="w-0.5 bg-lavender-gray mx-2"
              style="height: 24px"
            ></span>
            <ColumnAction />
          </div>
        </div>
      </div>
      <DataTable :columns="columns" :data="tableData" :actions="actions" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CompanyHeader from "../../components/CompanyHeader.vue";

const getImagePath = (imageName) => {
  return new URL(`../../assets/image/icons/${imageName}`, import.meta.url).href;
};

const columns = [
  { key: "id", label: "ID" },
  { key: "organization", label: "Organization Name" },
  { key: "description", label: "Title & Description" },
  { key: "vertical", label: "Vertical" },
  { key: "orderType", label: "Order Type" },
  { key: "expectedDelivery", label: "Expected Delivery Date & Time" },
  { key: "payment", label: "Payment" },
  { key: "orderAmount", label: "Order Amount" },
  { key: "paymentState", label: "Payment State" },
];

const tableData = [
  {
    id: 98374861,
    org_image: "../../../assets/images2/Avatar (1).png",
    vertical_image: "../assets/images2/vertical_img.png",
    organization: "Acme Co.",
    description: "Need business consultant for my startup",
    vertical: "Event Management",
    orderType: "One-Time",
    expectedDelivery: "2020-05-17, 10:00 AM",
    payment: "Half Done",
    orderAmount: "AED 32,100",
    paymentState: "Cancelled",
  },
  {
    id: 93827462,
    organization: "Beta Corp.",
    description: "Marketing Strategy Development",
    vertical: "Marketing",
    orderType: "Subscription",
    expectedDelivery: "2024-07-15, 02:00 PM",
    payment: "Completed",
    orderAmount: "AED 50,000",
    paymentState: "Paid",
  },
];

const actions = [
  {
    icon: "eye.svg",
    action: (item) => console.log("View", item),
  },
  {
    icon: "trash.svg",
    action: (item) => console.log("Delete", item),
  },
  {
    icon: "share.svg",
    action: (item) => console.log("Share", item),
  },
];
</script>

<script>
import FilterButtons from "../../components/common/FilterButtons/FilterButtons.vue";
import SearchInput from "../../components/common/SearchInput/SearchInput.vue";
import FilterAction from "../../components/common/FilterAction/FilterAction.vue";
import ColumnAction from "../../components/common/ColumnAction/ColumnAction.vue";
import DataTable from "../../components/common/DataTable/DataTable.vue";

export default {
  components: {
    FilterButtons,
    SearchInput,
    FilterAction,
    ColumnAction,
    DataTable,
  },
  data() {
    return {
      searchTerm: "",
      selectedFilter: "All",
      items: [
        {
          id: 1,
          organization: "Acme Co.",
          description: "Business Consulting",
          status: "In Progress",
        },
        {
          id: 2,
          organization: "Beta Corp.",
          description: "Marketing Strategy",
          status: "Schedule",
        },
        {
          id: 3,
          organization: "Gamma Ltd.",
          description: "Tech Consulting",
          status: "Completed",
        },
      ],
    };
  },
  computed: {
    filteredItems() {
      if (this.selectedFilter === "All") {
        return this.items;
      }
      return this.items.filter((item) => item.status === this.selectedFilter);
    },
  },
};
</script>
