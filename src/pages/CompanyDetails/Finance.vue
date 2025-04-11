<template>
  <div class="container-fluid company-details">
    <div class="row">
      <CompanyHeader />
    </div>
    <div class="p-3 mb-1 bg-white rounded-3">
      <FinanceTable
        v-if="activeTab === 'earnings'"
        :data="earningsData"
        :getImagePath="getImagePath"
      />
    </div>
  </div>

  <div
    class="modal fade !bg-slate-gray backdrop-blur-[6px]"
    id="totalRevenueModal"
    tabindex="-1"
    aria-labelledby="totalRevenueModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content !rounded-2xl">
        <div
          class="modal-header !bg-light-lilac flex items-center justify-between px-6 py-1"
        >
          <h5
            class="!text-dm-blue !text-base !font-semibold m-0"
            id="totalRevenueModalLabel"
          >
            Total Revenue
          </h5>
          <button
            type="button !outline-none"
            class="btn"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark text-dm-blue"></i>
          </button>
        </div>

        <div class="modal-body">
          <img
            src="../../assets/images2/total_revenue_graph.png"
            alt="total_revenue_graph"
            class="w-100"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CompanyHeader from "../../components/CompanyHeader.vue";
import FinanceTable from "../../components/FinanceTable/FinanceTable.vue";

const getImagePath = (imageName) => {
  return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};

const activeTab = ref("earnings");

const earningsData = ref([
  {
    id: "OFC 001",
    companyName: "ABS Company Pvt.",
    companyImage: "Avatar.png",
    date: "2025-03-28T11:42:02.000000Z",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "Active",
    verticalSubscribed: 16,
    registeredDate: "2020-05-17<br>10:00 AM",
    statusColor: "lightgreen",
    vertical: { name: "Event Management", image: "Avatar.png" },
    type: "Marketing",
    paymentStatus: "Pending",
    amount: "3000",
  },
  {
    id: "OFC 002",
    companyName: "Big Kahuna Ltd.",
    companyImage: "Avatar.png",
    date: "2025-03-28T11:42:02.000000Z",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "Banned",
    verticalSubscribed: 23,
    registeredDate: "2020-05-17<br>10:00 AM",
    statusColor: "#ffb09c",
    vertical: { name: "Event Management", image: "Avatar.png" },
    type: "Marketing",
    paymentStatus: "Pending",
    amount: "3000",
  },
]);
</script>

<style scoped>
.modal-header {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: none;
}
.modal-content {
  border-radius: 12px;
}
.nav-tabs {
  gap: 8px;
  border: none !important;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  background: #5825eb !important;
  border: none !important;
  color: #fff !important;
  border-radius: 8px !important;
}

.nav-link {
  background: #f2f4fb !important;
  border: none !important;
  color: #000 !important;
  border-radius: 8px !important;
}

.table thead th {
  background-color: #f2f4fb;
  color: #333;
  font-weight: bold;
  border-bottom: none !important;
}

.table thead th:hover {
  background-color: #e1e4ea;
}
</style>
