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

        <div class="p-3 mb-1 bg-white rounded-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex gap-3">
                    <button class="btn btn-primary rounded-3 px-3 py-2">All</button>
                    <button class="btn btn-light rounded-3 px-3 py-2">Approved</button>
                    <button class="btn btn-light rounded-3 px-3 py-2">Pending</button>
                </div>
                <div class="d-flex gap-3">
                    <div class="d-flex align-items-center text-center position-relative">
                        <input type="text" class="form-control border-0 py-2 px-3"
                            style="background-color: #F2F4FB; width: 350px;" placeholder="Search">
                        <i class="fas fa-search position-absolute end-0 me-3"></i>
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
            <table class="table custom-table">
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
                        <td class="d-flex gap-1">
                            <div class="border border-primary p-1 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer"
                                data-bs-toggle="modal" data-bs-target="#analyticsModal">

                                <i class="fa-regular fa-eye text-primary"></i>
                            </div>
                            <div
                                class="border border-primary p-1 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer">

                                <i class="fa-regular fa-trash-can text-primary"></i>
                            </div>
                            <div
                                class="border border-primary p-1 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer">

                                <i class="fa-regular fa-share-from-square text-primary"></i>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="modal fade" id="analyticsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="analyticsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="analyticsModalLabel">Yearly Analytics</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-0">
                    <table class="table table-hover table-striped mb-0">
                        <thead class="bg-body-secondary">
                            <tr class="table-active text-center">
                                <th>Month</th>
                                <th>Total Vendor</th>
                                <th>Active Members</th>
                                <th>New Subscribe</th>
                                <th>Inactive</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in yearlyAnalyticsData" :key="index">
                                <td>{{ data.month }}</td>
                                <td class="text-center">{{ data.totalVendor }}
                                    <span class="text-success">
                                        <span class="border-0 rounded-2 p-1" style="background-color: #D6FFEF;">
                                            {{ data.totalVendorPercentage }}
                                        </span>
                                    </span>
                                </td>
                                <td class="text-center">{{ data.activeMembers }}
                                    <span class="text-success">
                                        <span class="border-0 rounded-2 p-1" style="background-color: #D6FFEF;">
                                            {{ data.activeMembersPercentage }}
                                        </span>
                                    </span>
                                </td>
                                <td class="text-center">{{ data.newSubscribe }}
                                    <span class="text-success">
                                        <span class="border-0 rounded-2 p-1" style="background-color: #D6FFEF;">
                                            {{ data.newSubscribePercentage }}
                                        </span>
                                    </span>
                                </td>
                                <td class="text-center">{{ data.inactive }}
                                    <span class="text-danger">
                                        <span class="border-0 rounded-2 p-1" style="background-color: #FFE5E5;">
                                            {{ data.inactivePercentage }}
                                        </span>
                                    </span>
                                </td>
                            </tr>
                            <tr class="table-active text-center fw-bold">
                                <td>Total</td>
                                <td>1747025.14</td>
                                <td>26557581.00</td>
                                <td>1747025.14</td>
                                <td>1747025.14</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
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

