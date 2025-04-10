<template>
    <div class="company-details">
          <CompanyHeader />
        <div class="p-3 mb-1 bg-white rounded-3">
            <div class="d-flex justify-content-between align-items-center">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link cursor-pointer" :class="{ active: activeTab === 'earnings' }"
                            @click="activeTab = 'earnings'">Earnings</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link cursor-pointer" :class="{ active: activeTab === 'spending' }"
                            @click="activeTab = 'spending'">Spending</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link cursor-pointer" :class="{ active: activeTab === 'transactions' }"
                            @click="activeTab = 'transactions'">Transactions</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link cursor-pointer" :class="{ active: activeTab === 'soa' }"
                            @click="activeTab = 'soa'">SOA</a>
                    </li>
                </ul>
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

            <div v-if="activeTab === 'earnings'">
                <div class="row">
                    <div class="col-md-2">
                        <div class="card small border-0 rounded-4 shadow my-4" style="background-color: #F2F4FB;">
                            <div class="card-body p-3">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-0 text-primary fw-semibold">Total Revenue</p>
                                    <i class="fa-solid fa-bars-staggered fs-6 text-primary cursor-pointer"
                                        data-bs-toggle="modal" data-bs-target="#totalRevenueModal"></i>
                                </div>
                                <p class="mt-3 mb-0">
                                    <span class="fs-6">AED</span>
                                    <span class="fs-3 fw-bold ms-2">532,100</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Organization <br> Name</th>
                            <th>Title & Description</th>
                            <th>Vertical</th>
                            <th>Order Type</th>
                            <th>Expected <br> Delivery Date & Time</th>
                            <th>Payment</th>
                            <th>Order Amount</th>
                            <th>Payment State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="vendor-table-body">
                        <tr v-for="(vendor, index) in earningsData" :key="index">
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

            <div v-if="activeTab === 'spending'">
                <div class="row">
                    <div class="col-md-2">
                        <div class="card small border-0 rounded-4 shadow my-4" style="background-color: #F2F4FB;">
                            <div class="card-body p-3">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-0 text-primary fw-semibold">Total Revenue</p>
                                    <i class="fa-solid fa-bars-staggered fs-6 text-primary cursor-pointer"
                                        data-bs-toggle="modal" data-bs-target="#totalRevenueModal"></i>
                                </div>
                                <p class="mt-3 mb-0">
                                    <span class="fs-6">AED</span>
                                    <span class="fs-3 fw-bold ms-2">532,100</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card small border-0 rounded-4 shadow my-4" style="background-color: #F2F4FB;">
                            <div class="card-body p-3">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-0 text-primary fw-semibold">Total Revenue</p>
                                    <i class="fa-solid fa-bars-staggered fs-6 text-primary cursor-pointer"
                                        data-bs-toggle="modal" data-bs-target="#totalRevenueModal"></i>
                                </div>
                                <p class="mt-3 mb-0">
                                    <span class="fs-6">AED</span>
                                    <span class="fs-3 fw-bold ms-2">532,100</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card small border-0 rounded-4 shadow my-4" style="background-color: #F2F4FB;">
                            <div class="card-body p-3">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-0 text-primary fw-semibold">Total Revenue</p>
                                    <i class="fa-solid fa-bars-staggered fs-6 text-primary cursor-pointer"
                                        data-bs-toggle="modal" data-bs-target="#totalRevenueModal"></i>
                                </div>
                                <p class="mt-3 mb-0">
                                    <span class="fs-6">AED</span>
                                    <span class="fs-3 fw-bold ms-2">532,100</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card small border-0 rounded-4 shadow my-4" style="background-color: #F2F4FB;">
                            <div class="card-body p-3">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-0 text-primary fw-semibold">Total Revenue</p>
                                    <i class="fa-solid fa-bars-staggered fs-6 text-primary cursor-pointer"
                                        data-bs-toggle="modal" data-bs-target="#totalRevenueModal"></i>
                                </div>
                                <p class="mt-3 mb-0">
                                    <span class="fs-6">AED</span>
                                    <span class="fs-3 fw-bold ms-2">532,100</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card small border-0 rounded-4 shadow my-4" style="background-color: #F2F4FB;">
                            <div class="card-body p-3">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-0 text-primary fw-semibold">Total Revenue</p>
                                    <i class="fa-solid fa-bars-staggered fs-6 text-primary cursor-pointer"
                                        data-bs-toggle="modal" data-bs-target="#totalRevenueModal"></i>
                                </div>
                                <p class="mt-3 mb-0">
                                    <span class="fs-6">AED</span>
                                    <span class="fs-3 fw-bold ms-2">532,100</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Organization <br> Name</th>
                            <th>Title & Description</th>
                            <th>Vertical</th>
                            <th>Order Type</th>
                            <th>Expected <br> Delivery Date & Time</th>
                            <th>Payment</th>
                            <th>Order Amount</th>
                            <th>Payment State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="vendor-table-body">
                        <tr v-for="(vendor, index) in spendingData" :key="index">
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

            <div v-if="activeTab === 'transactions'">
                <div class="row">
                    <div class="col-md-2">
                        <div class="card small border-0 rounded-4 shadow my-4" style="background-color: #F2F4FB;">
                            <div class="card-body p-3">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-0 text-primary fw-semibold">Total Revenue</p>
                                    <i class="fa-solid fa-bars-staggered fs-6 text-primary cursor-pointer"
                                        data-bs-toggle="modal" data-bs-target="#totalRevenueModal"></i>
                                </div>
                                <p class="mt-3 mb-0">
                                    <span class="fs-6">AED</span>
                                    <span class="fs-3 fw-bold ms-2">532,100</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card small border-0 rounded-4 shadow my-4" style="background-color: #F2F4FB;">
                            <div class="card-body p-3">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-0 text-primary fw-semibold">Total Revenue</p>
                                    <i class="fa-solid fa-bars-staggered fs-6 text-primary cursor-pointer"
                                        data-bs-toggle="modal" data-bs-target="#totalRevenueModal"></i>
                                </div>
                                <p class="mt-3 mb-0">
                                    <span class="fs-6">AED</span>
                                    <span class="fs-3 fw-bold ms-2">532,100</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card small border-0 rounded-4 shadow my-4" style="background-color: #F2F4FB;">
                            <div class="card-body p-3">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-0 text-primary fw-semibold">Total Revenue</p>
                                    <i class="fa-solid fa-bars-staggered fs-6 text-primary cursor-pointer"
                                        data-bs-toggle="modal" data-bs-target="#totalRevenueModal"></i>
                                </div>
                                <p class="mt-3 mb-0">
                                    <span class="fs-6">AED</span>
                                    <span class="fs-3 fw-bold ms-2">532,100</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card small border-0 rounded-4 shadow my-4" style="background-color: #F2F4FB;">
                            <div class="card-body p-3">
                                <div class="d-flex justify-content-between">
                                    <p class="mb-0 text-primary fw-semibold">Total Revenue</p>
                                    <i class="fa-solid fa-bars-staggered fs-6 text-primary cursor-pointer"
                                        data-bs-toggle="modal" data-bs-target="#totalRevenueModal"></i>
                                </div>
                                <p class="mt-3 mb-0">
                                    <span class="fs-6">AED</span>
                                    <span class="fs-3 fw-bold ms-2">532,100</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Organization <br> Name</th>
                            <th>Title & Description</th>
                            <th>Vertical</th>
                            <th>Order Type</th>
                            <th>Expected <br> Delivery Date & Time</th>
                            <th>Payment</th>
                            <th>Order Amount</th>
                            <th>Payment State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="vendor-table-body">
                        <tr v-for="(vendor, index) in transactionsData" :key="index">
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

            <div v-if="activeTab === 'soa'">
                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Organization <br> Name</th>
                            <th>Title & Description</th>
                            <th>Vertical</th>
                            <th>Order Type</th>
                            <th>Expected <br> Delivery Date & Time</th>
                            <th>Payment</th>
                            <th>Order Amount</th>
                            <th>Payment State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="vendor-table-body">
                        <tr v-for="(vendor, index) in soaData" :key="index">
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
    </div>

    <div class="modal fade" id="totalRevenueModal" tabindex="-1" aria-labelledby="totalRevenueModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="totalRevenueModalLabel">Total Revenue</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <img src="../../assets/images2/total_revenue_graph.png" alt="total_revenue_graph" class="w-100">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CompanyHeader from '../../components/CompanyHeader.vue';

