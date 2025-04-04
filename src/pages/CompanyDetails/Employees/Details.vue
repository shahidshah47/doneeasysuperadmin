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
          <div class="flex justify-between">
            <SectionHeading
              title="Experiences"
              customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
            />

            <p class="text-grayColor text-sm font-semibold">View All</p>
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
              @click="openModal"
            />
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <SectionHeading
          title="Documents"
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

        <AssignVerticalCard
          title="Home Repair & Maintenance Services"
          icon="electronics-icon.png"
          :stats="[
            { value: '554', label: 'Jan' },
            { value: '34', label: 'Feb' },
            { value: '123', label: 'March' },
            { value: '338', label: 'April' },
            { value: '1,034', label: 'May' },
          ]"
        />
      </div>

      <div class="col-md-3">
        <div>
          <SectionHeading
            title="Skills"
            customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
          />
          <SkillList :tags="['Garment Care', 'Care', 'Garment']" />
        </div>

        <div>
          <div class="flex justify-between">
            <SectionHeading
              title="Licenses & Certifications"
              customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
            />

            <p class="text-grayColor text-sm font-semibold">View All</p>
          </div>
          <div class="flex flex-col gap-3">
            <div v-for="(document, index) in documents" :key="index">
              <DocumentPreview
                :imageName="document.imageName"
                :title="document.title"
                :institute="document.institute"
                :duration="document.duration"
                :credentialId="document.credentialId"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
import AssignVerticalCard from "../../../components/common/AssignVerticalCard/AssignVerticalCard.vue";
import SkillList from "../../../components/common/SkillList/SkillList.vue";
import DocumentPreview from "../../../components/common/DocumentPreview/DocumentPreview.vue";
import { ref } from "vue";
import { useEmployeeStore } from "../../../store";

const route = useRoute();
const modalStore = useEmployeeStore();
const companyId = route.params.companyId;

const documents = ref([
  {
    imageName: "license.png",
    title: "Diploma in Laundry",
    institute: "Dubai Laundry Institute",
    duration: "Sep 2022 - Sep 2024",
    credentialId: "9384932",
  },
  {
    imageName: "license.png",
    title: "Diploma in Laundry",
    institute: "Dubai Laundry Institute",
    duration: "Sep 2022 - Sep 2024",
    credentialId: "9384932",
  },
]);

const openModal = () => {
  modalStore.openModal({
    logoUrl: new URL(
      `../../../assets/images2/emp_detail_1.png`,
      import.meta.url
    ).href,
    details: {
      Designation: "Laundry Expert",
      Company: "ABS Private Ltd",
      "Employment Type": "Full-time",
      Location: "Abu Dhabi",
      "Start Date": "September, 2022",
      "End Date": "September 2024",
    },
    responsibilities: [
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    ],
  });
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

@media (max-width: 991px) {
  .user-profile {
    max-width: 100%;
    padding: 0 20px;
  }
}
</style>