const yearlyAnalyticsData = ref([
    {
        month: "January",
        totalVendor: "39,7892",
        activeMembers: "15,045",
        newSubscribe: "1,200",
        inactive: "200",
        totalVendorPercentage: "20%",
        activeMembersPercentage: "20%",
        newSubscribePercentage: "20%",
        inactivePercentage: "-12%",
    },
    {
        month: "February",
        totalVendor: "39,7892",
        activeMembers: "15,045",
        newSubscribe: "1,200",
        inactive: "200",
        totalVendorPercentage: "20%",
        activeMembersPercentage: "20%",
        newSubscribePercentage: "20%",
        inactivePercentage: "-12%",
    },
    {
        month: "March",
        totalVendor: "39,7892",
        activeMembers: "15,045",
        newSubscribe: "1,200",
        inactive: "200",
        totalVendorPercentage: "20%",
        activeMembersPercentage: "20%",
        newSubscribePercentage: "20%",
        inactivePercentage: "-12%",
    },
    {
        month: "April",
        totalVendor: "39,7892",
        activeMembers: "15,045",
        newSubscribe: "1,200",
        inactive: "200",
        totalVendorPercentage: "20%",
        activeMembersPercentage: "20%",
        newSubscribePercentage: "20%",
        inactivePercentage: "-12%",
    },
    {
        month: "May",
        totalVendor: "39,7892",
        activeMembers: "15,045",
        newSubscribe: "1,200",
        inactive: "200",
        totalVendorPercentage: "20%",
        activeMembersPercentage: "20%",
        newSubscribePercentage: "20%",
        inactivePercentage: "-12%",
    },
    {
        month: "June",
        totalVendor: "39,7892",
        activeMembers: "15,045",
        newSubscribe: "1,200",
        inactive: "200",
        totalVendorPercentage: "20%",
        activeMembersPercentage: "20%",
        newSubscribePercentage: "20%",
        inactivePercentage: "-12%",
    },
    {
        month: "July",
        totalVendor: "39,7892",
        activeMembers: "15,045",
        newSubscribe: "1,200",
        inactive: "200",
        totalVendorPercentage: "20%",
        activeMembersPercentage: "20%",
        newSubscribePercentage: "20%",
        inactivePercentage: "-12%",
    },
    {
        month: "August",
        totalVendor: "39,7892",
        activeMembers: "15,045",
        newSubscribe: "1,200",
        inactive: "200",
        totalVendorPercentage: "20%",
        activeMembersPercentage: "20%",
        newSubscribePercentage: "20%",
        inactivePercentage: "-12%",
    },
    {
        month: "September",
        totalVendor: "39,7892",
        activeMembers: "15,045",
        newSubscribe: "1,200",
        inactive: "200",
        totalVendorPercentage: "20%",
        activeMembersPercentage: "20%",
        newSubscribePercentage: "20%",
        inactivePercentage: "-12%",
    },
    {
        month: "October",
        totalVendor: "39,7892",
        activeMembers: "15,045",
        newSubscribe: "1,200",
        inactive: "200",
        totalVendorPercentage: "20%",
        activeMembersPercentage: "20%",
        newSubscribePercentage: "20%",
        inactivePercentage: "-12%",
    },
    {
        month: "November",
        totalVendor: "39,7892",
        activeMembers: "15,045",
        newSubscribe: "1,200",
        inactive: "200",
        totalVendorPercentage: "20%",
        activeMembersPercentage: "20%",
        newSubscribePercentage: "20%",
        inactivePercentage: "-12%",
    },
    {
        month: "December",
        totalVendor: "39,7892",
        activeMembers: "15,045",
        newSubscribe: "1,200",
        inactive: "200",
        totalVendorPercentage: "20%",
        activeMembersPercentage: "20%",
        newSubscribePercentage: "20%",
        inactivePercentage: "-12%",
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

.custom-table {
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
    padding-right: 33px;
}

.custom-table thead th {
    background-color: #f2f4fb;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
}

.custom-table tbody tr {
    background-color: #ffffff;
    text-align: center;
    border-radius: 22px;
}

.custom-table th,
.custom-table td {
    padding: 10px;
    text-align: left;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
}

.custom-table td,
.custom-table th {
    border: none;
}

.custom-table td img {
    max-width: 70%;
    height: auto;
    margin-left: 11px;
}

.custom-table td select {
    max-width: 100%;
    border: 1px solid #ddd;
    border-radius: 12px;
    outline: none;
    font-size: 14px;
    padding: 5px;
}

.custom-table td button {
    margin: auto;
    align-items: center;
}

.custom-table td .form-control {
    max-width: 100%;
    padding: 5px;
    font-size: 13px;
}

.custom-table td .status-select {
    max-width: 100%;
    padding: 5px 15px;
    font-size: 15px;
    margin-right: 12px;
    margin-left: 14px;
    border-radius: 12px;
}

.custom-table td {
    font-weight: 600;
    font-size: 14px;
}

.custom-button img,
.custom-button i {
    margin: 0;
}

.text-success {
    font-size: 10px;
}

.text-danger {
    font-size: 10px;
}
</style>