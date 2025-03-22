<script setup>
import { ref, onMounted, nextTick, onUnmounted, computed } from "vue";
import api from "../api";
// import DataTable from "datatables.net-bs5";
import { convertUserData, transformData } from "../utils/helper";
import { useRoute, useRouter } from "vue-router";
import { useCompanyStore } from "../store";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { IconField, InputIcon, InputText } from "primevue";
import { FilterMatchMode } from '@primevue/core/api';
import { productsContants } from "../utils/constants";

import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Button from "primevue/button";



const store = useCompanyStore();
const companiesData = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const statusBtn = ref(1);
const tableRef = ref(null);
const entriesPerPage = ref(10); // Default entries per page
const paginationInfoData = ref(null);

const router = useRouter();
const route = useRoute();

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
    }
]);

const fetchData = async (id) => {
    try {
        const response = await api.get(`/superadmin/dashboard?status=${id}`, { 
            headers: { 
                Authorization: `Bearer ${localStorage?.getItem("token")}` 
            } 
        });

        if (response?.status === 200) {
            const { data } = response.data;
            companiesData.value = data.data?.map(item => convertUserData(item));
            store.setCompanies(transformData(data.data));
        }
    } catch (err) {
        error.value = "Error fetching data";
        console.error("Error in fetchData:", err);
    }
};

const handleClickToDetails = (id) => {
    router.push("/super-admin/company-details/" + id + "/info");
};

onMounted(() => { 
    fetchData(1);
});

const handleFetchVendor = (id) => {
    fetchData(id);
    statusBtn.value = id;
};

const selectedCompany = ref();
const copyUrl = (id) => {
    const location = window.location;
    navigator.clipboard.writeText(location.origin + "/super-admin/company-details/" + id + "/info");
};

