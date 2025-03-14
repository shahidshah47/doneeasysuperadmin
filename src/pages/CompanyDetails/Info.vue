<template>
    <div class="company-details">
        <!-- Company Info and Stats -->
        <CompanyHeader />

        <!-- Company Details -->
        <div class="grid grid-cols-12 gap-6">
            <!-- Left Section (Company & Legal Details) -->
            <div class="col-span-6 flex flex-col gap-4">
                <div class="flex flex-col w-full gap-1">
                    <h5 class="fw-bold">Company Details</h5>
                    <div class="bg-white rounded-xl p-4 flex gap-4 flex-wrap relative">
                        <div class="position-absolute top-0 end-0 me-2 mt-2">
                            <button type="button" class="text-reset" @click="openCreateModal()">
                                <i class="fa-solid fa-pen text-primary text-decoration-underline"></i>
                            </button>
                        </div>
                        <div v-for="(company, index) in companyDetails" class="flex-1/3">
                            <p class="theme-label">{{ company?.label }}</p>
                            <p class="font-theme-bold m-0">{{ company?.value || "---" }}</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col w-full gap-1">
                    <h5 class="fw-bold">Legal Documents Details</h5>
                    <div class="bg-white rounded-xl p-4 flex gap-4 flex-wrap relative">
                        <div class="position-absolute top-0 end-0 me-2 mt-2 cursor-pointer" data-bs-toggle="modal"
                            data-bs-target="#legalDocsModal">
                            <i class="fa-solid fa-pen text-primary text-decoration-underline"></i>
                        </div>
                        <div v-for="(legalDoc, index) in legalDocsDetails" class="flex-1/3">
                            <p class="theme-label">{{ legalDoc?.label }}</p>
                            <p class="font-theme-bold m-0">{{ legalDoc?.value || "---" }}</p>
                        </div>
                        <div v-for="(trade, index) in store.companyData?.user?.trade_licenses" :key="index"
                            class="flex-1/3">
                            <p class="theme-label">Trade License No. {{ trade.id }}</p>
                            <p class="font-theme-bold m-0">{{ trade?.license_number }}</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col w-full gap-1">
                    <div class="flex justify-between items-center">
                        <h5 class="fw-bold">Pin Location</h5>
                        <p class="m-0">
                            <i class="fa-solid fa-pen text-primary text-decoration-underline cursor-pointer"
                                data-bs-toggle="modal" data-bs-target="#locationModal"></i>
                            <i class="fa-solid fa-share text-primary ml-2"></i>
                        </p>
                    </div>
                    <div class="bg-white p-3 position-relative rounded-xl">
                        <img :src="getImagePath('maps.png')" class="rounded-xl w-full" alt="Company Logo" />
                    </div>
                </div>
            </div>

            <!-- Right Section (Admin/Manager & Location) -->
            <div class="col-span-3">
                <div class="flex justify-between">
                    <h5 class="fw-bold">Admin/Manager</h5>
                    <a href="#" class="text-primary text-sm text-decoration-none" data-bs-toggle="modal"
                        data-bs-target="#addAdminModal">+ Add New</a>
                </div>
                <div class="bg-white p-4 rounded-xl flex flex-col gap-3 min-h-[10rem] max-h-[20rem] overflow-auto">
                    <div v-for="(user, index) in store?.companyData?.company?.users"
                        class="p-4 rounded-xl bg-[#f8f9fa] flex flex-col gap-3" :key="index">
                        <p class="theme-label">Role - Admin</p>
                        <div class="inline-flex gap-1 flex-col">
                            <p class="m-0 font-theme-bold">{{ user?.name }}</p>
                            <p class="m-0">{{ user?.designation }}</p>
                        </div>
                        <div class="inline-flex gap-1 flex-col">
                            <h4 class="!text-base font-theme-bold mb-0">+971 {{ user?.mobile_number }}</h4>
                            <h4 class="!text-base mb-0">{{ user?.email }}</h4>
                        </div>
                        <button type="button" class="btn btn-primary w-50">
                            View Details
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-span-3">
                <div class="d-flex justify-content-between">
                    <h5 class="fw-bold">Location</h5>
                    <a href="#" class="text-primary text-sm text-decoration-none">+ Add New</a>
                </div>
                <div class="bg-white p-4 rounded-xl flex flex-col gap-3">
                    <div v-for="(address, index) in store?.companyData?.company?.addresses"
                        class="p-4 rounded-xl bg-[#f8f9fa] flex flex-col gap-3" :key="index">
                        <div class="inline-flex gap-1 flex-col">
                            <p class="theme-label">Main Office</p>
                            <p class="font-theme-bold m-0">{{ address?.address }}</p>
                        </div>
                        <button type="button" class="btn btn-primary w-50">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="col-md-12 d-flex justify-content-center align-items-center gap-3 mt-3">
            <p class="fw-bold mb-0">Quick Actions</p>
            <button class="btn btn-outline-primary px-4">Edit</button>
            <button class="btn btn-outline-primary px-4">Delete</button>
            <button class="btn btn-outline-primary px-4">Organization Mode</button>
            <button class="btn btn-outline-primary px-4">Share Profile</button>
        </div>
    </div>

    <div class="modal fade" id="legalDocsModal" tabindex="-1" aria-labelledby="legalDocsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="legalDocsModalLabel">Legal Documents Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <!-- Tabs for sections -->
                    <ul class="nav nav-pills mb-3 gap-3" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-license1-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-license1" type="button" role="tab" aria-controls="pills-license1"
                                aria-selected="true">Trade License 1</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-license2-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-license2" type="button" role="tab" aria-controls="pills-license2"
                                aria-selected="false">Trade License 2</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-emiratesid-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-emiratesid" type="button" role="tab"
                                aria-controls="pills-emiratesid" aria-selected="false">Emirates ID</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-trn-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-trn" type="button" role="tab" aria-controls="pills-trn"
                                aria-selected="false">TRN</button>
                        </li>
                    </ul>

                    <!-- Tab content -->
                    <div class="tab-content" id="pills-tabContent">
                        <!-- License 1 Content -->
                        <div class="tab-pane fade show active" id="pills-license1" role="tabpanel"
                            aria-labelledby="pills-license1-tab">
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label for="licenseNo" class="form-label">License No</label>
                                    <input type="text" class="form-control" id="licenseNo" value="DMCC-070547"
                                        placeholder="please enter license number ">
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="address" class="form-label">Address</label>
                                    <input type="text" class="form-control" id="address"
                                        value="Bur Dubai Dubai Investments Park 1"
                                        placeholder="please enter complete address">
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="legalForm" class="form-label">Legal Form</label>
                                    <input type="text" class="form-control" id="legalForm"
                                        value="شركة ذات مسؤولية محدودة" placeholder="please enter your legal form">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label for="cbisNo" class="form-label">Cbls No.</label>
                                    <input type="text" class="form-control" id="cbisNo" value="11457714"
                                        placeholder="please enter Cbls No.">
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="expiryDate" class="form-label">Expiry Date</label>
                                    <input type="text" class="form-control" id="expiryDate" value="2024-09-14"
                                        placeholder="please enter Expiry Date">
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="phoneNo" class="form-label">Phone No</label>
                                    <input type="text" class="form-control" id="phoneNo" value="+973 375412"
                                        placeholder="please enter Phone No">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label for="licenseStatus" class="form-label">License Status</label>
                                    <input type="text" class="form-control" id="licenseStatus" value="فعال"
                                        placeholder="Please enter License Status">
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="establishmentDate" class="form-label">Establishment Date</label>
                                    <input type="text" class="form-control" id="establishmentDate" value="2015-09-15"
                                        placeholder="please enter Establishment Date">
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="licenseAuthority" class="form-label">License Authority</label>
                                    <input type="text" class="form-control" id="licenseAuthority"
                                        value="مركز في السلعة المتحدة	" placeholder="please enter License Authority">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="activityArabic" class="form-label">Activity Name Arabic</label>
                                    <input type="text" class="form-control" id="activityArabic"
                                        value="Delivery Services">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="businessArabic" class="form-label">Business Name Arabic</label>
                                    <input type="text" class="form-control" id="businessArabic"
                                        value="إنستاشوب دي إم سي سي">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="businessName" class="form-label">Business Name</label>
                                    <input type="text" class="form-control" id="businessName" value="INSTASHOP DMCC">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="businessZone" class="form-label">Business Zone</label>
                                    <select class="form-select" id="businessZone">
                                        <option value="1" selected>Dubai</option>
                                        <option value="2">Saudi Arabia</option>
                                        <option value="3">Abu Dhabi</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="activity" class="form-label">Activity</label>
                                <textarea class="form-control" id="activity"
                                    rows="2">Software House, Computer Systems Consultancies, Web-Design, Internet Content Provider (DMCC), Delivery</textarea>
                            </div>
                        </div>

                        <!-- Add content for other tabs as necessary -->
                        <div class="tab-pane fade" id="pills-license2" role="tabpanel"
                            aria-labelledby="pills-license2-tab">
                            <!-- Add your fields for Trade License 2 here -->
                        </div>

                        <div class="tab-pane fade" id="pills-emiratesid" role="tabpanel"
                            aria-labelledby="pills-emiratesid-tab">
                            <!-- Add your fields for Emirates ID here -->
                        </div>

                        <div class="tab-pane fade" id="pills-trn" role="tabpanel" aria-labelledby="pills-trn-tab">
                            <!-- Add your fields for TRN here -->
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary"
                        style="text-transform: none !important;">Commit</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="locationModal" tabindex="-1" aria-labelledby="locationModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content border-0 rounded-4">
                <div class="modal-header border-0 rounded-top-4" style="background-color: #F2F4FB;">
                    <h5 class="modal-title" id="locationModalLabel">Location</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="area" class="form-label">Business Zone</label>
                            <select class="form-select" id="area">
                                <option selected>Area Name</option>
                                <option value="1">Dubai</option>
                                <option value="2">Saudi Arabia</option>
                                <option value="3">Abu Dhabi</option>
                            </select>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="city" class="form-label">City</label>
                            <select class="form-select" id="city">
                                <option value="1" selected>Dubai</option>
                                <option value="2">Saudi Arabia</option>
                                <option value="3">Abu Dhabi</option>
                            </select>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="zipCode" class="form-label">Zip Code</label>
                            <select class="form-select" id="zipCode">
                                <option value="1">23023</option>
                                <option value="2">23024</option>
                                <option value="3">23025</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary text-uppercase"
                        data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="addAdminModal" tabindex="-1" aria-labelledby="addAdminModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content border-0 rounded-4">
                <div class="modal-header border-0 rounded-top-4" style="background-color: #F2F4FB;">
                    <h5 class="modal-title" id="addAdminModalLabel">Add Admin/Manager</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <!-- Profile Picture -->
                        <div class="col-12 text-center">
                            <div class="profile-picture mb-3">
                                <img :src="getImagePath('profile-pic.webp')" class="img-fluid rounded-circle"
                                    alt="Profile Picture">
                                <button class="btn btn-light btn-sm mt-2" @click="uploadPicture">
                                    <i class="fa fa-camera"></i> Change Photo
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Form Inputs -->
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="fullName" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="fullName" v-model="admin.fullName"
                                placeholder="Enter full name">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="designation" class="form-label">Designation</label>
                            <input type="text" class="form-control" id="designation" v-model="admin.designation"
                                placeholder="Enter designation">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="mobileNo" class="form-label">Mobile No</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="mobileNo" v-model="admin.mobileNo"
                                    placeholder="Enter mobile number">
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="emailAddress" class="form-label">Email Address</label>
                            <input type="email" class="form-control" id="emailAddress" v-model="admin.emailAddress"
                                placeholder="Enter email address">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="trn" class="form-label">TRN</label>
                            <input type="text" class="form-control" id="trn" v-model="admin.trn"
                                placeholder="Enter TRN">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="role" class="form-label">Select your role</label>
                            <select class="form-select" id="role" v-model="admin.role">
                                <option value="Sales Manager">Sales Manager</option>
                                <option value="HR Manager">HR Manager</option>
                                <option value="Operations Manager">Operations Manager</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="password" class="form-label">Password</label>
                            <div class="input-group position-relative">
                                <input type="password" class="form-control" id="password" v-model="admin.password"
                                    placeholder="Enter password">
                                <span class="position-absolute top-0 end-0 me-3" style="margin-top: 3%;"
                                    @click="togglePasswordVisibility('password')">
                                    <i class="fa fa-eye text-primary"></i>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <div class="input-group position-relative">
                                <input type="password" class="form-control" id="confirmPassword"
                                    v-model="admin.confirmPassword" placeholder="Confirm password">
                                <span class="position-absolute top-0 end-0 me-3" style="margin-top: 3%;"
                                    @click="togglePasswordVisibility('confirmPassword')">
                                    <i class="fa fa-eye text-primary"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Document Upload Section -->
                    <div class="upload-section mt-4">
                        <div class="d-flex align-items-center justify-content-center my-4">
                            <div class="flex-grow-1 border-bottom"></div>
                            <span class="mx-2 text-muted fw-bold">Upload Documents</span>
                            <div class="flex-grow-1 border-bottom"></div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Upload Emirates ID (Optional)</label>
                            <div class="row">
                                <div class="col-md-6" v-for="file in admin.emiratesId" :key="file.name">
                                    <div class="d-flex align-items-center border border-1 rounded-4">
                                        <!-- Icon and File Name Section -->
                                        <div
                                            class="bg-success-subtle p-2 rounded-start-4 d-flex justify-content-center">
                                            <img :src="getImagePath(file.icon)" alt="File Icon" class="img-fluid"
                                                style="width: 30px;">
                                        </div>
                                        <span class="ms-3">{{ file.name }}</span>

                                        <!-- Icons Section -->
                                        <div class="ms-auto me-3 d-flex align-items-center gap-2 cursor-pointer">
                                            <i class="fa fa-eye"></i>
                                            <i class="fa fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Upload Visa (Optional)</label>
                            <div class="row">
                                <div class="col-md-6" v-for="file in admin.visa" :key="file.name">
                                    <div class="d-flex align-items-center border border-1 rounded-4">
                                        <!-- Icon and File Name Section -->
                                        <div
                                            class="bg-success-subtle p-2 rounded-start-4 d-flex justify-content-center">
                                            <img :src="getImagePath(file.icon)" alt="File Icon" class="img-fluid"
                                                style="width: 30px;">
                                        </div>
                                        <span class="ms-3">{{ file.name }}</span>

                                        <!-- Icons Section -->
                                        <div class="ms-auto me-3 d-flex align-items-center gap-2 cursor-pointer">
                                            <i class="fa fa-eye"></i>
                                            <i class="fa fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="addAdmin">Add</button>
                </div>
            </div>
        </div>

    </div>

    
    <!-- Modal Component -->
    <CompanyForm :showModal="showModal" :companyData="editingCompany" @submit="handleSubmit" @close="showModal = false" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import CompanyHeader from '../../components/CompanyHeader.vue';
