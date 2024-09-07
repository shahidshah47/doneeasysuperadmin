<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="fs-4 fw-bold">Vendor</div>
            <div class="fs-4">
                <button class="btn btn-primary py-2 px-4">Add Vendor</button>
            </div>
        </div>

        <div class="row mb-4" id="dashboard-stats">
            <div v-for="(stat, index) in dashboardStats" :key="index" class="col-md-3 mb-md-0 mb-3">
                <div class="card border-0 shadow">
                    <div class="card-header bg-white fw-bold border-bottom-0 mt-1">{{ stat.title }}
                        <img class="float-end" :src="getImagePath('Frame 48096300.png')">
                    </div>
                    <div class="card-body d-flex justify-content-between">
                        <div>
                            <p class="fs-3 fw-bold mb-0">
                                {{ stat.number }}
                            </p>
                            <p class="fs-6 text-muted">{{ stat.timePeriod }}</p>
                        </div>
                        <div v-if="stat.percentage"
                            class="align-self-center fs-6 py-0 px-4 rounded-2 fw-bold text-center ms-2"
                            :style="{ backgroundColor: stat.percentageColor || '#fff', color: stat.textColor }">
                            {{ stat.percentage }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-3 mb-1 bg-white">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex gap-3">
                    <button class="btn btn-primary rounded-3 px-3 py-2">All</button>
                    <button class="btn btn-light rounded-3 px-3 py-2">Approved</button>
                    <button class="btn btn-light rounded-3 px-3 py-2">Pending</button>
                </div>
                <div class="d-flex gap-3">
                    <div class="d-flex align-items-center text-center position-relative">
                        <input type="text" class="form-control border-0 bg-body-secondary" placeholder="Search">
                        <i class="fas fa-search position-absolute end-0 me-2"></i>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-light bg-white border-0">
                            Filters by <i class="fas fa-filter"></i>
                        </button>
                        <span class="border-start mx-2" style="height: 24px;"></span>
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
                        <td><input type="checkbox" class="form-check-input"></td>
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
                            <select class="form-select" :style="{ backgroundColor: vendor.statusColor }">
                                <option :value="vendor.status.toLowerCase()" selected>{{ vendor.status }}</option>
                                <option value="banned">Banned</option>
                                <option value="inactive">Inactive</option>
                                <option value="monitory">Monitory</option>
                            </select>
                        </td>
                        <td class="vertivelsubscribe">{{ vendor.verticalSubscribed }}</td>
                        <td>{{ vendor.registeredDate }}</td>
                        <td class="d-flex">
                            <img class="px-1" :src="getImagePath('eye.png')" />
                            <img class="px-1" :src="getImagePath('delete.png')" />
                            <img class="px-1" :src="getImagePath('share.png')" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Utility function to generate image path
const getImagePath = (imageName) => {
    return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};

const dashboardStats = ref([
    {
        title: "Total Vendor",
        number: "16,445",
        percentage: "20%",
        timePeriod: "Lifetime",
        percentageColor: "#D6FFEF",
        textColor: "#00995C"
    },
    {
        title: "Active Members",
        number: "15,045",
        timePeriod: "Current Month"
    },
    {
        title: "New Subscribe",
        number: "1,200",
        percentage: "20%",
        timePeriod: "Current Month",
        percentageColor: "#D6FFEF",
        textColor: "#00995C"
    },
    {
        title: "Inactive",
        number: "200",
        percentage: "-12%",
        timePeriod: "Current Month",
        percentageColor: "#FFE5E5",
        textColor: "#FF5555"
    },


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

<style scoped>
.mail {
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    color: purple;
    padding: 8px;
    line-height: 1.5;
}

.mail:hover {
    background-color: #f0f0f0;
}

td {
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    color: #000000;
    padding: 8px;
    line-height: 1.5;
}

.table {
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
    padding-right: 33px;
}

.table thead th {
    background-color: #f2f4fb;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
}

.table tbody tr {
    background-color: #ffffff;
    text-align: center;
    border-radius: 22px;
}

.table th,
.table td {
    padding: 10px;
    text-align: left;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
}

.table td,
.table th {
    border: none;
}

.table td img {
    max-width: 70%;
    height: auto;
    margin-left: 11px;
}

.table td select {
    max-width: 100%;
    border: 1px solid #ddd;
    border-radius: 12px;
    outline: none;
    font-size: 14px;
    padding: 5px;
}

.table td button {
    margin: auto;
    align-items: center;
}

.table td .form-control {
    max-width: 100%;
    padding: 5px;
    font-size: 13px;
}

.table td .status-select {
    max-width: 100%;
    padding: 5px 15px;
    font-size: 15px;
    margin-right: 12px;
    margin-left: 14px;
    border-radius: 12px;
}

.table td {
    font-weight: 600;
    font-size: 14px;
}

.custom-button img,
.custom-button i {
    margin: 0;
}
</style>