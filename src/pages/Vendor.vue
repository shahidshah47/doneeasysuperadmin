<template>
    <div class="row dashboard-stats d-flex" id="dashboard-stats">
        <div v-for="(stat, index) in dashboardStats" :key="index" class="col-md-3">
            <div class="carddesign">
                <div class="card-header">{{ stat.title }}
                    <img class="float-right" :src="getImagePath('Frame 48096300.png')">
                </div>
                <div class="card-body">
                    <div class="number">{{ stat.number }}</div>
                    <div v-if="stat.percentage" class="percentage"
                        :style="{ backgroundColor: stat.percentageColor || '#fff' }">
                        {{ stat.percentage }}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="vendor-list">
        <div class="search-filter">
            <div class="left-buttons">
                <button class="btn btn-primary3">All</button>
                <button class="btn btn-grey">Approved</button>
                <button class="btn btn-grey">Pending</button>
            </div>
            <div class="right-section d-flex">
                <div class="search-bar mx-4">
                    <input type="text" placeholder="Search">
                    <i class="fas fa-search"></i>
                </div>
                <div class="filter-buttons">
                    <button class="btn btn-light">
                        <i class="fas fa-filter"></i>
                        Filters by
                        <img :src="getImagePath('Frame 48096300.png')">
                    </button>
                    <button class="btn btn-light">
                        <i class="fas fa-columns"></i>
                        Columns
                        <img :src="getImagePath('Component 9.png')">
                    </button>
                </div>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Company Name</th>
                    <th>CEO / Manager</th>
                    <th>Contact / Email</th>
                    <th>Total Revenue <br>Generated</th>
                    <th>Total Spending</th>
                    <th>Status</th>
                    <th>List of vertical subscribed</th>
                    <th>Registered on DE date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="vendor-table-body">
                <tr v-for="(vendor, index) in vendorData" :key="index">
                    <td><input type="checkbox"></td>
                    <td>{{ vendor.id }}</td>
                    <td>
                        <img :src="getImagePath(vendor.companyImage)" />
                        {{ vendor.companyName }}
                    </td>
                    <td>
                        <img :src="getImagePath(vendor.managerImage)" alt="Profile Picture" />
                        {{ vendor.ceoManager }}
                    </td>
                    <td class="mail" v-html="vendor.contactEmail"></td>
                    <td>{{ vendor.totalRevenue }}</td>
                    <td>{{ vendor.totalSpending }}</td>
                    <td>
                        <select class="form-control" :style="{ backgroundColor: vendor.statusColor }">
                            <option :value="vendor.status.toLowerCase()" selected>{{ vendor.status }}
                            </option>
                            <option value="banned">Banned</option>
                            <option value="inactive">Inactive</option>
                            <option value="monitory">Monitory</option>
                        </select>
                    </td>
                    <td class="vertivelsubscribe">{{ vendor.verticalSubscribed }}</td>
                    <td>{{ vendor.registeredDate }}</td>
                    <td style="display: flex; flex-direction: row;">
                        <img class="px-1" :src="getImagePath('eye.png')" />
                        <img class="px-1" :src="getImagePath('delete.png')" />
                        <img class="px-1" :src="getImagePath('share.png')" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Utility function to generate image path
const getImagePath = (imageName) => {
    return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};

const dashboardStats = ref([
    { title: "Total Vendor", number: "16,445", percentage: "20%", percentageColor: "lightgreen" },
    { title: "Active Members", number: "15,045" },
    { title: "New Subscribe", number: "1,200", percentage: "20%", percentageColor: "lightgreen" },
    { title: "Inactive", number: "200", percentage: "-12%", percentageColor: "rgba(255, 0, 0, 0.919)" },
]);

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