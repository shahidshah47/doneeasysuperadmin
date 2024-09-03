<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar Section -->
            <div class="col-md-1 sidebar">
                <div class="logo py-3 d-flex justify-content-center">
                    <img :src="getImagePath('Logo.png')" alt="Logo">
                </div>
                <div class="py-2">
                    <ul class="nav d-flex justify-content-center" id="sidebar-menu">
                        <li v-for="(item, index) in sidebarItems" :key="index" class="nav-item">
                            <a class="nav-link py-2" href="#">
                                <img :src="getImagePath(item.image)" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="py-3">
                    <img :src="getImagePath('Frame 48096327.png')">
                </div>
            </div>

            <!-- Content Section -->
            <div class="col-md-11 content py-3">
                <div>
                    <div class="header">
                        <div class="date">Feb 13, 2023
                            <div class="greeting">Hey, Jane Cooper</div>
                        </div>
                        <div class="left-side-header d-flex gap-3">
                            <button class="btn btn-primary">Add Vendor</button>
                            <button class="btn btn-light">
                                <img :src="getImagePath('Messages.png')">
                            </button>
                            <button class="btn btn-light">
                                <img :src="getImagePath('Messages (2).png')">
                            </button>
                            <button class="btn btn-light">
                                <img :src="getImagePath('notification.png')">
                            </button>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="vendor-title">Vendor</div>
                        <div class="addvendorbuttons">
                            <button class="btn btn-primary">Add Vendor</button>
                        </div>
                    </div>

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

const sidebarItems = ref([
    { icon: "fas fa-user-circle", image: "Component 11.png" },
    { icon: "fas fa-wallet", image: "Component 12.png" },
    { icon: "fas fa-history", image: "Component 9.png" },
    { icon: "fas fa-cog", image: "Component 20.png" },
    { icon: "fas fa-sign-out-alt", image: "Component 8.png" },
    { icon: "fas fa-history", image: "Component 9.png" },
    { icon: "fas fa-cog", image: "Component 20.png" },
    { icon: "fas fa-cog", image: "Component 20.png" },
    { icon: "fas fa-user-circle", image: "Component 11.png" },
    { icon: "fas fa-wallet", image: "Component 20.png" },
    { icon: "fas fa-history", image: "Component 9.png" },
    { icon: "fas fa-cog", image: "Component 20.png" },
]);

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

<style scoped>
body {
    font-family: "Montserrat", sans-serif;
    background-color: #f2f4fb;
}

.row {
    display: flex;
    margin-right: 0;
    margin-left: 0;
    justify-content: space-between;
}

.container-fluid .row {
    margin-right: 0;
    margin-left: 0;
}

.container-fluid {
    padding-right: 0;
    padding-left: 0;
}

.sidebar {
    background: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    border-right: 1px solid #ddd;
    height: 100vh;
}

#sidebar-menu {
    background-color: #f2f4fb;
    border-radius: 66px;
    width: min-content;
}

.nav-link {
    color: #ffffff;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: background-color 0.3s;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 600;
    line-height: 12px;
}

.nav-link:hover {
    background-color: #ffffff;
    border-radius: 77px;
}

.content {
    display: flex;
    justify-content: center;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.date {
    color: #000000;
    font-size: 16px;
    margin-top: -6px;
}

.greeting {
    font-size: 20px;
    font-weight: bold;
    margin-top: 2px;
}

.vendor-title {
    margin-top: 20px;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
}

.left-side-header {
    display: flex;
    gap: 10px;
}

.addvendorbuttons {
    font-size: 21px;
}

.addvendorbuttons .btn {
    font-size: 18px;
    padding: 12px 24px;
    border-radius: 10px;
    height: auto;
    min-width: 150px;
}

.addvendorbuttons .btn:hover {
    background-color: #000000;
    color: #ffffff;
}

.search-filter {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: none;
}

.btn {
    border-radius: 22px;
    border: none;
    cursor: pointer;
    font-size: small;
    transition: background-color 0.3s, box-shadow 0.3s;
    margin: 0;
}

.btn-primary3 {
    background-color: hwb(271 4% 24%);
    color: white;
    margin: 10px;
}

.search-filter .btn+.btn {
    margin-left: 2px;
}

.btn-primary:hover {
    background-color: #000000;
    color: white;
}

.buttons button {
    margin: 0px;
}

.search-filter {
    display: flexbox;
    flex-direction: row;
}

.dashboard-stats {
    margin-bottom: 20px;
}

.dashboard-stats .carddesign {
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-stats .card-header {
    background-color: #fff;
    color: #000000;
    font-weight: 600;
    border-bottom: none;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-top: 5px;
}

.dashboard-stats .card-body {
    background-color: #fff;
    padding: 17px;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.dashboard-stats .number {
    font-size: 28px;
    font-weight: bold;
}

.dashboard-stats .percentage {
    font-size: 14px;
    color: #ffffff;
    padding: 5px 5px;
    border-radius: 12px;
    display: inline-block;
    font-weight: bold;
    text-align: center;
    margin-left: 10px;
}

.vendor-list {
    margin-bottom: 5px;
    background-color: #fff;
    padding: 10px 10px;
}

.btn-grey {
    background-color: #6c757d;
    color: #ffffff;
    border: none;
    border-radius: 12px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.search-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.search-filter .btn-primary3 {
    background-color: blue;
    color: #ffffff;
    border: none;
    border-radius: 12px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.search-bar {
    display: flex;
    align-items: center;
}

.search-bar input {
    padding: 6px 12px;
    border-radius: 12px;
    border: 1px solid #ddd;
    font-size: large;
}

.search-bar i {
    margin-left: -30px;
    cursor: pointer;
    font-size: 12px;
    color: #000000;
}

.filter-buttons {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.btn:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn:active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
    .sidebar {
        display: none;
    }

    .content {
        width: 100%;
    }

    .search-bar {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .dashboard-stats .col-md-3 {
        width: 100%;
        margin-bottom: 20px;
    }
}

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

@media (max-width: 768px) {
    .sidebar {
        display: none;
    }

    .content {
        width: 100%;
    }

    .search-bar {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .dashboard-stats .col-md-3 {
        width: 100%;
        margin-bottom: 20px;
    }
}
</style>
