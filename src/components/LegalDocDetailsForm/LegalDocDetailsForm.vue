<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { watch, defineProps, defineEmits, ref, onMounted, nextTick } from "vue";
import { useUserStore } from "../../store";
import TradeLicenseForm from "./TradeLicenseForm.vue";
import ThemeButton from "../common/ThemeButton/ThemeButton.vue";
import { useToast } from "primevue";

const userStore = useUserStore();
const tradeLicenses = ref([]);
const legDocType = ref("emirates_id_details");
const toast = useToast();

const props = defineProps({
  showLegDocModal: Boolean,
  legDocDetails: Object,
});

const emit = defineEmits(["submit", "close"]);

const schema = yup.object({
  trn_number: yup.string().required("TRN number is required"),
  legal_name: yup.string().required("Legal name is required"),

  // Emirates ID Fields Schema
  // client_id: yup.string().required("Company ID is required"),
  emirates_id: yup.string().required("Emirates ID is required"),
  nationality: yup.string().required("Nationality is required"),
  dob: yup.string().required("DOB is required"),
});

const {
  handleSubmit,
  values,
  errors,
  setValues,
  resetForm,
  defineField,
  setFieldValue,
} = useForm({
  validationSchema: schema,
  initialValues: {
    trn_number: "",
    legal_name: "",
    legal_name_list: "",

    // Emirates ID Fields
    client_id: "",
    emirates_id: "",
    nationality: "",
    dob: "",
  },
});

// TRN DETAILS ---
const [trnNumber, trnNumberAttrs] = defineField("trn_number");
const [legalName, legalNameAttrs] = defineField("legal_name");
const [legalNameList, legalNameListAttrs] = defineField("legal_name_list");

// EMIRATES ID DETAILS
const [clientId, clientIdAttrs] = defineField("client_id");
const [emiratesId, emiratesIdAttrs] = defineField("emirates_id");
const [nationality, nationalityAttrs] = defineField("nationality");
const [dob, dobAttrs] = defineField("dob");

watch(
  () => props.legDocDetails,
  (newData) => {
    if (newData) {
      const trn_details = newData.trn_details;
      const emirates_id_details = newData.emirates_id_details;
      if (trn_details) {
        setFieldValue("trn_number", trn_details?.trn_number);
        setFieldValue("legal_name", trn_details?.legal_name);
        setFieldValue(
          "legal_name_list",
          trn_details?.legal_name_list.join(",")
        );
      }

      // Emirates ID Details
      if (emirates_id_details) {
        const {
          verification_result: { response },
        } = emirates_id_details;
        const { success, data } = JSON.parse(response);
        if (success) {
          setFieldValue("client_id", data?.client_id);
        }
        setFieldValue("dob", emirates_id_details?.dob.split("T")[0]);
        setFieldValue("emirates_id", emirates_id_details?.emirates_id);
        setFieldValue("nationality", emirates_id_details?.nationality);
      }

      tradeLicenses.value = newData.trade_licenses;
    }
  },
  { deep: true, immediate: true }
);

const onSubmit = handleSubmit(async (values) => {
  const emptyFields = [];

  const checkField = (value, fieldName) => {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      emptyFields.push(fieldName);
    }
  };

  checkField(values.legal_name_list, "Legal Name List");
  checkField(values.trn_number, "TRN Number");
  checkField(values.legal_name, "Legal Name");
  checkField(values.emirates_id, "Emirates ID");
  checkField(values.nationality, "Nationality");
  checkField(values.dob, "Date of Birth");

  if (tradeLicenses?.value) {
    tradeLicenses.value.forEach((license, index) => {
      checkField(license.license_number, `License #${index + 1} Number`);
      checkField(license.address, `License #${index + 1} Address`);
      checkField(license.legal_form, `License #${index + 1} Legal Form`);
      checkField(license.cbls_number, `License #${index + 1} CBLS Number`);
      checkField(license.expiry_date, `License #${index + 1} Expiry Date`);
      checkField(license.phone_number, `License #${index + 1} Phone Number`);
      checkField(license.activity_name, `License #${index + 1} Activity Name`);
      checkField(license.business_name, `License #${index + 1} Business Name`);
      checkField(
        license.license_status,
        `License #${index + 1} License Status`
      );
      checkField(
        license.establishment_date,
        `License #${index + 1} Establishment Date`
      );
      checkField(
        license.licensing_authority,
        `License #${index + 1} Licensing Authority`
      );
      checkField(
        license.activity_name_arabic,
        `License #${index + 1} Activity Name (Arabic)`
      );
      checkField(
        license.business_name_arabic,
        `License #${index + 1} Business Name (Arabic)`
      );
      checkField(license.state_id, `License #${index + 1} State ID`);
      checkField(license.region, `License #${index + 1} Region`);
    });
  }

  if (emptyFields.length > 0) {
    toast.add({
      severity: "error",
      summary: "Validation Error",
      detail: `Please fill in all required fields: ${emptyFields.join(", ")}`,
      life: 3000,
    });
    return;
  }

  try {
    const transformedData = {
      trn: {
        legal_name_list: values.legal_name_list.split(","),
        trn_number: values.trn_number,
        legal_name: values.legal_name,
      },
      trade_licenses:
        tradeLicenses?.value?.map((license) => ({
          license_number: license.license_number,
          address: license.address,
          legal_form: license.legal_form,
          cbls_number: license.cbls_number,
          expiry_date: license.expiry_date,
          phone_number: license.phone_number,
          activity_name: license.activity_name,
          business_name: license.business_name,
          license_status: license.license_status,
          establishment_date: license.establishment_date,
          licensing_authority: license.licensing_authority,
          activity_name_arabic: license.activity_name_arabic,
          business_name_arabic: license.business_name_arabic,
          state_id: license.state_id,
          region: license.region,
        })) || [],
      emirates_id: {
        emirates_id: values.emirates_id,
        nationality: values.nationality,
        dob: values.dob,
      },
    };

    emit("submit", transformedData);

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Form submitted successfully",
      life: 3000,
    });

    resetForm();
    emit("close");
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Submission Error",
      detail: error.message || "Failed to submit form",
      life: 3000,
    });
  }
});
const handleLegDocTab = (type) => {
  legDocType.value = type;
};

