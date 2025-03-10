<template>
    <div class="col-md-12 company-header mb-5 rounded-3">
        <div class="flex justify-between items-center" v-if="store.companyData">
            <div class="company-info">
                <div class="flex items-center gap-6">
                    <img :src="getCompanyUserImage(store?.companyData?.user?.profile_picture)" class="w-32 h-32 object-cover rounded-xl" alt="Company Logo" />
                    <div class="company-details-text">
                        <div class="company-status">
                            <span class="badge badge-success mb-2">Active</span>
                        </div>
                        <h3>{{ store?.companyData?.company?.company_name }}</h3>
                        <p>ID OFC 903823</p>
                    </div>
                </div>
            </div>
            <div class="inline-flex gap-6">
                <div class="inline-flex flex-col gap-2">
                    <p class="theme-label font-theme-bold">Total Revenue Generated</p>
                    <h5 class="font-theme-bold">AED {{ store?.companyData?.company?.org_revenue_sum || 0 }}</h5>
                </div>
                <div class="inline-flex flex-col gap-2">
                    <p class="theme-label font-theme-bold">No. of Order Completed</p>
                    <h5 class="font-theme-bold">{{ store?.companyData?.company?.completed_order }}</h5>
                </div>
                <div class="inline-flex flex-col gap-2">
                    <p class="theme-label font-theme-bold">No. of Verticals</p>
                    <h5 class="font-theme-bold">{{ store?.companyData?.company?.verticles_count }}</h5>
                </div>
                <div class="inline-flex flex-col gap-2">
                    <p class="theme-label font-theme-bold">Rating</p>
                    <h5 class="font-theme-bold"><span class="stars">★★★★☆</span> {{ store?.companyData?.company?.reviews_avg_rating }}</h5>
                </div>
            </div>
        </div>

        <!-- Tab Navigation -->
        <TabNavigation />
    </div>
</template>

<script setup>
import TabNavigation from '../components/TabNavigation.vue';
import { useCompanyStore } from '../store';
const store = useCompanyStore();

const getImagePath = (imageName) => {
    return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};

const getCompanyUserImage = (img) => { 
    return img.file_path;
}

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