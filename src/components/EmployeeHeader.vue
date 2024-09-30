<template>
    <div class="col-md-12 company-header shadow mb-5 rounded-3">
        <div class="d-flex justify-content-between align-items-center">
            <div class="company-info">
                <div class="d-flex align-items-center">
                    <div class="d-flex flex-column align-items-center me-4">
                        <img :src="getImagePath('5s_0017_harps-joseph-tAvpDE7fXgY-unsplash.png')" class="company-logo"
                            alt="Company Logo" />
                        <span class="badge rounded-3 text-bg-primary">50% complete</span>
                    </div>
                    <div class="company-details-text">
                        <div class="company-status">
                            <span class="badge badge-success mb-2">Active <i class="fa-solid fa-sort-down ms-3 text-black fs-6"></i></span>
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
        <TabNavigation />
    </div>
</template>

<script setup>
import TabNavigation from '../components/TabNavigation.vue';

const getImagePath = (imageName) => {
    return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};
</script>

<style scoped>
.text-bg-primary {
    background: #A321EE !important;
}

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
}

.company-details-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.stars {
    color: #f8961e;
}

.company-details-text h3 {
    font-weight: 700;
    margin: 0;
}

.company-status .badge-success {
    background-color: #D6FFEF;
    color: #00995C;
    padding: 5px 10px;
    border-radius: 5px;
}

.stat-item p {
    color: #5825eb;
    font-weight: 600;
}
</style>