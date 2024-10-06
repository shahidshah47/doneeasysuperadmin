<template>
    <div class="container-fluid company-details">
        <div class="row">
            <!-- Company Info and Stats -->
            <CompanyHeader />
        </div>
        <div class="container-fluid">
            <div class="row">
                <!-- Sidebar -->
                <div class="col-md-3 p-3 bg-white border-end">
                    <div class="conversation mb-4 d-flex align-items-center">
                        <div class="avatar bg-secondary rounded-circle me-3"></div>
                        <div>
                            <h6 class="mb-0">Biffco Enterprises</h6>
                            <p class="small text-muted mb-0">Hi there! How can I assist you today?</p>
                            <span class="small text-muted">3 days ago</span>
                        </div>
                    </div>
                    <div class="conversation d-flex align-items-center">
                        <div class="avatar bg-secondary rounded-circle me-3"></div>
                        <div>
                            <h6 class="mb-0">AKAL Pvt</h6>
                            <p class="small text-muted mb-0">Hi there! How can I assist you today?</p>
                            <span class="small text-muted">12/03/2023</span>
                        </div>
                    </div>
                </div>

                <!-- Main Content Area -->
                <div class="col-md-6 p-3">
                    <div
                        class="violation-alert mb-3 p-3 bg-light rounded d-flex justify-content-between align-items-center">
                        <span>Violation Alert</span>
                        <span class="badge bg-warning text-dark">6</span>
                        <span class="small text-muted">3 of 6</span>
                        <button class="btn btn-sm btn-outline-primary">View Detail</button>
                    </div>

                    <!-- Chat Messages -->
                    <div class="chat-window bg-white rounded p-3 mb-3">
                        <div class="message mb-3 p-2 bg-light rounded">
                            <p class="mb-0">Absolutely. I’ll include a detailed proposal and references...</p>
                        </div>
                        <div class="message mb-3 p-2 bg-light rounded">
                            <p class="mb-0">Let’s deal outside the DE platform. Share your WhatsApp.</p>
                        </div>
                        <div class="message p-2 bg-light rounded">
                            <p class="mb-0">I’m sorry to hear that. We can provide secure pick-up and delivery services
                                and help with compliance...</p>
                        </div>
                    </div>

                    <!-- Violation Warning Box -->
                    <div class="violation-warning p-3 bg-light border rounded position-relative">
                        <p>
                            We notice you advise the other party to deal outside the DoneEasy platform.
                            This action has been logged as a violation of our <a href="#"
                                class="text-primary">policy</a>.
                        </p>
                        <button class="btn btn-sm btn-primary me-2">Take Action</button>
                        <button class="btn btn-sm btn-outline-secondary">Ignore</button>
                    </div>
                </div>

                <!-- Right Sidebar -->
                <div class="col-md-3 p-3 bg-white border-start">
                    <div class="violation-info bg-light p-3 rounded mb-3">
                        <h5>No. of Violations: <span class="text-danger">32</span></h5>
                        <ul class="list-unstyled">
                            <li class="mb-2">Under investigation</li>
                            <li class="mb-2">Violation level 1, 2, 3</li>
                            <li class="mb-2">False Alarm</li>
                            <li>Un-identified</li>
                        </ul>
                    </div>
                    <button class="btn btn-primary w-100 mb-2">Offer</button>
                    <button class="btn btn-outline-primary w-100 mb-2">Site survey</button>
                    <button class="btn btn-outline-primary w-100">Appointment</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CompanyHeader from '../../components/CompanyHeader.vue';

const getImagePath = (imageName) => {
    return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};

const vendorData = ref([
    {
        id: "OFC 001",
        companyName: "ABS Company Pvt.",
        companyImage: "Avatar.png",
        ceoManager: "Floyd Miles",
        managerImage: "Avatar (5).png",
        contactEmail: "(239) 555-0108<br>xyz@gmail.com",
        totalRevenue: "AED 32,100",
        totalSpending: "AED 32,100",
        status: "Active",
        verticalSubscribed: 16,
        registeredDate: "2020-05-17<br>10:00 AM",
        statusColor: "lightgreen",
    },
    {
        id: "OFC 002",
        companyName: "Big Kahuna Ltd.",
        companyImage: "Avatar.png",
        ceoManager: "Kristin Watson",
        managerImage: "Avatar (4).png",
        contactEmail: "(239) 555-0108<br>xyz@gmail.com",
        totalRevenue: "AED 32,100",
        totalSpending: "AED 32,100",
        status: "Banned",
        verticalSubscribed: 23,
        registeredDate: "2020-05-17<br>10:00 AM",
        statusColor: "#ffb09c",
    },
    {
        id: "OFC 003",
        companyName: "Barone LLC.",
        companyImage: "Avatar (5).png",
        ceoManager: "Albert Flores",
        managerImage: "Avatar (4).png",
        contactEmail: "(239) 555-0108<br>xyz@gmail.com",
        totalRevenue: "AED 32,100",
        totalSpending: "AED 32,100",
        status: "Inactive",
        verticalSubscribed: 23,
        registeredDate: "2020-05-17<br>10:00 AM",
        statusColor: "lightgrey",
    },
    {
        id: "OFC 004",
        companyName: "Biffco Enterprises Ltd.",
        companyImage: "Avatar.png",
        ceoManager: "Dianne Russell",
        managerImage: "Avatar (4).png",
        contactEmail: "(239) 555-0108<br>xyz@gmail.com",
        totalRevenue: "AED 32,100",
        totalSpending: "AED 32,100",
        status: "Monitory",
        verticalSubscribed: 23,
        registeredDate: "2020-05-17<br>10:00 AM",
        statusColor: "lightyellow",
    },
]);
</script>

<style scoped>
body {
    background-color: #F7F8FC;
    font-family: 'Inter', sans-serif;
}

.avatar {
    width: 40px;
    height: 40px;
}

.conversation {
    cursor: pointer;
}

.violation-alert {
    background-color: #FFE8D6;
}

.chat-window {
    height: 250px;
    overflow-y: auto;
}

.violation-warning {
    background-color: #FFE8E8;
}

.violation-info h5 {
    font-size: 18px;
    color: #FF6347;
}

.list-unstyled li {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
}

.btn-primary {
    background-color: #007BFF;
}

.btn-outline-primary {
    border-color: #007BFF;
    color: #007BFF;
}

.violation-warning a {
    text-decoration: none;
}
</style>