import { useRoute } from 'vue-router';
import api from '../../api';
import { useCompanyStore } from '../../store';
import { formatToMonthDayYear, getCompanyDetails, getLegalDocsDetails } from "../../utils/helper";
import CompanyForm from '../../components/CompanyForm/CompanyForm.vue';

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const companyDetails = ref(null);
const legalDocsDetails = ref(null);
const store = useCompanyStore();
const editingCompany = ref(null);
const showModal = ref(false);

const openCreateModal = () => {
    editingCompany.value = { ...store?.companyData?.company };
    showModal.value = true;
};

const handleSubmit = async (company) => {
    try {
        const response = await api.post("/superadmin/company/details/" + store?.companyData?.user?.organization_id, {
            company_name: company.name,
            company_size: company.companySize,
            phone: company.phone,
            email: company.email
        });
        if (response.status === 200) {
            companyDetails.value = getCompanyDetails(response?.data?.data);
            showModal.value = false;
            editingCompany.value = null;
        }
    } catch (err) {
        console.error(err);
        error.value = "Error fetching data";
    } finally {
        loading.value = false;
    }
};

const getImagePath = (imageName) => {
    return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};

const admin = ref({
    fullName: 'John Thompson',
    designation: 'CEO',
    mobileNo: '+971 93427012',
    emailAddress: 'johnthompson15@gmail.com',
    trn: '98734-3423-21',
    role: 'Sales Manager',
    password: '**********',
    confirmPassword: '**********',
    emiratesId: [
        { name: 'Front.jpg', icon: 'file-icon.png', size: '3.2mb' },
        { name: 'Back.jpg', icon: 'file-icon.png', size: '3.2mb' },
    ],
    visa: [
        { name: 'Visa.jpg', icon: 'file-icon.png', size: '3.2mb' },
    ],
});

