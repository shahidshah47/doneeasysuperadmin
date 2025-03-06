<script setup>
import { ref, onMounted, nextTick } from "vue";
import api from "../api";
import DataTable from "datatables.net-bs5";
import { transformData } from "../utils/helper";
import { useRouter } from "vue-router";
const companiesData = ref([]);
const loading = ref(true);
const error = ref(null);

const router = useRouter();

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

const fetchData = async () => {
    try {
        const response = await api.get("/superadmin/dashboard?status=1", { headers: { Authorization: `Bearer ${localStorage?.getItem("token")}` } }); // Replace with your API URL
        const { data } = response.data;
        // console.log(transformData(data.data), "response data");
        companiesData.value = transformData(data.data);
    } catch (err) {
        error.value = "Error fetching data";
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const handleClickToDetails = (id) => {
    router.push("/super-admin/company-details/" + id + "/info");
};

onMounted(() => {
    fetchData();
});

nextTick(() => {
    setTimeout(() => {
        new DataTable("#example");
    }, 1000)
});

</script>

<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <div class="fs-4 fw-bold">Vendor</div>
            <div class="fs-4">
                <button class="btn btn-primary py-2 px-4">Add Vendor</button>
            </div>
        </div>

        <div class="row mb-4" id="dashboard-stats">
            <div v-for="(stat, index) in dashboardStats" :key="index" class="col-md-3">
                <div class="card border-0 shadow p-2">
                    <div class="card-header bg-white fw-bold border-bottom-0 mt-1">{{ stat.title }}
                        <img class="float-end" :src="getImagePath('Frame 48096300.png')">
                    </div>
                    <div class="card-body flex justify-between">
                        <div>
                            <p class="fs-3 fw-bold mb-0 !text-[3.5rem] leading-24">
                                {{ stat.number }}
                            </p>
                            <p class="fs-6 text-muted">{{ stat.timePeriod }}</p>
                        </div>
                        <div v-if="stat.percentage" class="self-center fs-6 p-2 rounded-2 fw-bold text-center ms-2"
                            :style="{ backgroundColor: stat.percentageColor || '#fff', color: stat.textColor }">
                            {{ stat.percentage }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-3 bg-white rounded-3 shadow">
            <div class="flex justify-between items-center">
                <div class="flex gap-3">
                    <button class="btn btn-primary rounded-3 px-3 py-2">All</button>
                    <button class="btn btn-light rounded-3 px-3 py-2">Approved</button>
                    <button class="btn btn-light rounded-3 px-3 py-2">Pending</button>
                </div>
                <div class="flex gap-3">
                    <div class="flex items-center text-center relative">
                        <input type="text" class="form-control border-0 py-2 px-3"
                            style="background-color: #F2F4FB; width: 350px;" placeholder="Search">
                        <i class="fas fa-search absolute end-0 me-3"></i>
                    </div>
                    <div class="flex items-center">
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
            <table id="example" class="table custom-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Company Name</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Contact / <br />Email</th>
                        <th>Total Revenue <br>Generated</th>
                        <th>Total <br />Spending</th>
                        <th>Status</th>
                        <th>List of vertical<br /> subscribed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="vendor-table-body">
                    <tr v-for="(vendor, index) in companiesData" :key="index">
                        <td><input type="checkbox" class="w-5 h-5"></td>
                        <td>{{ vendor.id }}</td>
                        <td class="font-theme-bold">
                            <div class="flex gap-2 items-center min-w-32">
                                <img :src="vendor.companyImage" class="m-0 w-10 !h-10 rounded-lg object-cover" />
                                <span class="line-clamp-1">{{ vendor.companyName }}</span>
                            </div>
                        </td>
                        <td class="font-theme-bold">
                            <div class="flex gap-2 items-center min-w-32">
                                <img :src="vendor.managerImage" class="m-0 w-10 !h-10 rounded-lg object-cover" />
                                <span class="line-clamp-1">{{ vendor.name }}</span>
                            </div>
                        </td>
                        <td>Admin</td>
                        <td class="mail" v-html="vendor.contactEmail"></td>
                        <td v-html="vendor.totalRevenue"></td>
                        <td v-html="vendor.totalSpending"></td>
                        <td>
                            <select class="form-select" :style="{ backgroundColor: vendor.statusColor }">
                                <option :value="vendor.status.toLowerCase()" selected>{{ vendor.status }}</option>
                                <option value="banned">Banned</option>
                                <option value="inactive">Inactive</option>
                                <option value="monitory">Monitory</option>
                            </select>
                        </td>
                        <td>{{ vendor.verticalSubscribed }}</td>
                        <td>
                            <div class="flex gap-2">
                                <button
                                    class="border border-primary p-1 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer">
                                    <i class="fa-regular fa-eye text-primary"></i>
                                </button>
                                <button
                                    class="border border-primary p-1 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer">
                                    <i class="fa-regular fa-trash-can text-primary"></i>
                                </button>
                                <button @click="handleClickToDetails(vendor?.id)"
                                    class="border border-primary p-1 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer">
                                    <i class="fa-regular fa-share-from-square text-primary"></i>
                                </button>
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

<style scoped>
.custom-table .mail {
    max-width: 80px !important;
}

.mail:hover {
    background-color: #f0f0f0;
}

td {
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
    background-color: #F2F4FB;
    font-weight: 700;
    font-size: 16px;
    color: #6E6E86;
}

.custom-table tbody tr {
    background-color: #ffffff;
    text-align: center;
    border-radius: 22px;
    font-weight: 700;
}

.custom-table th,
.custom-table td {
    padding: 10px;
    text-align: left;
    align-items: center;
    font-weight: 700;
}

.custom-table td,
.custom-table th {
    border: none;
    font-weight: 700;
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
    font-weight: 700;
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