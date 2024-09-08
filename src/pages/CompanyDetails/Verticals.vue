<template>
    <div class="container-fluid company-details">
        <div class="row">
            <!-- Company Info and Stats -->
            <CompanyHeader />
        </div>
        <div class="row row-gap-4">
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
</style>