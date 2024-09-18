<template>
    <div class="d-flex my-4">
        <button class="btn btn-primary me-2" style="text-transform: none !important;">Site Survey Activity</button>
        <button class="btn btn-light">Order Summary</button>
    </div>

    <h5 class="fw-semibold">Site Survey Progress</h5>
    <div class="card border-0 rounded-3 p-3 mb-4">
        <div class="d-flex align-items-center">
            <div class="progress-step">
                <i class="bi bi-check-circle-fill text-primary"></i>
                <span class="ms-2">Start Trip</span>
            </div>
            <div class="progress-bar bg-light mx-2 flex-grow-1"></div>
            <div class="progress-step">
                <span>Reach to Site</span>
            </div>
            <div class="progress-bar bg-light mx-2 flex-grow-1"></div>
            <div class="progress-step">
                <span>Surveying</span>
            </div>
            <div class="progress-bar bg-light mx-2 flex-grow-1"></div>
            <div class="progress-step">
                <span>Completed</span>
            </div>
        </div>
    </div>

    <div class="row mb-5">
        <div class="col-md-3">
            <h5 class="fw-semibold">Details</h5>
            <div class="card border-0 rounded-3 p-3 mb-4">
                <p class="mb-0 text-primary small-font">Start Trip</p>
                <p class="fw-semibold">2118 Thornridge Cir.</p>
                <p class="mb-0 text-primary small-font">End Trip</p>
                <p class="fw-semibold">775 Rolling Green Rd.</p>
                <p class="mb-0 text-primary small-font">Distance</p>
                <p class="fw-semibold"><span class="fs-5">35</span> km</p>
                <p class="mb-0 text-primary small-font">Travel Time</p>
                <p class="fw-semibold">15 min</p>
                <p class="mb-0 text-primary small-font">Client Name</p>
                <p class="fw-semibold">Shane Idrees</p>
                <p class="mb-0 text-primary small-font">Contact No.</p>
                <p class="fw-semibold">+97 75955165</p>
                <p class="mb-0 text-primary small-font">Survey Conducted by</p>
                <p class="fw-semibold">Dianne Russell</p>
                <p class="mb-0 text-primary small-font">Survey Conducted by</p>
                <p class="fw-semibold">Leslie Alexander</p>
            </div>

            <h5 class="fw-semibold">Total Time</h5>
            <div class="card border-0 rounded-3 p-3 text-center">
                <div class="d-flex gap-3 justify-content-center">
                    <div>
                        <h4 class="fw-bold mb-1">00</h4>
                        <small class="text-muted">Hrs</small>
                    </div>
                    <p class="fs-3 fw-bold">:</p>
                    <div>
                        <h4 class="fw-bold mb-1">15</h4>
                        <small class="text-muted">Min</small>
                    </div>
                    <p class="fs-3 fw-bold">:</p>
                    <div>
                        <h4 class="fw-bold mb-1">00</h4>
                        <small class="text-muted">Sec</small>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <h5 class="fw-semibold">Map</h5>
            <div class="card border-0 rounded-3 p-3">
                <div>
                    <img src="../../../assets/images2/big-map.png" alt="Map">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidebar {
    background-color: #F2F4FB;
}

.breadcrumb {
    background-color: transparent;
}

.progress-step {
    display: flex;
    align-items: center;
    position: relative;
}

.progress-step i {
    font-size: 1.5rem;
}

.progress-bar {
    height: 2px;
}

img {
    border-radius: 10px;
}

.nav-link {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #6c757d;
}

.nav-link:hover {
    color: #007bff;
}

.nav-link i {
    font-size: 1.5rem;
}
</style>