// Function to update a trade license
const updateTradeLicense = (index, updatedLicense) => {
  tradeLicenses.value[index] = updatedLicense;
};

const getTradeLicenseTabName = (index) => {
  return `trade_license_${index}`;
};
</script>

<template>
  <!-- Modal Overlay -->
  <div
    v-if="showLegDocModal"
    class="z-[999] fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[12px] flex justify-center items-center overflow-auto"
  >
    <div class="max-w-screen-md flex flex-col justify-center items-center">
      <div
        class="relative bg-white rounded-3xl overflow-auto 2xl:overflow-hidden h-full 2xl:h-max min-w-3xl"
      >
        <div
          class="bg-gray-200 px-4 py-2 relative flex gap-2 justify-between items-center"
        >
          <h2 class="!text-lg !font-bold mb-0">Legal Documents Details</h2>
          <button type="button" @click="emit('close')">
            <i class="fa-solid fa-xmark text-dm-blue"></i>
          </button>
        </div>

        <form @submit.prevent="onSubmit">
          <div class="flex flex-wrap flex-col gap-6 p-6">
            <div class="flex items-center justify-between gap-2">
              <ul class="nav nav-pills gap-3" id="pills-tab" role="tablist">
                <!-- Trade License Tabs -->

                <!-- Emirates ID Tab -->
                <li class="nav-item" role="presentation">
                  <button
                    :class="`nav-link !text-sm !font-semibold ${
                      legDocType === 'emirates_id_details'
                        ? 'active !bg-vivid-purple !text-white-100'
                        : '!bg-light-lilac !text-dm-blue'
                    }`"
                    id="pills-emiratesid-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-emiratesid"
                    type="button"
                    role="tab"
                    @click="handleLegDocTab('emirates_id_details')"
                    aria-controls="pills-emiratesid"
                    aria-selected="false"
                  >
                    Emirates ID
                  </button>
                </li>

                <!-- TRN Tab -->
                <li class="nav-item" role="presentation">
                  <button
                    :class="`nav-link !text-sm !font-semibold ${
                      legDocType === 'trn_details'
                        ? 'active !bg-vivid-purple !text-white-100'
                        : '!bg-light-lilac !text-dm-blue'
                    }`"
                    id="pills-trn-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-trn"
                    type="button"
                    role="tab"
                    @click="handleLegDocTab('trn_details')"
                    aria-controls="pills-trn"
                    aria-selected="false"
                  >
                    TRN
                  </button>
                </li>
                <li
                  v-for="(license, index) in tradeLicenses"
                  :key="index"
                  class="nav-item"
                  role="presentation"
                >
                  <button
                    :class="`nav-link !text-sm !font-semibold ${
                      legDocType === getTradeLicenseTabName(index)
                        ? 'active !bg-vivid-purple !text-white-100'
                        : '!bg-light-lilac !text-dm-blue'
                    }`"
                    :id="`pills-license-${index}-tab`"
                    data-bs-toggle="pill"
                    :data-bs-target="`#pills-license-${index}`"
                    type="button"
                    role="tab"
                    @click="handleLegDocTab(getTradeLicenseTabName(index))"
                    :aria-controls="`pills-license-${index}`"
                    aria-selected="false"
                  >
                    Trade License {{ index + 1 }}
                  </button>
                </li>
              </ul>

              <img
                v-if="
                  legDocType !== 'trn_details' &&
                  legDocType !== 'emirates_id_details'
                "
                src="../../assets//image/icons/legacy.svg"
                alt="legacy-icon"
                width="48"
                height="48"
                class="w-12 h-12"
              />
            </div>

            <!-- Tab content -->
            <div class="tab-content" id="pills-tabContent">
              <!-- Add your fields for Trade License here -->
              <div
                v-for="(license, index) in tradeLicenses"
                :key="index"
                :class="`tab-pane fade ${
                  legDocType === `trade_license_${index}` ? 'show active' : ''
                }`"
                :id="`pills-license-${index}`"
                role="tabpanel"
                :aria-labelledby="`pills-license-${index}-tab`"
              >
                <TradeLicenseForm
                  :tradeLicense="license"
                  @update="
                    (updatedLicense) =>
                      updateTradeLicense(index, updatedLicense)
                  "
                />
              </div>

              <div
                :class="`tab-pane fade ${
                  legDocType === 'emirates_id_details' ? 'show active' : ''
                }`"
                id="pills-emiratesid"
                role="tabpanel"
                aria-labelledby="pills-emiratesid-tab"
              >
                <!-- Add your fields for Emirates ID here -->
                <div class="flex flex-wrap flex-col gap-2">
                  <div class="flex-1 inline-flex flex-row gap-4">
                    <div class="w-full">
                      <label class="block text-base !font-bold mb-1"
                        >Entered Emirates ID Number</label
                      >
                      <input
                        type="text"
                        v-model="clientId"
                        disabled
                        class="w-full disabled:bg-lavender disabled:text-grayColor p-3 rounded outline-0 focus:outline-0 bg-light-lilac"
                      />
                    </div>
                    <div class="w-full">
                      <label class="block text-base !font-bold mb-1"
                        >Response Emirates ID</label
                      >
                      <input
                        type="text"
                        v-model="emiratesId"
                        v-bind="emiratesIdAttrs"
                        class="w-full p-3 rounded outline-0 focus:outline-0 bg-light-lilac"
                      />
                      <span class="text-red-500 text-sm">{{
                        errors?.emiratesId
                      }}</span>
                    </div>
                  </div>

                  <div class="flex-1 inline-flex flex-row gap-4">
                    <div class="flex-1">
                      <label class="block text-base !font-bold mb-1"
                        >Nationality</label
                      >
                      <input
                        type="text"
                        v-model="nationality"
                        v-bind="nationalityAttrs"
                        class="w-full p-3 rounded outline-0 focus:outline-0 bg-light-lilac"
                      />
                      <span class="text-red-500 text-base">{{
                        errors?.nationality
                      }}</span>
                    </div>

                    <div class="flex-1">
                      <label class="block text-base !font-bold">DOB</label>
                      <input
                        type="date"
                        v-model="dob"
                        v-bind="dobAttrs"
                        placeholder="Date"
                        class="w-full p-3 rounded outline-0 focus:outline-0 bg-light-lilac picker"
                      />
                      <span class="text-red-500 text-sm">{{
                        errors?.dob
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                :class="`tab-pane fade ${
                  legDocType === 'trn_details' ? 'show active' : ''
                }`"
                id="pills-trn"
                role="tabpanel"
                aria-labelledby="pills-trn-tab"
              >
                <!-- Add your fields for TRN here -->
                <div class="flex flex-wrap flex-col gap-2">
                  <div class="flex-1 inline-flex flex-row gap-4">
                    <div class="w-full">
                      <label class="block text-base !font-bold"
                        >TRN Number</label
                      >
                      <input
                        type="text"
                        v-model="trnNumber"
                        v-bind="trnNumberAttrs"
                        class="w-full disabled:bg-lavender disabled:text-grayColor p-3 rounded outline-0 focus:outline-0 bg-light-lilac"
                      />
                    </div>
                    <div class="w-full">
                      <label class="block text-base !font-bold"
                        >Legal Name</label
                      >
                      <input
                        type="text"
                        v-model="legalName"
                        v-bind="legalNameAttrs"
                        class="w-full disabled:bg-lavender disabled:text-grayColor p-3 rounded outline-0 focus:outline-0 bg-light-lilac"
                      />
                      <span class="text-red-500 text-sm">{{
                        errors?.legalName
                      }}</span>
                    </div>
                  </div>

                  <div class="flex-1 inline-flex flex-row gap-4">
                    <div class="flex-1">
                      <label class="block text-base !font-bold"
                        >Legal Names List</label
                      >
                      <input
                        type="text"
                        disabled
                        v-model="legalNameList"
                        v-bind="legalNameListAttrs"
                        class="w-full disabled:bg-lavender disabled:text-grayColor p-3 rounded outline-0 focus:outline-0 bg-light-lilac"
                      />
                      <span class="text-red-500 text-sm">{{
                        errors?.legal_name_list
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex justify-end gap-2 space-x-2 flex-1/2 p-4 border-t border-solid border-soft-pastel-blue"
          >
            <ThemeButton label="Cancel" @click="emit('close')" />
            <ThemeButton :label="'Save'" variant="primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
input.picker[type="date"] {
  position: relative;
}

input.picker[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  color: transparent;
  background: transparent;
}
</style>
