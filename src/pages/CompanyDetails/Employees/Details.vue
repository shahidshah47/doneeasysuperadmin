<template>
    <article class="user-profile">
        <ProfileHeader />
        <ProfileTabs />
    </article>

    <div class="col-md-12 company-details-section">
        <div class="row">
            <div class="col-md-6">
                <h5 class="fw-bold">Personal Details</h5>
                <div class="company-details-box gap-5 position-relative">
                    <div class="position-absolute top-0 end-0 me-2 mt-2">
                        <a href="/super-admin/company-details/info/authentication" class="text-reset">
                            <i class="fa-solid fa-pen text-primary text-decoration-underline"></i>
                        </a>
                    </div>
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

                <div class="bg-white p-3 rounded-4 mb-4">
                    <p class="text-primary">About</p>
                    <p class="small-font">
                        Lorem ipsum dolor sit amet consectetur. Proin tellus ac sit
                        ullamcorper morbi condimentum tellus.Lorem ipsum dolor sit amet
                        consectetu.L consectetu.Lorem ipsum dolor sit amet condimentu
                        mcondimentum condime ntum tellus.Lorem ipsum dolor sit amet
                        consectet
                    </p>
                </div>

                <div class="d-flex justify-content-between">
                    <h5 class="fw-bold">Experiences</h5>
                    <p class="text-secondary mb-0">View All</p>
                </div>
                <div class="bg-white p-3 rounded-4 mb-3 row">
                    <div class="col-6 px-0 d-flex gap-0">
                        <div>
                            <img src="../../../assets/images2/emp_detail_1.png" alt="emp" />
                        </div>
                        <div>
                            <p class="fw-bold mb-0">Laundry Expert</p>
                            <p class="text-secondary mb-0 small-font">
                                ABS Private Ltd - Full-time
                            </p>
                            <div class="d-flex">
                                <p class="text-secondary mb-0 small-font">
                                    Sep 2022 - Sep 2024
                                </p>
                                <ul class="text-secondary mb-0 small-font">
                                    <li>2 yrs 4 mos</li>
                                </ul>
                            </div>
                            <p class="text-secondary mb-0 small-font">Abu Dabai, UAE</p>
                        </div>
                    </div>
                    <div class="col-6 px-0">
                        <p class="text-primary mb-0">Role & Responsibilities</p>
                        <ul class="mb-0 small-font cursor-pointer" data-bs-toggle="modal"
                            data-bs-target="#experienceModal">
                            <li>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse,
                                iure.
                            </li>
                            <li>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Eligendi cum assumenda sit vel dicta cumque sunt pariatur
                                dolorum provident natus?
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="bg-white p-3 rounded-4 mb-3 row">
                    <div class="col-6 px-0 d-flex gap-0">
                        <div>
                            <img src="../../../assets/images2/emp_detail_2.png" alt="emp" />
                        </div>
                        <div>
                            <p class="fw-bold mb-0">Associate Laundry</p>
                            <p class="text-secondary mb-0 small-font">
                                ABS Private Ltd - Full-time
                            </p>
                            <div class="d-flex">
                                <p class="text-secondary mb-0 small-font">
                                    Sep 2022 - Sep 2024
                                </p>
                                <ul class="text-secondary mb-0 small-font">
                                    <li>2 yrs 4 mos</li>
                                </ul>
                            </div>
                            <p class="text-secondary mb-0 small-font">Abu Dabai, UAE</p>
                        </div>
                    </div>
                    <div class="col-6 px-0">
                        <p class="text-primary mb-0">Role & Responsibilities</p>
                        <ul class="mb-0 small-font">
                            <li>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse,
                                iure.
                            </li>
                            <li>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Eligendi cum assumenda sit vel dicta cumque sunt pariatur
                                dolorum provident natus?
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <h5 class="fw-bold">Attachments</h5>
                <div class="d-flex align-items-center border-0 rounded-4 bg-white mb-3">
                    <div class="bg-success-subtle p-3 rounded-start-4 d-flex justify-content-center">
                        <img src="../../../assets/images2/file-icon.png" alt="File Icon" class="img-fluid"
                            style="width: 30px" />
                    </div>
                    <div>
                        <p class="ms-3 mb-0 fs-6">Emirates ID Front.jpg</p>
                        <p class="ms-3 mb-0 text-secondary -font">3.2mb</p>
                    </div>

                    <div class="ms-auto me-3 d-flex align-items-center gap-3 cursor-pointer">
                        <i class="fa fa-eye"></i>
                        <i class="fa fa-file"></i>
                    </div>
                </div>
                <div class="d-flex align-items-center border-0 rounded-4 bg-white mb-3">
                    <div class="bg-success-subtle p-3 rounded-start-4 d-flex justify-content-center">
                        <img src="../../../assets/images2/file-icon.png" alt="File Icon" class="img-fluid"
                            style="width: 30px" />
                    </div>
                    <div>
                        <p class="ms-3 mb-0 fs-6">Emirates ID Front.jpg</p>
                        <p class="ms-3 mb-0 text-secondary -font">3.2mb</p>
                    </div>

                    <div class="ms-auto me-3 d-flex align-items-center gap-3 cursor-pointer">
                        <i class="fa fa-eye"></i>
                        <i class="fa fa-file"></i>
                    </div>
                </div>
                <div class="d-flex align-items-center border-0 rounded-4 bg-white mb-3">
                    <div class="bg-success-subtle p-3 rounded-start-4 d-flex justify-content-center">
                        <img src="../../../assets/images2/file-icon.png" alt="File Icon" class="img-fluid"
                            style="width: 30px" />
                    </div>
                    <div>
                        <p class="ms-3 mb-0 fs-6">Emirates ID Front.jpg</p>
                        <p class="ms-3 mb-0 text-secondary -font">3.2mb</p>
                    </div>

                    <div class="ms-auto me-3 d-flex align-items-center gap-3 cursor-pointer">
                        <i class="fa fa-eye"></i>
                        <i class="fa fa-file"></i>
                    </div>
                </div>

                <h5 class="fw-bold mt-5">Assign Verticals</h5>
                <div class="rounded-4 border-0 rounded shadow-sm bg-white mb-3">
                    <div class="d-flex gap-3 align-items-center px-3 pt-3 mb-3">
                        <div class="icon">
                            <img src="../../../assets/images2/electronics-icon.png" alt="Category Icon" width="40" />
                        </div>
                        <div class="category-title">
                            <h6 class="mb-0 fw-bold">Home Repair & Maintenance Services</h6>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between bg-white rounded px-2 pb-3">
                        <div class="stats-section text-center me-2 py-1 px-3 rounded-3">
                            <p class="text-primary fw-bold mb-0">554</p>
                            <p class="text-muted mb-0 small-font">Jan</p>
                        </div>
                        <div class="stats-section text-center me-2 py-1 px-3 rounded-3">
                            <p class="text-primary fw-bold mb-0">34</p>
                            <p class="text-muted mb-0 small-font">Feb</p>
                        </div>
                        <div class="stats-section text-center me-2 py-1 px-3 rounded-3">
                            <p class="text-primary fw-bold mb-0">123</p>
                            <p class="text-muted mb-0 small-font">March</p>
                        </div>
                        <div class="stats-section text-center me-2 py-1 px-3 rounded-3">
                            <p class="text-primary fw-bold mb-0">338</p>
                            <p class="text-muted mb-0 small-font">April</p>
                        </div>
                        <div class="stats-section text-center me-2 py-1 px-3 rounded-3">
                            <p class="text-primary fw-bold mb-0">1,034</p>
                            <p class="text-muted mb-0 small-font">May</p>
                        </div>
                    </div>
                </div>
                <div class="rounded-4 border-0 rounded shadow-sm bg-white">
                    <div class="d-flex gap-3 align-items-center px-3 pt-3 mb-3">
                        <div class="icon">
                            <img src="../../../assets/images2/electronics-icon.png" alt="Category Icon" width="40" />
                        </div>
                        <div class="category-title">
                            <h6 class="mb-0 fw-bold">Home Repair & Maintenance Services</h6>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between bg-white rounded px-2 pb-3">
                        <div class="stats-section text-center me-2 py-1 px-3 rounded-3">
                            <p class="text-primary fw-bold mb-0">554</p>
                            <p class="text-muted mb-0 small-font">Jan</p>
                        </div>
                        <div class="stats-section text-center me-2 py-1 px-3 rounded-3">
                            <p class="text-primary fw-bold mb-0">34</p>
                            <p class="text-muted mb-0 small-font">Feb</p>
                        </div>
                        <div class="stats-section text-center me-2 py-1 px-3 rounded-3">
                            <p class="text-primary fw-bold mb-0">123</p>
                            <p class="text-muted mb-0 small-font">March</p>
                        </div>
                        <div class="stats-section text-center me-2 py-1 px-3 rounded-3">
                            <p class="text-primary fw-bold mb-0">338</p>
                            <p class="text-muted mb-0 small-font">April</p>
                        </div>
                        <div class="stats-section text-center me-2 py-1 px-3 rounded-3">
                            <p class="text-primary fw-bold mb-0">1,034</p>
                            <p class="text-muted mb-0 small-font">May</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <h5 class="fw-bold">Skills</h5>
                <div class="rounded-4 border-0 rounded shadow-sm bg-white p-3 mb-3">
                    <span class="badge primary-bg rounded-3 p-2 me-2 mb-2">Garment Care</span>
                    <span class="badge primary-bg rounded-3 p-2 me-2 mb-2">Garment Care</span>
                    <span class="badge primary-bg rounded-3 p-2 mb-2">Garment Care</span>
                    <span class="badge primary-bg rounded-3 p-2 me-2">Garment Care</span>
                    <span class="badge primary-bg rounded-3 p-2">Garment Care</span>
                </div>
                <h5 class="fw-bold">Licenses & Certifications</h5>
                <div class="rounded-4 border-0 rounded shadow-sm bg-white p-3 mb-3">
                    <div class="text-center mb-3">
                        <img src="../../../assets/images2/license.png" alt="license" class="w-100" />
                    </div>
                    <p class="fw-bold mb-0">Diploma in Laudry</p>
                    <p class="text-secondary mb-0 small-font">Dubai Laundry Institure</p>
                    <p class="text-secondary small-font">
                        Sep 2022 - Sep 2024 | Credential ID9384932
                    </p>
                    <a href="#" class="text-primary text-decoration-none text-uppercase">View Image</a>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="experienceModal" tabindex="-1" aria-labelledby="experienceModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-4">
                <div class="modal-header">
                    <h5 class="modal-title" id="experienceModalLabel">Experiences</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center">
                        <img src="../../../assets/images2/Illustration.png" class="experience-logo"
                            alt="Company Logo" />
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p class="text-primary small-font mb-0">Designation</p>
                            <p class="fw-semibold">Laundry Expert</p>
                        </div>
                        <div class="col-6">
                            <p class="text-primary small-font mb-0">Company</p>
                            <p class="fw-semibold">ABS Private Ltd</p>
                        </div>
                        <div class="col-6">
                            <p class="text-primary small-font mb-0">Employment Type</p>
                            <p class="fw-semibold">Full-time</p>
                        </div>
                        <div class="col-6">
                            <p class="text-primary small-font mb-0">Location</p>
                            <p class="fw-semibold">Abu Dabai</p>
                        </div>
                        <div class="col-6">
                            <p class="text-primary small-font mb-0">Start Date</p>
                            <p class="fw-semibold">September, 2022</p>
                        </div>
                        <div class="col-6">
                            <p class="text-primary small-font mb-0">End Date</p>
                            <p class="fw-semibold">September 2024</p>
                        </div>
                    </div>

                    <p class="text-primary mb-0 small-font">Role & Responsibilities</p>
                    <ul class="small-font">
                        <li>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A,
                            dolorem.
                        </li>
                        <li>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A,
                            dolorem.
                        </li>
                        <li>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A,
                            dolorem.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileHeader from "../../../components/ProfileHeader.vue";
import ProfileTabs from "../../../components/ProfileTabs.vue";

export default {
    name: "UserProfile",
    components: {
        ProfileHeader,
        ProfileTabs,
    },
};
</script>

<style scoped>
.user-profile {
    border-radius: 16px;
    background-color: #fcfdff;
    font-family: Averta, sans-serif;
    padding: 22px 22px 0;
    width: 100%;
    margin-bottom: 20px;
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

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
    background: #5825eb !important;
    border: none !important;
    color: #fff !important;
}

.nav-pills .nav-link {
    background-color: #f2f4fb !important;
    border: none !important;
    color: #000 !important;
}

.form-control {
    border: none !important;
    background-color: #f2f4fb !important;
    border-radius: 10px !important;
    padding: 10px 20px !important;
}

.form-select {
    border: none !important;
    background-color: #f2f4fb !important;
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
    color: #5a5a5a;
    border: 1px dashed #d8d8d8;
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

.stats-section {
    background-color: #f6f7fa;
}

@media (max-width: 991px) {
    .user-profile {
        max-width: 100%;
        padding: 0 20px;
    }
}
</style>
