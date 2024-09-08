<template>
    <div class="col-md-12 company-header shadow mb-5">
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
</style>