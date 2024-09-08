<template>
    <div class="container-fluid company-details">
        <div class="row">
            <!-- Company Info and Stats -->
            <CompanyHeader />

            <!-- Company Details -->
            <div class="col-md-12 company-details-section">
                <div class="row">
                    <!-- Left Section (Company & Legal Details) -->
                    <div class="col-md-6">
                        <h5 class="fw-bold">Company Details</h5>
                        <div class="company-details-box gap-5">
                            <div class="details-item">
                                <p>Company ID</p>
                                <p>ID OFC 903823</p>
                            </div>
                            <div class="details-item">
                                <p>No. of Employees</p>
                                <p>50-100</p>
                            </div>
                            <div class="details-item">
                                <p>HQ Phone No.</p>
                                <p>+971 983402031</p>
                            </div>
                            <div class="details-item">
                                <p>HQ Email</p>
                                <p>johnthompson15@gmail.com</p>
                            </div>
                            <div class="details-item">
                                <p>Joined Date</p>
                                <p>Jan 2020</p>
                            </div>
                            <div class="details-item">
                                <p>Added By</p>
                                <p>Alex Smith</p>
                            </div>
                        </div>

                        <h5 class="fw-bold">Legal Documents Details</h5>
                        <div class="company-details-box gap-5">
                            <div class="details-item">
                                <p>Emirates ID</p>
                                <p>98734-3423-21</p>
                            </div>
                            <div class="details-item">
                                <p>TRN</p>
                                <p>98734-3423-21</p>
                            </div>
                            <div class="details-item">
                                <p>Trade License No. 1</p>
                                <p>98734-3423-21</p>
                            </div>
                            <div class="details-item">
                                <p>Trade License No. 2</p>
                                <p>98734-3423-21</p>
                            </div>
                        </div>

                        <h5 class="fw-bold">Pin Location</h5>
                        <div class="bg-white p-3">
                            <img :src="getImagePath('maps.png')" width="665" alt="Company Logo" />
                        </div>
                    </div>

                    <!-- Right Section (Admin/Manager & Location) -->
                    <div class="col-md-3">
                        <div class="d-flex justify-content-between">
                            <h5 class="fw-bold">Admin/Manager</h5>
                            <a href="#" class="add-new text-decoration-none">+ Add New</a>
                        </div>
                        <div class="company-details-box">
                            <div class="details-item gap-4">
                                <div class="grey-box">
                                    <p>Role - Admin</p>
                                    <p>Shaam Idress</p>
                                    <p class="mb-3">CEO</p>
                                    <p class="fw-bold">+971 983402031</p>
                                    <p>johnthompson15@gmail.com</p>
                                    <button type="button" class="btn btn-primary w-75 mt-3">
                                        View Details
                                    </button>
                                </div>
                                <div class="grey-box">
                                    <p>Role - Admin</p>
                                    <p>Shaam Idress</p>
                                    <p class="mb-3">CEO</p>
                                    <p class="fw-bold">+971 983402031</p>
                                    <p>johnthompson15@gmail.com</p>
                                    <button type="button" class="btn btn-primary w-75 mt-3">
                                        View Details
                                    </button>
                                </div>
                                <div class="grey-box">
                                    <p>Role - Admin</p>
                                    <p>Shaam Idress</p>
                                    <p class="mb-3">CEO</p>
                                    <p class="fw-bold">+971 983402031</p>
                                    <p>johnthompson15@gmail.com</p>
                                    <button type="button" class="btn btn-primary w-75 mt-3">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="d-flex justify-content-between">
                            <h5 class="fw-bold">Location</h5>
                            <a href="#" class="add-new text-decoration-none">+ Add New</a>
                        </div>
                        <div class="company-details-box">
                            <div class="details-item gap-4">
                                <div class="grey-box">
                                    <p>Main Office</p>
                                    <p>Jebel Ali Free Zone, Zip Code 61327</p>
                                    <button type="button" class="btn btn-primary w-75 mt-3">
                                        View Details
                                    </button>
                                </div>
                                <div class="grey-box">
                                    <p>Branch No.2</p>
                                    <p>Jebel Ali Free Zone, Zip Code 61327</p>
                                    <button type="button" class="btn btn-primary w-75 mt-3">
                                        View Details
                                    </button>
                                </div>
                                <div class="grey-box">
                                    <p>Branch No.3</p>
                                    <p>Jebel Ali Free Zone, Zip Code 61327</p>
                                    <button type="button" class="btn btn-primary w-75 mt-3">
                                        View Details
                                    </button>
                                </div>
                                <div class="grey-box">
                                    <p>Branch No.4</p>
                                    <p>Jebel Ali Free Zone, Zip Code 61327</p>
                                    <button type="button" class="btn btn-primary w-75 mt-3">
                                        View Details
                                    </button>
                                </div>
                            </div>
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
    </div>
</template>

<script setup>
import CompanyHeader from '../../components/CompanyHeader.vue';

const getImagePath = (imageName) => {
    return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};
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

.details-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.details-item p {
    margin: 0;
}

.details-item p:first-child {
    font-size: 12px;
    color: #5825eb;
}

.details-item p:nth-child(2) {
    font-size: 16px;
    font-weight: 600;
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
</style>
