<template>
  <article class="user-profile">
    <ProfileHeader />
    <ProfileTabs :companyId="companyId" />
  </article>

  <div class="col-md-12 company-details-section">
    <div class="row">
      <div class="col-md-6 flex flex-col gap-4">
        <div>
          <SectionHeading
            title="Personal Details"
            customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
          />

          <div class="grid grid-cols-2 gap-4 bg-white-100 p-4 rounded-xl">
            <InfoDisplay label="Company ID" value="ID OFC 903823" />
            <InfoDisplay label="No. of Employees" value="50-100" />
            <InfoDisplay label="HQ Phone No." value="+971 983402031" />
            <InfoDisplay label="HQ Email" value="johnthompson15@gmail.com" />
            <InfoDisplay label="Joined Date" value="Jan 2020" />
            <InfoDisplay label="Added By" value="Alex Smith" />
          </div>
        </div>
        <div>
          <SectionHeading
            title="Legal Documents Details"
            customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
          />

          <div class="grid grid-cols-2 gap-4 bg-white-100 p-4 rounded-xl">
            <InfoDisplay label="Emirates ID" value="98734-3423-21" />
            <InfoDisplay label="TRN" value="98734-3423-21" />
            <InfoDisplay label="Trade License No. 1" value="98734-3423-21" />
            <InfoDisplay label="Trade License No. 2" value="98734-3423-21" />
          </div>
        </div>

        <div class="bg-white p-3 rounded-4 mb-4">
          <SummaryCard
            title="About"
            description="Lorem ipsum dolor sit amet consectetur. Proin tellus ac sit ullamcorper morbi condimentum tellus."
            readMoreLink="#"
          />
        </div>
        <div>
          <div class="d-flex justify-content-between">
            <SectionHeading
              title="Experiences"
              customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
            />

            <p class="text-grayColor text-sm">View All</p>
          </div>
          <div class="bg-white p-3 rounded-4 mb-3 row">
            <ExperienceCard
              imageSrc="emp_detail_1.png"
              altText="emp"
              jobTitle="Laundry Expert"
              company="ABS Private Ltd"
              employmentType="Full-time"
              duration="Sep 2022 - Sep 2024"
              experience="2 yrs 4 mos"
              location="Abu Dhabi, UAE"
              :responsibilities="[
                'Handled laundry operations efficiently',
                'Ensured high standards of cleaning and customer satisfaction',
              ]"
            />
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <SectionHeading
          title="Attachments"
          customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
        />

        <div>
          <FileCard
            fileIcon="../../../assets/images2/file-icon.png"
            fileName="Company Profile"
            fileSize="3.2mb"
          />
        </div>
        <div>
          <SectionHeading
            title="Assign Verticals"
            customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
          />
        </div>
        <h5 class="fw-bold mt-5">Assign Verticals</h5>
        <div class="rounded-4 border-0 rounded shadow-sm bg-white mb-3">
          <div class="d-flex gap-3 align-items-center px-3 pt-3 mb-3">
            <div class="icon">
              <img
                src="../../../assets/images2/electronics-icon.png"
                alt="Category Icon"
                width="40"
              />
            </div>
            <div class="category-title">
              <h6 class="mb-0 fw-bold">Home Repair & Maintenance Services</h6>
            </div>
          </div>

          <div
            class="d-flex justify-content-between bg-white rounded px-2 pb-3"
          >
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
              <img
                src="../../../assets/images2/electronics-icon.png"
                alt="Category Icon"
                width="40"
              />
            </div>
            <div class="category-title">
              <h6 class="mb-0 fw-bold">Home Repair & Maintenance Services</h6>
            </div>
          </div>

          <div
            class="d-flex justify-content-between bg-white rounded px-2 pb-3"
          >
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
          <span class="badge primary-bg rounded-3 p-2 me-2 mb-2"
            >Garment Care</span
          >
          <span class="badge primary-bg rounded-3 p-2 me-2 mb-2"
            >Garment Care</span
          >
          <span class="badge primary-bg rounded-3 p-2 mb-2">Garment Care</span>
          <span class="badge primary-bg rounded-3 p-2 me-2">Garment Care</span>
          <span class="badge primary-bg rounded-3 p-2">Garment Care</span>
        </div>
        <h5 class="fw-bold">Licenses & Certifications</h5>
        <div class="rounded-4 border-0 rounded shadow-sm bg-white p-3 mb-3">
          <div class="text-center mb-3">
            <img
              src="../../../assets/images2/license.png"
              alt="license"
              class="w-100"
            />
          </div>
          <p class="fw-bold mb-0">Diploma in Laudry</p>
          <p class="text-secondary mb-0 small-font">Dubai Laundry Institure</p>
          <p class="text-secondary small-font">
            Sep 2022 - Sep 2024 | Credential ID9384932
          </p>
          <a href="#" class="text-primary text-decoration-none text-uppercase"
            >View Image</a
          >
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="modal fade" id="experienceModal" tabindex="-1" aria-labelledby="experienceModalLabel"
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
    </div> -->
</template>

<script setup>
import ProfileHeader from "../../../components/ProfileHeader.vue";
import ProfileTabs from "../../../components/ProfileTabs.vue";
import SectionHeading from "../../../components/common/SectionHeading/SectionHeading.vue";
import InfoDisplay from "../../../components/common/InfoDisplay/InfoDisplay.vue";
import { useRoute } from "vue-router";
import SummaryCard from "../../../components/common/SummaryCard/SummaryCard.vue";
import ExperienceCard from "../../../components/common/ExperienceCard/ExperienceCard.vue";
import FileCard from "../../../components/common/FileCard/FileCard.vue";

const route = useRoute();
const companyId = route.params.companyId;
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
.nav-pills .show > .nav-link {
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
