<template>
    <div class="container-fluid company-details">
        <div class="row">
            <!-- Company Info and Stats -->
            <div class="col-md-12 company-header">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="company-info">
                        <div class="d-flex align-items-center">
                            <img :src="getImagePath('LoveClipLogo.png')" class="company-logo" alt="Company Logo" />
                            <div class="company-details-text">
                                <div class="company-status">
                                    <span class="badge badge-success mb-2">Active</span>
                                </div>
                                <h3>ABS Company Pvt Ltd</h3>
                                <p>ID OFC 903823</p>
                            </div>
                        </div>
                    </div>
                    <div class="company-stats d-flex gap-5">
                        <div class="stat-item">
                            <p>Total Revenue Generated</p>
                            <h5>AED 32,100</h5>
                        </div>
                        <div class="stat-item">
                            <p>No. of Order Completed</p>
                            <h5>2190</h5>
                        </div>
                        <div class="stat-item">
                            <p>No. of Verticals</p>
                            <h5>16</h5>
                        </div>
                        <div class="stat-item">
                            <p>Rating</p>
                            <h5><span class="stars">★★★★☆</span> 4.5</h5>
                        </div>
                    </div>
                </div>

                <!-- Tab Navigation -->
                <div class="tabs-section mt-5">
                    <ul class="nav nav-tabs d-flex justify-content-around border-0">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Info</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Appointments</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Site Survey</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Employees</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Verticals</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Chats History</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Finance</a>
                        </li>
                    </ul>
                </div>
            </div>

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
                                    <button type="button" class="btn btn-primary w-50 mt-3">
                                        View Details
                                    </button>
                                </div>
                                <div class="grey-box">
                                    <p>Role - Admin</p>
                                    <p>Shaam Idress</p>
                                    <p class="mb-3">CEO</p>
                                    <p class="fw-bold">+971 983402031</p>
                                    <p>johnthompson15@gmail.com</p>
                                    <button type="button" class="btn btn-primary w-50 mt-3">
                                        View Details
                                    </button>
                                </div>
                                <div class="grey-box">
                                    <p>Role - Admin</p>
                                    <p>Shaam Idress</p>
                                    <p class="mb-3">CEO</p>
                                    <p class="fw-bold">+971 983402031</p>
                                    <p>johnthompson15@gmail.com</p>
                                    <button type="button" class="btn btn-primary w-50 mt-3">
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
                                    <button type="button" class="btn btn-primary w-50 mt-3">
                                        View Details
                                    </button>
                                </div>
                                <div class="grey-box">
                                    <p>Branch No.2</p>
                                    <p>Jebel Ali Free Zone, Zip Code 61327</p>
                                    <button type="button" class="btn btn-primary w-50 mt-3">
                                        View Details
                                    </button>
                                </div>
                                <div class="grey-box">
                                    <p>Branch No.3</p>
                                    <p>Jebel Ali Free Zone, Zip Code 61327</p>
                                    <button type="button" class="btn btn-primary w-50 mt-3">
                                        View Details
                                    </button>
                                </div>
                                <div class="grey-box">
                                    <p>Branch No.4</p>
                                    <p>Jebel Ali Free Zone, Zip Code 61327</p>
                                    <button type="button" class="btn btn-primary w-50 mt-3">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="col-md-12 d-flex justify-content-center gap-3 mt-3">
                <p class="fw-bold mb-0 align-baseline">Quick Actions</p>
                <button class="btn btn-outline-primary border">Edit</button>
                <button class="btn btn-outline-primary">Delete</button>
                <button class="btn btn-outline-primary">Organization Mode</button>
                <button class="btn btn-outline-primary">Share Profile</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const getImagePath = (imageName) => {
    return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};
</script>

<style scoped>
/* General Styling */
.company-details {
    background-color: #f2f4fb;
    padding: 20px;
}

.company-header {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.company-logo {
    width: 80px;
    margin-right: 20px;
}

.company-details-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.stars {
    color: #f8961e;
}

.nav-tabs .nav-link.active[data-v-f28c6120] {
    background-color: #fff !important;
    border: none !important;
    position: relative;
}

.nav-tabs .nav-link.active[data-v-f28c6120]::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -21px;
    height: 4px;
    background-color: #5825EB;
    width: 100%;
    margin: 0 auto;
}

.company-details-text h3 {
    font-weight: 700;
    margin: 0;
}

.company-status .badge-success {
    background-color: #28a745;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
}

.stat-item p {
    color: #5825eb;
    font-weight: 600;
}

.nav-tabs .nav-link {
    color: #6c757d;
}

.nav-tabs .nav-link.active {
    color: #495057;
    background-color: #e9ecef;
}

.company-details-section {
    padding: 20px;
}

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

.btn-primary {
    background: linear-gradient(98.24deg,
            #38e0b2 -18.55%,
            #442ae8 28.45%,
            #5925eb 64.63%,
            #9e21ee 116.94%);
    border: none;
    text-transform: uppercase;
}
</style>
