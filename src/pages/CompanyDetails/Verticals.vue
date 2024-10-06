<template>
    <div class="container-fluid company-details">
        <div class="row">
            <!-- Company Info and Stats -->
            <CompanyHeader />
        </div>
        <div class="row row-gap-4">
            <div class="col-md-4">
                <a href="/super-admin/company-details/verticals/details" class="text-decoration-none text-reset">
                    <div class="rounded-4 border-0 p-4 rounded shadow-sm bg-white">
                        <!-- Top Section (Title and Icon) -->
                        <div class="d-flex gap-3 align-items-center mb-3">
                            <div class="icon">
                                <img :src="getImagePath('electronics-icon.png')" alt="Category Icon" width="40">
                            </div>
                            <div class="category-title">
                                <h5 class="mb-0 fw-bold">Electronics & home appliances</h5>
                            </div>
                        </div>

                        <!-- Stats Section -->
                        <div class="stats-section d-flex justify-content-between bg-light rounded py-3 px-4 mb-3">
                            <div class="text-center">
                                <p class="text-primary mb-0">AED <span class="fs-4 fw-bold">23,190</span></p>
                                <p class="text-muted mb-0 small">Total Revenue</p>
                            </div>
                            <div class="text-center">
                                <p class="text-primary mb-0 fs-4 fw-bold">1,298</p>
                                <p class="text-muted mb-0 small">Active Orders</p>
                            </div>
                            <div class="text-center">
                                <p class="text-primary mb-0 fs-4 fw-bold">410</p>
                                <p class="text-muted mb-0 small">Offers submitted</p>
                            </div>
                        </div>

                        <!-- Bottom Section (Manager Info) -->
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                <img :src="getImagePath('profile-pic.png')" class="rounded-circle me-3" width="40"
                                    alt="Manager Profile">
                                <div>
                                    <h6 class="mb-0 fw-bold">Jane Cooper</h6>
                                    <p class="text-muted mb-0 small">Assign Manager</p>
                                </div>
                            </div>
                            <div class="text-end">
                                <a href="#" class="text-primary fw-bold small text-decoration-none"
                                    data-bs-toggle="modal" data-bs-target="#changeManagerModal">CHANGE</a>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-md-4">
                <div class="rounded-4 border-0 p-4 rounded shadow-sm bg-white">
                    <!-- Top Section (Title and Icon) -->
                    <div class="d-flex gap-3 align-items-center mb-3">
                        <div class="icon">
                            <img :src="getImagePath('electronics-icon.png')" alt="Category Icon" width="40">
                        </div>
                        <div class="category-title">
                            <h5 class="mb-0 fw-bold">Electronics & home appliances</h5>
                        </div>
                    </div>

                    <!-- Stats Section -->
                    <div class="stats-section d-flex justify-content-between bg-light rounded py-3 px-4 mb-3">
                        <div class="text-center">
                            <p class="text-primary mb-0">AED <span class="fs-4 fw-bold">23,190</span></p>
                            <p class="text-muted mb-0 small">Total Revenue</p>
                        </div>
                        <div class="text-center">
                            <p class="text-primary mb-0 fs-4 fw-bold">1,298</p>
                            <p class="text-muted mb-0 small">Active Orders</p>
                        </div>
                        <div class="text-center">
                            <p class="text-primary mb-0 fs-4 fw-bold">410</p>
                            <p class="text-muted mb-0 small">Offers submitted</p>
                        </div>
                    </div>

                    <!-- Bottom Section (Manager Info) -->
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img :src="getImagePath('profile-pic.png')" class="rounded-circle me-3" width="40"
                                alt="Manager Profile">
                            <div>
                                <h6 class="mb-0 fw-bold">Jane Cooper</h6>
                                <p class="text-muted mb-0 small">Assign Manager</p>
                            </div>
                        </div>
                        <div class="text-end">
                            <a href="#" class="text-primary fw-bold small text-decoration-none">CHANGE</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="rounded-4 border-0 p-4 rounded shadow-sm bg-white">
                    <!-- Top Section (Title and Icon) -->
                    <div class="d-flex gap-3 align-items-center mb-3">
                        <div class="icon">
                            <img :src="getImagePath('electronics-icon.png')" alt="Category Icon" width="40">
                        </div>
                        <div class="category-title">
                            <h5 class="mb-0 fw-bold">Electronics & home appliances</h5>
                        </div>
                    </div>

                    <!-- Stats Section -->
                    <div class="stats-section d-flex justify-content-between bg-light rounded py-3 px-4 mb-3">
                        <div class="text-center">
                            <p class="text-primary mb-0">AED <span class="fs-4 fw-bold">23,190</span></p>
                            <p class="text-muted mb-0 small">Total Revenue</p>
                        </div>
                        <div class="text-center">
                            <p class="text-primary mb-0 fs-4 fw-bold">1,298</p>
                            <p class="text-muted mb-0 small">Active Orders</p>
                        </div>
                        <div class="text-center">
                            <p class="text-primary mb-0 fs-4 fw-bold">410</p>
                            <p class="text-muted mb-0 small">Offers submitted</p>
                        </div>
                    </div>

                    <!-- Bottom Section (Manager Info) -->
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img :src="getImagePath('profile-pic.png')" class="rounded-circle me-3" width="40"
                                alt="Manager Profile">
                            <div>
                                <h6 class="mb-0 fw-bold">Jane Cooper</h6>
                                <p class="text-muted mb-0 small">Assign Manager</p>
                            </div>
                        </div>
                        <div class="text-end">
                            <a href="#" class="text-primary fw-bold small text-decoration-none">CHANGE</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="rounded-4 border-0 p-4 rounded shadow-sm bg-white">
                    <!-- Top Section (Title and Icon) -->
                    <div class="d-flex gap-3 align-items-center mb-3">
                        <div class="icon">
                            <img :src="getImagePath('electronics-icon.png')" alt="Category Icon" width="40">
                        </div>
                        <div class="category-title">
                            <h5 class="mb-0 fw-bold">Electronics & home appliances</h5>
                        </div>
                    </div>

                    <!-- Stats Section -->
                    <div class="stats-section d-flex justify-content-between bg-light rounded py-3 px-4 mb-3">
                        <div class="text-center">
                            <p class="text-primary mb-0">AED <span class="fs-4 fw-bold">23,190</span></p>
                            <p class="text-muted mb-0 small">Total Revenue</p>
                        </div>
                        <div class="text-center">
                            <p class="text-primary mb-0 fs-4 fw-bold">1,298</p>
                            <p class="text-muted mb-0 small">Active Orders</p>
                        </div>
                        <div class="text-center">
                            <p class="text-primary mb-0 fs-4 fw-bold">410</p>
                            <p class="text-muted mb-0 small">Offers submitted</p>
                        </div>
                    </div>

                    <!-- Bottom Section (Manager Info) -->
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img :src="getImagePath('profile-pic.png')" class="rounded-circle me-3" width="40"
                                alt="Manager Profile">
                            <div>
                                <h6 class="mb-0 fw-bold">Jane Cooper</h6>
                                <p class="text-muted mb-0 small">Assign Manager</p>
                            </div>
                        </div>
                        <div class="text-end">
                            <a href="#" class="text-primary fw-bold small text-decoration-none">CHANGE</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="rounded-4 border-0 p-4 rounded shadow-sm bg-white">
                    <!-- Top Section (Title and Icon) -->
                    <div class="d-flex gap-3 align-items-center mb-3">
                        <div class="icon">
                            <img :src="getImagePath('electronics-icon.png')" alt="Category Icon" width="40">
                        </div>
                        <div class="category-title">
                            <h5 class="mb-0 fw-bold">Electronics & home appliances</h5>
                        </div>
                    </div>

                    <!-- Stats Section -->
                    <div class="stats-section d-flex justify-content-between bg-light rounded py-3 px-4 mb-3">
                        <div class="text-center">
                            <p class="text-primary mb-0">AED <span class="fs-4 fw-bold">23,190</span></p>
                            <p class="text-muted mb-0 small">Total Revenue</p>
                        </div>
                        <div class="text-center">
                            <p class="text-primary mb-0 fs-4 fw-bold">1,298</p>
                            <p class="text-muted mb-0 small">Active Orders</p>
                        </div>
                        <div class="text-center">
                            <p class="text-primary mb-0 fs-4 fw-bold">410</p>
                            <p class="text-muted mb-0 small">Offers submitted</p>
                        </div>
                    </div>

                    <!-- Bottom Section (Manager Info) -->
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img :src="getImagePath('profile-pic.png')" class="rounded-circle me-3" width="40"
                                alt="Manager Profile">
                            <div>
                                <h6 class="mb-0 fw-bold">Jane Cooper</h6>
                                <p class="text-muted mb-0 small">Assign Manager</p>
                            </div>
                        </div>
                        <div class="text-end">
                            <a href="#" class="text-primary fw-bold small text-decoration-none">CHANGE</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="rounded-4 border-0 p-4 rounded shadow-sm bg-white">
                    <!-- Top Section (Title and Icon) -->
                    <div class="d-flex gap-3 align-items-center mb-3">
                        <div class="icon">
                            <img :src="getImagePath('electronics-icon.png')" alt="Category Icon" width="40">
                        </div>
                        <div class="category-title">
                            <h5 class="mb-0 fw-bold">Electronics & home appliances</h5>
                        </div>
                    </div>

                    <!-- Stats Section -->
                    <div class="stats-section d-flex justify-content-between bg-light rounded py-3 px-4 mb-3">
                        <div class="text-center">
                            <p class="text-primary mb-0">AED <span class="fs-4 fw-bold">23,190</span></p>
                            <p class="text-muted mb-0 small">Total Revenue</p>
                        </div>
                        <div class="text-center">
                            <p class="text-primary mb-0 fs-4 fw-bold">1,298</p>
                            <p class="text-muted mb-0 small">Active Orders</p>
                        </div>
                        <div class="text-center">
                            <p class="text-primary mb-0 fs-4 fw-bold">410</p>
                            <p class="text-muted mb-0 small">Offers submitted</p>
                        </div>
                    </div>

                    <!-- Bottom Section (Manager Info) -->
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img :src="getImagePath('profile-pic.png')" class="rounded-circle me-3" width="40"
                                alt="Manager Profile">
                            <div>
                                <h6 class="mb-0 fw-bold">Jane Cooper</h6>
                                <p class="text-muted mb-0 small">Assign Manager</p>
                            </div>
                        </div>
                        <div class="text-end">
                            <a href="#" class="text-primary fw-bold small text-decoration-none">CHANGE</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="changeManagerModal" tabindex="-1" aria-labelledby="changeManagerModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-4">
                <div class="modal-header rounded-top-4 bg-body-secondary">
                    <h5 class="modal-title" id="changeManagerModalLabel">Change Manager</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body pb-5">
                    <div class="current-manager">
                        <p class="mb-0 fw-bold">Current Manager</p>
                        <div class="d-flex align-items-center bg-body-secondary rounded-4 p-3">
                            <img src="https://via.placeholder.com/35" alt="Manager Image">
                            <div class="ms-3">
                                <p class="mb-0 fw-semibold">Jane Cooper</p>
                            </div>
                        </div>
                    </div>

                    <div class="new-manager mt-4">
                        <p class="mb-0 fw-bold">New Manager</p>
                        <div class="dropdown">
                            <button class="btn btn-light dropdown-toggle w-100" type="button" id="dropdownMenuButton"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Select New Manager
                            </button>
                            <ul class="dropdown-menu custom-dropdown-menu bg-body-secondary w-100"
                                aria-labelledby="dropdownMenuButton">
                                <li>
                                    <a class="dropdown-item custom-dropdown-item" href="#">
                                        <img src="https://via.placeholder.com/30" alt="Jerome Bell">
                                        <p>Jerome Bell</p>
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item custom-dropdown-item" href="#">
                                        <img src="https://via.placeholder.com/30" alt="Jacob Jones">
                                        <p>Jacob Jones</p>
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item custom-dropdown-item" href="#">
                                        <img src="https://via.placeholder.com/30" alt="Jenny Wilson">
                                        <p>Jenny Wilson</p>
                                    </a>
                                </li>
                            </ul>
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
</template>

<script setup>
import CompanyHeader from '../../components/CompanyHeader.vue';

const getImagePath = (imageName) => {
    return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};
</script>

<style scoped>
.stats-section {
    background-color: #f6f7fa;
}

img {
    border-radius: 8px;
}

.custom-dropdown-menu .dropdown-item img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
}

.custom-dropdown-item {
    display: flex;
}

.custom-dropdown-item p {
    margin: 0;
}
</style>