const statusOptions = ["Active", "Deactivated", "Inactive", "Monitory", "Banned"];
const filters = ref({
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
    "companyName.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
    "fullName.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
    role: { value: null, matchMode: FilterMatchMode.CONTAINS },
    contact: { value: null, matchMode: FilterMatchMode.CONTAINS },
    totalRevenue: { value: null, matchMode: FilterMatchMode.GREATER_THAN },
    totalSpending: { value: null, matchMode: FilterMatchMode.GREATER_THAN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verticlesSubscribed: { value: null, matchMode: FilterMatchMode.GREATER_THAN },
    registeredOn: { value: null, matchMode: FilterMatchMode.DATE_IS },
});
const getStatusClass = (status) => {
    switch (status) {
        case "Active":
            return { backgroundColor: "#D6FFEF", color: "#00995C" }; // Green
        case "Deactivated":
            return { backgroundColor: "#E7E7EB", color: "#0E0D35" }; // Yellow
        case "Inactive":
            return { backgroundColor: "#E7E7EB", color: "#575672" }; // Red
        case "Monitory":
            return { backgroundColor: "#FCEED9", color: "#DC8B13" }; // Red
        case "Banned":
            return { backgroundColor: "#FFE5E5", color: "#FF5555" }; // Red
        default:
            return { backgroundColor: "#f1f1f1", color: "#000" }; // Default Gray
    }
};
const handleDelete = async (id) => {
    try {
        const response = await api.post(`/superadmin/del-user`, { user_id: id });
        console.log(response, "res delete");
        if (response.status === 200) {
            
        }
    } catch (err) {
        error.value = "Error fetching data";
        console.error("Error in fetchData:", err);
    }
};
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

        <div class="p-4 bg-white rounded-3 shadow relative">
            <DataTable 
                :value="companiesData" 
                v-model:selection="selectedCompany" 
                dataKey="id" 
                v-model:filters="filters" 
                paginator 
                :rows="5"
                :globalFilterFields="['companyName.name', 'fullName.name', 'role']"
                :rowsPerPageOptions="[5, 10, 20, 50]" 
                tableStyle="min-width: 50rem" 
                class="custom-datatable"
                paginatorTemplate="CurrentPageReport RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Entries">
                <template #header>
                    <div class="flex justify-between items-center mb-2">
                        <div class="flex gap-3">
                            <button @click="handleFetchVendor(1)" :class="`btn rounded-3 px-3 py-2 active:bg-primary ${statusBtn === 1 ? 'bg-primary text-white' : 'btn-light'}`">All</button>
                            <button @click="handleFetchVendor(2)" :class="`btn rounded-3 px-3 py-2 active:bg-primary ${statusBtn === 2 ? 'bg-primary text-white' : 'btn-light'}`">Approved</button>
                            <button @click="handleFetchVendor(3)" :class="`btn rounded-3 px-3 py-2 active:bg-primary ${statusBtn === 3 ? 'bg-primary text-white' : 'btn-light'}`">Pending</button>
                        </div>
                        <div class="flex gap-3">
                            <div class="flex justify-end">
                                <IconField>
                                    <InputText v-model="filters['companyName.name'].value" placeholder="Search" class="!bg-[#F2F4FB] border-0 min-w-[20rem] px-3 py-2.5" />
                                    <InputIcon>
                                        <i class="fas fa-search"></i>
                                    </InputIcon>
                                </IconField>
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
                </template>
                <template #empty> No vendors found. </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column field="id" header="ID" />
                <Column field="companyName" header="Company Name">
                    <template #body="slotProps">
                        <div class="flex items-center gap-2">
                            <img :src="slotProps.data.companyName.logo" alt="Company Logo" class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover" />
                            <span class="font-semibold text-dm-blue">{{ slotProps.data.companyName.name }}</span>
                        </div>
                    </template>
                </Column>

                <Column field="fullName" header="Full Name">
                    <template #body="slotProps">
                        <div class="flex items-center gap-2">
                            <img :src="slotProps.data.fullName.profilePicture" alt="Company Logo" class="min-w-10 max-w-10 min-h-10 max-h-10 w-full rounded-xl object-cover" />
                            <span class="font-semibold text-dm-blue">{{ slotProps.data.fullName.name }}</span>
                        </div>
                    </template>
                </Column>

                <Column field="role" header="Role">
                    <template #body="slotProps">
                        <span class="font-semibold">{{ slotProps.data.role }}</span>
                    </template>
                </Column>

                <Column field="contact" header="Contact / Email">
                    <template #body="slotProps">
                        <div class="mail">
                            <span class="font-semibold text-dm-blue">{{ slotProps.data.contact.mobile }}</span> <br />
                            <span class="text-primary font-semibold">{{ slotProps.data.contact.email }}</span>
                        </div>
                    </template>
                </Column>

                <Column field="totalRevenue" header="Total Revenue Generated">
                    <template #body="slotProps">
                        <div class="flex gap-2 items-center">
                            <span class="text-primary font-semibold text-sm">AED</span>
                            <span class="text-2xl font-bold">{{ slotProps.data.totalRevenue ?? 0 }}</span>
                        </div>
                    </template>
                </Column>

                <Column field="totalSpending" header="Total Spending">
                    <template #body="slotProps">
                        <div class="flex gap-2 items-center">
                            <span class="text-primary font-semibold text-sm">AED</span>
                            <span class="text-2xl font-bold">{{ slotProps.data.totalSpending ?? 0 }}</span>
                        </div>
                    </template>
                </Column>

                <Column field="status" header="Status">
                    <template #body="slotProps">
                        <Dropdown v-model="slotProps.data.status" :options="statusOptions" :style="getStatusClass(slotProps.data.status)"
                            class="p-dropdown-sm font-bold"></Dropdown>
                    </template>
                </Column>

                <Column field="verticalsSubscribed" header="List of Verticals Subscribed" class="w-40">
                    <template #body="slotProps">
                        <span class="px-3 py-2 rounded-xl font-semibold text-[#0E0D35] bg-light-lilac">{{ slotProps.data.verticalsSubscribed }}</span>
                    </template>
                </Column>

                <Column field="registeredOn" header="Registered on DE Date" class="w-32">
                    <template #body="slotProps">
                        <span>{{ new Date(slotProps.data.registeredOn).toLocaleDateString() }}</span>
                    </template>
                </Column>

                <Column field="actions" header="Action">
                    <template #body="slotProps">
                        <div class="flex gap-2">
                            <button class="border border-primary p-2 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer" @click="handleClickToDetails(slotProps.data?.id)">
                                <i class="fa-regular fa-eye text-primary"></i></button>
                            <button class="border border-primary p-2 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer" @click="handleDelete(slotProps.data?.id)">
                                <i class="fa-regular fa-trash-can text-primary"></i></button>
                            <button class="border border-primary p-2 rounded-3 bg-transparent d-flex justify-content-center align-items-center cursor-pointer" @click="copyUrl(slotProps.data.id)">
                                <i class="fa-regular fa-share-from-square text-primary"></i></button>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

</template>

<style scoped>

/* Custom styles for DataTable */
#example_wrapper .dataTables_filter {
    float: none;
    text-align: left;
}

#example_wrapper .dataTables_length {
    float: none;
    text-align: right;
}

#example_wrapper .dataTables_paginate {
    float: none;
    text-align: center;
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