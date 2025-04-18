<template>
  <article class="user-profile">
    <ProfileHeader :userDetails="userDetails" />
    <ProfileTabs />
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
            <InfoDisplay
              label="Company ID"
              :value="`ID OFC ${userDetails?.user?.company?.id}`"
            />

            <InfoDisplay
              label="No. of Employees"
              :value="userDetails?.user?.company?.company_size"
            />
            <InfoDisplay
              label="HQ Phone No."
              :value="`+971 ${userDetails?.user?.mobile_number}`"
            />
            <InfoDisplay label="HQ Email" :value="userDetails?.user?.email" />
            <InfoDisplay
              label="Joined Date"
              :value="formatToMonthYear(userDetails?.user?.created_at)"
            />

            <InfoDisplay label="Added By" value="-" />
          </div>
        </div>
        <div>
          <SectionHeading
            title="Legal Documents Details"
            customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
          />

          <div class="grid grid-cols-2 gap-4 bg-white-100 p-4 rounded-xl">
            <div
              v-for="(legalDoc, index) in legalDocsDetails"
              :key="index"
              class="flex-1/3"
            >
              <InfoDisplay
                :label="legalDoc?.label"
                :value="legalDoc?.value || '---'"
              />
            </div>
            <div
              v-for="(trade, index) in userDetails?.user?.trade_licenses"
              :key="index"
              class="flex-1/3"
            >
              <InfoDisplay
                :label="`Trade License No. ${trade.id}`"
                :value="trade?.license_number"
              />
            </div>
          </div>
        </div>

        <div class="bg-white p-3 rounded-4" v-if="userDetails?.about">
          <SummaryCard
            title="About"
            :description="userDetails?.about"
            readMoreLink="#"
          />
        </div>

        <div>
          <div
            class="flex justify-between"
            v-if="userDetails?.experiences?.length > 0"
          >
            <SectionHeading
              title="Experiences"
              customClass="!text-lg !font-bold text-dm-blue leading-5 mb-0"
            />
            <p class="text-grayColor text-sm font-semibold">View All</p>
          </div>

          <div
            class="bg-white p-3 rounded-4 mb-3 row"
            v-if="userDetails?.experiences?.length > 0"
          >
            <ExperienceCard
              v-for="experience in userDetails.experiences"
              :key="experience.id"
              :imageSrc="experience.media ? experience.media.file_path : ''"
              altText="emp"
              :jobTitle="experience.title"
              :company="experience.company_name"
              :employmentType="experience.employment_type"
              :duration="
                experience.end_date
                  ? `${formatToMonthYear(
                      experience.start_date
                    )} - ${formatToMonthYear(experience.end_date)}`
                  : `${formatToMonthYear(experience.start_date)} - Present`
              "
              :experience="
                calculateExperience(experience.start_date, experience.end_date)
              "
              :Location="experience.location || 'Not specified'"
              :responsibilities="
                convertDescriptionToList(experience.description)
              "
              @click="openModal(experience)"
            />
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div v-if="documents.length">
          <SectionHeading
            title="Documents"
            customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
          />

          <div>
            <div v-if="documents.length">
              <FileCard
                v-for="(doc, index) in documents"
                :key="index"
                :fileName="doc.fileName || doc.title"
                :fileSize="doc.fileSize"
              />
            </div>
          </div>
        </div>
        <div v-if="userDetails?.verticals?.length > 0">
          <SectionHeading
            title="Assign Verticals"
            customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
          />
        </div>

        <div v-if="userDetails?.verticals?.length > 0">
          <div v-for="(vertical, index) in userDetails?.verticals" :key="index">
            <AssignVerticalCard
              :title="vertical.name"
              icon="electronics-icon.png"
              :stats="[
                {
                  value: vertical.marketing_fee,
                  label: getMonthFromISO(vertical?.created_at),
                },
              ]"
            />
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div v-if="userDetails?.skills?.length > 0">
          <div class="flex justify-between">
            <SectionHeading
              title="Skills"
              customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
            />
          </div>

          <SkillList :tags="userDetails.skills.map((skill) => skill.name)" />
        </div>

        <div v-if="userDetails?.certificates.length > 0">
          <div class="flex justify-between">
            <SectionHeading
              title="Licenses & Certifications"
              customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
            />
            <p class="text-grayColor text-sm font-semibold">View All</p>
          </div>

          <div class="flex flex-col gap-3">
            <div
              v-for="(certificate, index) in userDetails.certificates"
              :key="index"
            >
              <DocumentPreview
                :imageName="certificate.media.file_path"
                :title="certificate.name"
                :institute="certificate.issuing_organization"
                :duration="`${formatToMonthYear(
                  certificate.start_date
                )} - ${formatToMonthYear(certificate.end_date)}`"
                :credentialId="certificate.credential_id"
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
import { onMounted, ref, toRaw, watch } from "vue";
import { useEmployeeStore, useUserStore } from "../../../store";
import api from "../../../api/index.js";
import { useToast } from "primevue";
import {
  getLegalDocsDetails,
  getMonthFromISO,
  formatDate,
  formatToMonthYear,
} from "../../../utils/helper.js";

const route = useRoute();
const modalStore = useEmployeeStore();
const userStore = useUserStore();
const companyId = route.params.companyId;
const loading = ref(true);
const error = ref(null);
const toast = useToast();
const userDetails = ref(null);
const legalDocsDetails = ref(null);
const documents = ref([]);

const fetchEmpDetailsById = async () => {
  try {
    const response = await api.get(
      "/superadmin/user/details?user_id=" + route.params.employeeId
    );
    if (response.status === 200) {
      const { data, message } = response?.data;
      userDetails.value = data;
      userStore.setUserDetails(userDetails?.value);
      legalDocsDetails.value = getLegalDocsDetails(data?.user);

      const user = data?.user;
      const docs = [];

      if (user?.emirates_id_front) {
        docs.push({
          title: "Emirates ID (Front)",
          filePath: user.emirates_id_front.file_path,
          fileName: user.emirates_id_front.file_name,
          fileSize: user.emirates_id_front.file_size,
        });
      }

      if (user?.emirates_id_back) {
        docs.push({
          title: "Emirates ID (Back)",
          filePath: user.emirates_id_back.file_path,
          fileName: user.emirates_id_back.file_name,
          fileSize: user.emirates_id_back.file_size,
        });
      }

      if (user?.visa) {
        docs.push({
          title: "Visa",
          filePath: user.visa.file_path,
          fileName: user.visa.file_name,
          fileSize: user.visa.file_size,
        });
      }

      documents.value = docs;

      localStorage.setItem("employeeDetails", JSON.stringify(data));

      toast.add({
        severity: "success",
        summary: "Success",
        detail: message,
        life: 3000,
      });
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  window.scroll(0, 0);
  fetchEmpDetailsById();
});

const openModal = (experience) => {
  modalStore.openModal({
    logoUrl: experience.media
      ? new URL(experience.media.file_path, import.meta.url).href
      : "",
    details: {
      Designation: experience.title,
      Company: experience.company_name,
      "Employment Type": experience.employment_type,
      Location: experience.location || "Not specified", // Assuming location might not always be available
      "Start Date": formatToMonthYear(experience.start_date),
      "End Date": experience.end_date
        ? formatToMonthYear(experience.end_date)
        : "Present",
    },
    responsibilities: convertDescriptionToList(experience.description),
  });
};

const calculateExperience = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} yrs ${months} mos`;
};

const convertDescriptionToList = (description) => {
  return description
    .split(".")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};
watch(userDetails, (newVal) => {
  console.log("userDetails changed:", toRaw(newVal));
});
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
