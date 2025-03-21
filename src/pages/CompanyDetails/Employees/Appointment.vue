<template>
  <article class="user-profile">
    <ProfileHeader />
    <ProfileTabs />
  </article>
  <div class="p-3 mb-1 bg-white">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex gap-3">
        <button class="btn btn-primary rounded-3 px-3 py-2">All</button>
        <button class="btn btn-light rounded-3 px-3 py-2">Approved</button>
        <button class="btn btn-light rounded-3 px-3 py-2">Pending</button>
      </div>
      <div class="d-flex gap-3">
        <div class="d-flex align-items-center text-center position-relative">
          <input
            type="text"
            class="form-control border-0 py-2 px-3"
            style="background-color: #f2f4fb; width: 350px"
            placeholder="Search"
          />
          <i class="fas fa-search position-absolute end-0 me-3"></i>
        </div>
        <div class="d-flex align-items-center">
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
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>
            Organization <br />
            Name
          </th>
          <th>Title & Description</th>
          <th>Vertical</th>
          <th>Order Type</th>
          <th>
            Expected <br />
            Delivery Date & Time
          </th>
          <th>Payment</th>
          <th>Order Amount</th>
          <th>Payment State</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="vendor-table-body">
        <tr v-for="(vendor, index) in vendorData" :key="index">
          <td><input type="checkbox" class="form-check-input" /></td>
          <td>{{ vendor.id }}</td>
          <td>
            <img :src="getImagePath(vendor.companyImage)" />
            {{ vendor.companyName }}
          </td>
          <td>
            <img
              :src="getImagePath(vendor.managerImage)"
              alt="Profile Picture"
            />
            {{ vendor.ceoManager }}
          </td>
          <td class="mail" v-html="vendor.contactEmail"></td>
          <td>{{ vendor.totalRevenue }}</td>
          <td>{{ vendor.totalSpending }}</td>
          <td>
            <select
              class="form-select"
              :style="{ backgroundColor: vendor.statusColor }"
            >
              <option :value="vendor.status.toLowerCase()" selected>
                {{ vendor.status }}
              </option>
              <option value="banned">Banned</option>
              <option value="inactive">Inactive</option>
              <option value="monitory">Monitory</option>
            </select>
          </td>
          <td class="vertivelsubscribe">{{ vendor.verticalSubscribed }}</td>
          <td>{{ vendor.registeredDate }}</td>
          <td class="d-flex">
            <a
              :href="`/super-admin/company-details/appointment/details?companyId=${companyId}`"
              class="text-reset text-decoration-none"
            >
              <img class="px-1" :src="getImagePath('eye.png')" />
            </a>
            <img class="px-1" :src="getImagePath('delete.png')" />
            <img class="px-1" :src="getImagePath('share.png')" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import ProfileHeader from "../../../components/ProfileHeader.vue";
import ProfileTabs from "../../../components/ProfileTabs.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const companyId = computed(() => route.query.companyId);

import { ref } from "vue";
const getImagePath = (imageName) => {
  return new URL(`../../../assets/images2/${imageName}`, import.meta.url).href;
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