const togglePasswordVisibility = (field) => {
    const input = document.getElementById(field);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
};

const uploadPicture = () => {
    alert('Upload profile picture clicked');
};

const uploadEmiratesId = () => {
    alert('Upload Emirates ID clicked');
};

const uploadVisa = () => {
    alert('Upload Visa clicked');
};

const addAdmin = () => {
    alert('Admin/Manager added');
};

const fetchCompanyDetailsById = async (id) => {
    try {
        const response = await api.get("/superadmin/user/details/" + id);
        if (response.status === 200) {
            store.setCompanyData(response.data?.data);
            const user = response?.data?.data?.user;
            companyDetails.value = getCompanyDetails(response?.data?.data?.company);
            legalDocsDetails.value = getLegalDocsDetails(user);
        }
    } catch (err) {
        error.value = "Error fetching data";
        console.error(err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    window.scroll(0, 0);
    fetchCompanyDetailsById(route.params.companyId);
});
</script>

<style scoped>
.company-details-box {
    background-color: #fcfdff;
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.grey-box {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.add-new {
    color: #5825eb;
}

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
    background: #5825eb !important;
    border: none !important;
    color: #fff !important;
}

.nav-pills .nav-link {
    background-color: #F2F4FB !important;
    border: none !important;
    color: #000 !important;
}

.form-control {
    border: none !important;
    background-color: #F2F4FB !important;
    border-radius: 10px !important;
    padding: 10px 20px !important;
}

.form-select {
    border: none !important;
    background-color: #F2F4FB !important;
    border-radius: 10px !important;
    padding: 10px 20px !important;
}

.profile-picture img {
    width: 120px;
    height: 120px;
    object-fit: cover;
}

.upload-file {
    display: flex;
    align-items: center;
    margin-right: 15px;
}

.btn-upload {
    font-size: 24px;
    color: #5A5A5A;
    border: 1px dashed #D8D8D8;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-upload:hover {
    background-color: #f0f0f0;
}

.form-label {
    font-size: 14px;
    font-weight: 600;
}
</style>
