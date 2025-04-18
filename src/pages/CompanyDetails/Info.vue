<template>
  <div class="company-details">
    <!-- Company Info and Stats -->
    <CompanyHeader />

    <!-- Company Details -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Left Section (Company & Legal Details) -->
      <div class="col-span-6 flex flex-col gap-4">
        <div class="flex flex-col w-full gap-1">
          <h5 class="!font-bold text-base text-dm-blue">Company Details</h5>
          <div class="bg-white rounded-xl p-4 flex gap-4 flex-wrap relative">
            <div
              class="position-absolute top-0 end-0 me-2 mt-3 bg-light-lilac px-1 py-0.5 rounded"
            >
              <button
                type="button"
                class="text-reset"
                @click="openCreateModal()"
              >
                <img :src="getImageUrl('edit-2.svg')" alt="edit-icon" />
              </button>
            </div>
            <div
              v-for="(company, index) in companyDetails"
              :key="index"
              class="flex-1/3"
            >
              <p class="text-xs font-normal text-vivid-purple m-0">
                {{ company?.label }}
              </p>
              <p class="font-semibold m-0 text-base">
                {{ company?.value || "---" }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full gap-1">
          <h5 class="!font-bold text-base text-dm-blue">
            Legal Documents Details
          </h5>
          <div class="bg-white rounded-xl p-4 flex gap-4 flex-wrap relative">
            <!--  data-bs-toggle="modal" data-bs-target="#legalDocsModal" -->
            <div
              class="position-absolute top-0 end-0 me-2 mt-3 cursor-pointer bg-light-lilac px-1 py-0.5 rounded"
              @click="openLegDocModal()"
            >
              <img :src="getImageUrl('edit-2.svg')" alt="edit-icon" />
            </div>
            <div
              v-for="(legalDoc, index) in legalDocsDetails"
              :key="index"
              class="flex-1/3"
            >
              <p class="theme-label">{{ legalDoc?.label }}</p>
              <p class="font-theme-bold m-0">{{ legalDoc?.value || "---" }}</p>
            </div>

            <div
              v-for="(trade, index) in companyStore.companyData?.user
                ?.trade_licenses"
              :key="index"
              class="flex-1/3"
            >
              <p class="theme-label">Trade License No. {{ trade.id }}</p>
              <p class="font-theme-bold m-0">{{ trade?.license_number }}</p>
            </div>
          </div>
        </div>

        <div
          v-if="locationData?.lat && locationData?.lng"
          class="flex flex-col w-full gap-1"
        >
          <div class="flex justify-between items-center">
            <h5 class="!font-bold text-base text-dm-blue">Pin Location</h5>
          </div>
          <div class="bg-white p-3 relative rounded-xl">
            <div class="absolute top-0 right-0 flex gap-2 mt-4 me-4 z-50">
              <div class="bg-white-100 px-1 py-0.5 rounded">
                <img :src="getImageUrl('edit-2.svg')" alt="edit-icon" />
              </div>
              <div class="bg-white-100 px-1 py-0.5 rounded">
                <img :src="getImageUrl('share.svg')" alt="edit-icon" />
              </div>
            </div>
            <GoogleMapComponent
              :mapCustomStyles="true"
              :height="300"
              :location="locationData"
              :iconUrl="'/location-marker.svg'"
            />
          </div>
        </div>
      </div>

      <!-- Right Section (Admin/Manager & Location) -->
      <div class="col-span-3 flex flex-col w-full">
        <div class="flex justify-between">
          <h5 class="!font-bold text-base text-dm-blue">Admin/Manager</h5>
          <button
            type="button"
            @click="showAddOrUpdateAdminModal = true"
            class="!text-vivid-purple font-semibold text-sm text-decoration-none"
            data-bs-toggle="modal"
            data-bs-target="#addAdminModal"
          >
            + Add New
          </button>
        </div>
        <div class="bg-white py-4 pl-4 pr-2 rounded-xl flex-1">
          <div
            class="max-h-[50rem] overflow-y-auto vivid-scrollbar pr-2 flex flex-col gap-3 overflow-x-hidden"
          >
            <div
              v-for="(user, index) in infoDetails?.company?.users"
              class="p-4 rounded-xl bg-[#f8f9fa] flex flex-col gap-3 items-start"
              :key="index"
            >
              <div>
                <p class="text-xs font-normal text-vivid-purple mb-1">
                  Role - Admin
                </p>
                <div class="inline-flex gap flex-col">
                  <p class="m-0 font-semibold text-base">{{ user?.name }}</p>
                  <p class="m-0 text-xs font-semibold">
                    {{ user?.designation }}
                  </p>
                </div>
              </div>
              <div class="inline-flex flex-col">
                <h4 class="!text-base !font-semibold mb-0">
                  +971 {{ user?.mobile_number }}
                </h4>
                <h4 class="!text-xs mb-0 font-semibold">{{ user?.email }}</h4>
              </div>
              <StyledButton
                :text="' View Details'"
                :className="'w-auto !px-4 !py-2 !rounded-[6px]'"
                :buttonType="'primary'"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-3 flex flex-col w-full">
        <div class="d-flex justify-content-between">
          <h5 class="!font-bold text-base text-dm-blue">Location</h5>
          <button
            type="button"
            @click="showAddOrUpdateLocationModal = true"
            data-bs-toggle="modal"
            data-bs-target="#locationModal"
            class="!text-vivid-purple font-semibold text-sm text-decoration-none"
          >
            + Add New
          </button>
        </div>
        <div
          class="bg-white py-4 pl-4 pr-2 rounded-xl flex flex-col gap-3 flex-1"
        >
          <div
            class="max-h-[50rem] overflow-y-auto vivid-scrollbar pr-2 flex flex-col gap-3 overflow-x-hidden"
          >
            <div
              v-for="(address, index) in infoDetails?.company?.addresses"
              class="p-4 rounded-xl bg-[#f8f9fa] flex flex-col gap-3 items-start"
              :key="index"
            >
              <div class="inline-flex flex-col">
                <p class="text-xs font-normal text-vivid-purple mb-1">
                  Main Office
                </p>
                <p class="!font-bold !text-base m-0">{{ address?.address }}</p>
              </div>
              <StyledButton
                :text="' View Details'"
                :className="'w-auto !px-4 !py-2 !rounded-[6px]'"
                :buttonType="'primary'"
              />
            </div>
            <div
              class="p-4 rounded-xl bg-[#f8f9fa] flex flex-col gap-3 items-start"
              v-if="infoDetails?.company?.addresses?.length === 0"
            >
              <div class="inline-flex flex-col">
                <p class="text-xs font-normal text-vivid-purple mb-1">
                  Main Office
                </p>
                <p class="!font-bold !text-base m-0">
                  {{ infoDetails?.company.address }}
                </p>
              </div>
              <StyledButton
                :text="' View Details'"
                :className="'w-auto !px-4 !py-2 !rounded-[6px]'"
                :buttonType="'primary'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div
      class="col-md-12 d-flex justify-content-center align-items-center gap-14 mt-6"
    >
      <p class="font-bold mb-0 text-base">Quick Actions</p>
      <div class="flex items-center gap-2">
        <StyledButton
          :text="' Edit'"
          :className="'w-auto !px-4 !py-2 !rounded-2xl text-vivid-purple font-bold text-base'"
          :buttonType="'secondary'"
        />
        <StyledButton
          :text="' Delete'"
          :className="'w-auto !px-4 !py-2 !rounded-2xl text-vivid-purple font-bold text-base'"
          :buttonType="'secondary'"
        />
        <StyledButton
          :text="' Organization Mode'"
          :className="'w-auto !px-4 !py-2 !rounded-2xl text-vivid-purple font-bold text-base'"
          :buttonType="'secondary'"
        />
        <StyledButton
          :text="' Share Profile'"
          :className="'w-auto !px-4 !py-2 !rounded-2xl text-vivid-purple font-bold text-base'"
          :buttonType="'secondary'"
        />
        <StyledButton
          :text="'wave off'"
          :className="'w-auto !px-4 !py-2 !rounded-2xl text-vivid-purple font-bold text-base'"
          :buttonType="'secondary'"
        />
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="locationModal"
    tabindex="-1"
    aria-labelledby="locationModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <AddOrUpdateLocation
        :showAddOrUpdateLocationModal="showAddOrUpdateLocationModal"
        :locationData="locationDetails"
        @submit="handleLocationSubmit"
        @close="closeModal"
      />
    </div>
  </div>

  <div
    class="modal fade"
    id="addAdminModal"
    tabindex="-1"
    aria-labelledby="addAdminModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <AddorUpdateAdminForm
        :showAddOrUpdateAdminModal="showAddOrUpdateAdminModal"
        :adminData="addOrUpdateAdminDetails"
        @submit="handleAdminSubmit"
        @close="closeModal"
      />
    </div>
  </div>

  <!-- Modal Component -->
  <CompanyForm
    :showCompanyModal="showCompanyModal"
    :companyData="editingCompany"
    @submit="handleCompanySubmit"
    @close="closeModal"
  />
  <LegalDocDetailsForm
    :showLegDocModal="showLegDocModal"
    :legDocDetails="userStore?.legDocDetails"
    @submit="handleLegDocSubmit"
    @close="closeModal"
  />
</template>

<script setup>
import { onMounted, ref, toRaw, watch } from "vue";
import CompanyHeader from "../../components/CompanyHeader.vue";
import { useRoute } from "vue-router";
import api from "../../api";
import { useCompanyStore, useUserStore } from "../../store";
import { getCompanyDetails, getLegalDocsDetails } from "../../utils/helper";
import CompanyForm from "../../components/CompanyForm/CompanyForm.vue";
import LegalDocDetailsForm from "../../components/LegalDocDetailsForm/LegalDocDetailsForm.vue";
import AddorUpdateAdminForm from "../../components/AddOrUpdateAdminForm/AddOrUpdateAdminForm.vue";
import GoogleMapComponent from "../../components/common/GoogleMapComponent.vue";
import { useToast } from "primevue";
import StyledButton from "../../components/common/StyledButton/StyledButton.vue";
import AddOrUpdateLocation from "../../components/AddOrUpdateLocation/AddOrUpdateLocation.vue";

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const infoDetails = ref(null);
const companyDetails = ref(null);
const legalDocsDetails = ref(null);
const companyStore = useCompanyStore();
const userStore = useUserStore();
const editingCompany = ref(null);
const locationData = ref(null);
const showCompanyModal = ref(false);
const showLegDocModal = ref(false);
const showAddOrUpdateAdminModal = ref(false);
const addOrUpdateAdminDetails = ref(null);
const toast = useToast();

// location moda
const showAddOrUpdateLocationModal = ref(false);
const locationDetails = ref(null);

const openCreateModal = () => {
  editingCompany.value = { ...companyStore?.companyData?.company };
  showCompanyModal.value = true;
  document.body.classList.add("overflow-hidden");
};

const closeModal = () => {
  showCompanyModal.value = false;
  showLegDocModal.value = false;
  showAddOrUpdateAdminModal.value = false;
  document.body.classList.remove("overflow-hidden");
};

const openLegDocModal = () => {
  handleFetchLegDocDetails();
  document.body.classList.add("overflow-hidden");
};

const handleFetchLegDocDetails = async () => {
  try {
    const response = await api.get(
      "/superadmin/user/docs/" + route.params.companyId
    );
    if (response.status === 200) {
      userStore.setLegDocDetails(response?.data?.data);
      toast.add({
        severity: "success",
        summary: "Success",
        detail: response?.data?.message,
        life: 3000,
      });
      showLegDocModal.value = true;
    }
  } catch (err) {
    console.error(err);
    error.value = "Error fetching data";
  } finally {
    loading.value = false;
  }
};

const handleCompanySubmit = async (company) => {
  try {
    const response = await api.post(
      "/superadmin/company/details/" +
        companyStore?.companyData?.user?.organization_id,
      {
        company_name: company.name,
        company_size: company.companySize,
        phone: company.phone,
        email: company.email,
      }
    );
    if (response.status === 200) {
      companyDetails.value = getCompanyDetails(response?.data?.data);
      toast.add({
        severity: "success",
        summary: "Success",
        detail: response?.data?.message,
        life: 3000,
      });
      showCompanyModal.value = false;
      editingCompany.value = null;
    }
  } catch (err) {
    console.error(err);
    error.value = "Error fetching data";
  } finally {
    loading.value = false;
  }
};

const getImageUrl = (path) => {
  return new URL(`../../assets/image/icons/${path}`, import.meta.url).href;
};

const fetchCompanyDetailsById = async (id) => {
  try {
    const response = await api.get("/superadmin/user/details/" + id);
    if (response.status === 200 && response?.data?.success) {
      companyStore.setCompanyData(response.data?.data);
      infoDetails.value = response?.data?.data;
      const user = response?.data?.data?.user;
      companyDetails.value = getCompanyDetails(response?.data?.data?.company);
      locationData.value = {
        lat: Number(response?.data?.data?.company?.latitude),
        lng: Number(response?.data?.data?.company?.longitude),
      };
      toast.add({
        severity: "success",
        summary: "Success",
        detail: response?.data?.message,
        life: 3000,
      });
      legalDocsDetails.value = getLegalDocsDetails(user);
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: response?.data?.message,
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

const handleLegDocSubmit = async (values) => {
  console.log(values, "values");
  try {
    const response = await api.post(
      "/superadmin/user/docs/" + route.params.companyId,
      values
    );
    if (response.status === 200) {
      userStore.setLegDocDetails(response?.data?.data);
      fetchCompanyDetailsById(route.params.companyId);
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleAdminSubmit = async (values) => {
  console.log(
    values,
    companyStore?.companyData?.user?.organization_id,
    "values"
  );
  try {
    const response = await api.post(
      "/superadmin/user/" +
        companyStore?.companyData?.user?.organization_id +
        "/add",
      values
    );
    console.log(response, "response");
    if (response.status === 200 && response.data.success) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: response?.data?.message,
        life: 3000,
      });
      await fetchCompanyDetailsById(route.params.companyId);
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: response?.data?.message,
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

const handleLocationSubmit = async (values) => {
  console.log(values, "values");
};

onMounted(() => {
  window.scroll(0, 0);
  fetchCompanyDetailsById(route.params.companyId);
});

watch(locationData, (newVal) => {
  const rawLocation = toRaw(newVal);
  console.log("Raw locationData:", rawLocation);
});
</script>

<style scoped>
.company-details-box {
  background-color: #fcfdff;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
  font-size: 16px;
  font-weight: 600;
}
</style>