const getImagePath = (imageName) => {
    return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};

const activeTab = ref('earnings');

const earningsData = ref([
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
]);

const spendingData = ref([
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

const transactionsData = ref([
    {
        id: "OFC 005",
        companyName: "Globex Corporation",
        companyImage: "Avatar.png",
        ceoManager: "Jane Cooper",
        managerImage: "Avatar (2).png",
        contactEmail: "(239) 555-0108<br>xyz@gmail.com",
        totalRevenue: "AED 45,000",
        totalSpending: "AED 45,000",
        status: "Active",
        verticalSubscribed: 10,
        registeredDate: "2020-06-17<br>10:00 AM",
        statusColor: "lightgreen",
    },
    {
        id: "OFC 006",
        companyName: "Hooli Inc.",
        companyImage: "Avatar.png",
        ceoManager: "John Doe",
        managerImage: "Avatar (3).png",
        contactEmail: "(239) 555-0108<br>xyz@gmail.com",
        totalRevenue: "AED 60,000",
        totalSpending: "AED 60,000",
        status: "Banned",
        verticalSubscribed: 30,
        registeredDate: "2020-07-17<br>10:00 AM",
        statusColor: "#ffb09c",
    },
]);

const soaData = ref([
    {
        id: "SOA 001",
        companyName: "Initech Corporation",
        companyImage: "Avatar (1).png",
        ceoManager: "Michael Scott",
        managerImage: "Avatar (4).png",
        contactEmail: "(239) 555-0108<br>xyz@gmail.com",
        totalRevenue: "AED 25,000",
        totalSpending: "AED 25,000",
        status: "Inactive",
        verticalSubscribed: 5,
        registeredDate: "2020-08-17<br>10:00 AM",
        statusColor: "lightgrey",
    },
    {
        id: "SOA 002",
        companyName: "Acme Corporation",
        companyImage: "Avatar.png",
        ceoManager: "Elon Musk",
        managerImage: "Avatar (2).png",
        contactEmail: "(239) 555-0108<br>xyz@gmail.com",
        totalRevenue: "AED 75,000",
        totalSpending: "AED 75,000",
        status: "Monitory",
        verticalSubscribed: 40,
        registeredDate: "2020-09-17<br>10:00 AM",
        statusColor: "lightyellow",
    },
]);

</script>

<style scoped>
.nav-tabs {
    gap: 8px;
    border: none !important;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
    background: #5825EB !important;
    border: none !important;
    color: #fff !important;
    border-radius: 8px !important;
}

.nav-link {
    background: #F2F4FB !important;
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