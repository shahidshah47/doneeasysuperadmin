<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { watch, defineProps, defineEmits, ref, onMounted } from "vue";
import { formatToMonthDayYear } from "../../utils/helper";
import ThemeButton from "../common/ThemeButton/ThemeButton.vue";
import { useToast } from "primevue";
import { getBasicValues } from "../../services";
import api, { authApi } from "../../api";

const props = defineProps({
  showAddOrUpdateAdminModal: Boolean,
  adminData: Object
});
const toast = useToast();
const roles = ref([]);
const profilePicture = ref("");
const isUploading = ref(false);
const isUploadingemirates_id_front = ref(false);
const isUploadingemirates_id_back = ref(false);
const isUploadingvisa_image = ref(false);
const emit = defineEmits(["submit", "close"]);
const admin = ref({
  emirates_id_front: null,
  emirates_id_back: null,
  visa_image: null
});


// ✅ Define validation schema
const schema = yup.object({
  fullname: yup.string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]*$/, "Full name can only contain letters and spaces"),
  
  designation: yup.string()
    .required("Designation is required")
    .min(2, "Designation must be at least 2 characters"),
  
  mobile: yup.string()
    .required("Mobile number is required")
    .matches(/^5[0-9]{8}$/, "Mobile number must start with 5 and be 9 digits long")
    .test('is-uae-mobile', 'Please enter a valid UAE mobile number', (value) => {
      if (!value) return true; // Let the required validation handle empty values
      return /^5[0-9]{8}$/.test(value);
    }),
  
  email: yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  
  trn: yup.string()
    .required("TRN is required")
    .matches(/^[0-9]{15}$/, "TRN must be exactly 15 digits"),
  
  role_name: yup.string()
    .required("Role is required"),
  
  password: yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  
  confirmPassword: yup.string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match")
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
    fullname: "",
    designation: "",
    mobile: "",
    email: "",
    trn: "",
    role_name: "",
    password: "",
    confirmPassword: ""
  }
});

// ✅ Use fields correctly
const [fullname, fullnameAttrs] = defineField("fullname");
const [designation, designationAttrs] = defineField("designation");
const [mobile, mobileAttrs] = defineField("mobile");
const [email, emailAttrs] = defineField("email");
const [trn, trnAttrs] = defineField("trn");
const [role_name, role_nameAttrs] = defineField("role_name");
const [password, passwordAttrs] = defineField("password");
const [confirmPassword, confirmPasswordAttrs] = defineField("confirmPassword");

// ✅ Watch for changes in props.companyData and update form
watch(
  () => props.adminData,
  (newData) => {
    if (newData) {
      setFieldValue("fullname", "Mohsin Ikram");
    }
  },
  { deep: true, immediate: true }
);

// ✅ Handle form submission correctly
const onSubmit = handleSubmit((values) => {
  const formData = {
    ...values,
    profilePicture: profilePicture?.value?.name,
    emirates_id_front: admin.value.emirates_id_front,
    emirates_id_back: admin.value.emirates_id_back,
    visa_image: admin.value.visa_image
  };
  emit("submit", formData);
  resetForm();
  emit("close");
});

const fetchRoles = async () => {
  try {
    const data = await getBasicValues();
    if (data?.value?.roles?.length > 0) {
      roles.value = data?.value?.roles;
    } else {
      roles.value = [];
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: error?.message, life: 3000 });
  }
};

const togglePasswordVisibility = (field) => {
  const input = document.getElementById(field);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
};

const getImagePath = (imageName) => {
  return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};

const getImageIconPath = (imageName) => {
  return new URL(`../../assets/image/icons/${imageName}`, import.meta.url).href;
};

// File upload method
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: 'Please upload only JPG, PNG or WEBP images', 
      life: 3000 
    });
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: 'File size should not exceed 5MB', 
      life: 3000 
    });
    return;
  }

  try {
    isUploading.value = true;
    const formData = new FormData();
    
    formData.append('field_name', 'profile_picture');
    formData.append('profile_picture', file);

    // Replace this URL with your actual file upload API endpoint
    const response = await authApi.post('/api/upload-temp', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    if (response.status !== 200) throw new Error('Upload failed');
    const { data } = response?.data;
    profilePicture.value = data;
    
    toast.add({ 
      severity: 'success', 
      summary: 'Success', 
      detail: 'Profile picture uploaded successfully', 
      life: 3000 
    });
  } catch (error) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: error.message || 'Failed to upload profile picture', 
      life: 3000 
    });
  } finally {
    isUploading.value = false;
  }
};

// File upload methods
const handleDocumentUpload = async (event, documentType) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: 'Please upload only JPG, PNG, WEBP or PDF files', 
      life: 3000 
    });
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: 'File size should not exceed 5MB', 
      life: 3000 
    });
    return;
  }

  try {
    switch(documentType) {
      case 'emirates_id_front':
        isUploadingemirates_id_front.value = true;
        break;
      case 'emirates_id_back':
        isUploadingemirates_id_back.value = true;
        break;
      case 'visa_image':
        isUploadingvisa_image.value = true;
        break;
    }

    const formData = new FormData();
    formData.append('field_name', documentType);
    formData.append(documentType, file);

    const response = await authApi.post('/api/upload-temp', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    if (response.status !== 200) throw new Error('Upload failed');
    
    const { data } = response?.data;
    const fileData = {
      name: file.name,
      icon: file.type === 'application/pdf' ? 'pdf-icon.png' : 'file-icon.png',
      size: `${(file.size / (1024 * 1024)).toFixed(2)}mb`,
      ...data
    };
    
    switch(documentType) {
      case 'emirates_id_front':
        admin.value.emirates_id_front = fileData;
        break;
      case 'emirates_id_back':
        admin.value.emirates_id_back = fileData;
        break;
      case 'visa_image':
        admin.value.visa_image = fileData;
        break;
    }

    toast.add({ 
      severity: 'success', 
      summary: 'Success', 
      detail: `${documentType === 'visa_image' ? 'Visa' : `Emirates ID ${documentType === 'emirates_id_front' ? 'Front' : 'Back'}`} uploaded successfully`, 
      life: 3000 
    });
  } catch (error) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: error.message || `Failed to upload ${documentType === 'visa_image' ? 'Visa' : `Emirates ID ${documentType === 'emirates_id_front' ? 'Front' : 'Back'}`}`, 
      life: 3000 
    });
  } finally {
    switch(documentType) {
      case 'emirates_id_front':
        isUploadingemirates_id_front.value = false;
        break;
      case 'emirates_id_back':
        isUploadingemirates_id_back.value = false;
        break;
      case 'visa_image':
        isUploadingvisa_image.value = false;
        break;
    }
  }
};

const removeDocument = (documentType) => {
  switch(documentType) {
    case 'emirates_id_front':
      admin.value.emirates_id_front = null;
      break;
    case 'emirates_id_back':
      admin.value.emirates_id_back = null;
      break;
    case 'visa_image':
      admin.value.visa_image = null;
      break;
  }
};

onMounted(() => {
  fetchRoles();
});
</script>

<template>
  <!-- Modal Overlay -->
  <form class="modal-content border-0 rounded-4" @submit.prevent="onSubmit">
    <div class="modal-header border-0 rounded-top-4 flex items-center justify-between"
      style="background-color: #f2f4fb">
      <h5 class="!text-lg !font-bold mb-0" id="addAdminModalLabel">
        Add Admin/Manager
      </h5>
      <button type="button" data-bs-dismiss="modal" aria-label="Close">
        <i class="fa-solid fa-xmark text-dm-blue"></i>
      </button>
    </div>

    <div class="modal-body flex flex-col gap-2">
      <div
        class="mb-3 w-[88px] h-[88px] shadow-lavendar-card rounded-3xl relative">
        <img :src="profilePicture?.url || getImagePath('profile-pic.webp')" class="w-full h-full object-cover rounded-3xl"
          alt="Profile Picture" />
        <label
          class="w-8 h-8 bg-white-100 !rounded-lg flex items-center justify-center absolute z-20 -bottom-2 -right-3 cursor-pointer">
          <input type="file" class="hidden" accept="image/*" @change="handleFileUpload" :disabled="isUploading" />
          <img :src="isUploading ? getImageIconPath('loading.svg') : getImageIconPath('camera-2.svg')" alt="camera-icon" class="w-5 h-5" />
        </label>
      </div>

      <div class="flex-1 inline-flex flex-row gap-4">

        <div class="w-full">
          <label for="fullname" class="block text-base !font-bold mb-1">Full Name</label>
          <input
            type="text"
            v-model="fullname"
            v-bind="fullnameAttrs"
            name="fullname"
            class="w-full p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac"
          />
          <span class="text-red-500 text-sm">{{ errors?.fullname }}</span>
        </div>

        <div class="w-full">
          <label for="designation" class="block text-base !font-bold mb-1">Designation</label>
          <input
            type="text"
            v-model="designation"
            v-bind="designationAttrs"
            name="designation"
            class="w-full p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac"
          />
          <span class="text-red-500 text-sm">{{ errors?.designation }}</span>
        </div>

      </div>

      <div class="flex-1 inline-flex flex-row gap-4">

        <div class="w-full">
          <label for="mobile" class="block text-base !font-bold mb-1">Mobile No</label>
          <div class="relative flex gap-2 items-center justify-center">
            <span class="p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac w-max font-bold">+971</span>
            <input
              type="tel"
              v-model="mobile"
              v-bind="mobileAttrs"
              name="mobile"
              maxlength="9"
              placeholder="5XXXXXXXX"
              class="w-full p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac"
            />
          </div>
          <span class="text-red-500 text-sm">{{ errors?.mobile }}</span>
        </div>

        <div class="w-full">
          <label for="email" class="block text-base !font-bold mb-1">Email Address</label>
          <input
            type="email"
            v-model="email"
            v-bind="emailAttrs"
            name="email"
            class="w-full p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac"
          />
          <span class="text-red-500 text-sm">{{ errors?.email }}</span>
        </div>

      </div>

      <div class="flex-1 inline-flex flex-row gap-4">

        <div class="w-full">
          <label for="trn" class="block text-base !font-bold mb-1">TRN</label>
          <input
            type="text"
            v-model="trn"
            v-bind="trnAttrs"
            name="trn"
            class="w-full p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac"
          />
          <span class="text-red-500 text-sm">{{ errors?.trn }}</span>
        </div>

        <div class="w-full flex flex-col">
          <label for="role_name" class="block text-base !font-bold mb-1">Select Your Role</label>
          <select class="!w-full block p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac" id="role_name" v-model="role_name">
            <option value="">Select Role</option>
            <option v-for="(role, index) in roles" :key="index" :value="role.id">
              {{ role.name }}
            </option>
          </select>
          <span class="text-red-500 text-sm">{{ errors?.role_name }}</span>
        </div>

      </div>

      
      <div class="flex-1 inline-flex flex-row gap-4">

        <div class="w-full">
          <label for="password" class="block text-base !font-bold mb-1">Password</label>
          <div class="input-group relative">
            <input type="password" class="w-full p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac" id="password" v-model="password"
              placeholder="Enter password" />
            <span class="absolute top-1/2 end-0 -translate-y-1/2 me-3"
              @click="togglePasswordVisibility('password')">
              <img src="../../assets/image/icons/eye-2.svg" alt="eye-icon" class="w-4.5 h-4.5" />
            </span>
          </div>
          <span v-if="errors?.password" class="text-red-500 text-sm">{{ errors?.password }}</span>
        </div>

        <div class="w-full flex flex-col">
          <label for="confirmPassword" class="block text-base !font-bold mb-1">Confirm Password</label>
          <div class="input-group relative">
            <input type="password" class="w-full p-3 border-none rounded outline-0 focus:outline-0 bg-light-lilac" id="confirmPassword" v-model="confirmPassword"
              placeholder="Confirm password" />
            <span class="absolute top-1/2 end-0 -translate-y-1/2 me-3"
              @click="togglePasswordVisibility('confirmPassword')">
              <img src="../../assets/image/icons/eye-2.svg" alt="eye-icon" class="w-4.5 h-4.5" />
            </span>
          </div>
          <span v-if="errors?.confirmPassword" class="text-red-500 text-sm">{{ errors?.confirmPassword }}</span>
        </div>

      </div>

      <!-- Document Upload Section -->
      <div class="upload-section">
        <div class="d-flex align-items-center justify-content-center my-4">
          <div class="flex-grow-1 border-bottom"></div>
          <span class="mx-2 text-dm-blue fw-semibold">Upload Documents</span>
          <div class="flex-grow-1 border-bottom"></div>
        </div>

        <div class="flex gap-4 mb-3">
          <div class="flex-1">
            <label class="block text-base !font-bold mb-1">Upload Emirates ID Front
              <span class="text-grayColor text-xs font-semibold">(Optional)</span>
            </label>
            <div class="flex flex-col gap-4">
              <div class="w-full" v-if="!admin.emirates_id_front">
                <label class="w-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                  <input type="file" class="hidden" accept="image/*,.pdf" @change="(e) => handleDocumentUpload(e, 'emirates_id_front')" :disabled="isUploadingemirates_id_front" />
                  <div class="flex flex-col items-center">
                    <img :src="getImageIconPath('upload-svg.svg')" alt="upload" class="w-8 h-8 mb-2" />
                    <span class="text-sm text-gray-600">Upload your image here</span>
                    <span v-if="isUploadingemirates_id_front" class="text-sm text-blue-600">Uploading...</span>
                  </div>
                </label>
              </div>
              <div v-if="admin.emirates_id_front">
                <div class="d-flex align-items-center border rounded-4 gap-2">
                  <div class="bg-success-subtle p-3 rounded-start-4">
                    <img :src="getImagePath('file-icon.png')" alt="File Icon" class="img-fluid w-10" />
                  </div>
                  <div class="flex items-center justify-around w-full gap-2">
                    <div class="flex-auto">
                      <p class="text-sm font-semibold text-dm-blue mb-0 max-w-[80%]">
                        {{ admin.emirates_id_front.name }}
                      </p>
                      <p class="text-vivid-purple mb-0 text-xs font-normal">
                        {{ admin.emirates_id_front.size }}
                      </p>
                    </div>
                    <div class="flex flex-auto items-center gap-2 cursor-pointer mr-2">
                      <img src="../../assets/image/icons/eye.svg" alt="eye-icon" class="w-4.5 h-4.5" />
                      <img src="../../assets/image/icons/Delete.png" alt="delete-icon" class="w-4.5 h-4.5" @click="removeDocument('emirates_id_front')" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-1">
            <label class="block text-base !font-bold mb-1">Upload Emirates ID Back
              <span class="text-grayColor text-xs font-semibold">(Optional)</span>
            </label>
            <div class="flex flex-col gap-4">
              <div class="w-full" v-if="!admin.emirates_id_back">
                <label class="w-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                  <input type="file" class="hidden" accept="image/*,.pdf" @change="(e) => handleDocumentUpload(e, 'emirates_id_back')" :disabled="isUploadingemirates_id_back" />
                  <div class="flex flex-col items-center">
                    <img :src="getImageIconPath('upload-svg.svg')" alt="upload" class="w-8 h-8 mb-2" />
                    <span class="text-sm text-gray-600">Upload your image here</span>
                    <span v-if="isUploadingemirates_id_back" class="text-sm text-blue-600">Uploading...</span>
                  </div>
                </label>
              </div>
              <div v-if="admin.emirates_id_back">
                <div class="d-flex align-items-center border rounded-4 gap-2">
                  <div class="bg-success-subtle p-3 rounded-start-4">
                    <img :src="getImagePath('file-icon.png')" alt="File Icon" class="img-fluid w-10" />
                  </div>
                  <div class="flex items-center justify-around w-full gap-2">
                    <div class="flex-auto">
                      <p class="text-sm font-semibold text-dm-blue mb-0 max-w-[80%]">
                        {{ admin.emirates_id_back.name }}
                      </p>
                      <p class="text-vivid-purple mb-0 text-xs font-normal">
                        {{ admin.emirates_id_back.size }}
                      </p>
                    </div>
                    <div class="flex flex-auto items-center gap-2 cursor-pointer mr-2">
                      <img src="../../assets/image/icons/eye.svg" alt="eye-icon" class="w-4.5 h-4.5" />
                      <img src="../../assets/image/icons/Delete.png" alt="delete-icon" class="w-4.5 h-4.5" @click="removeDocument('emirates_id_back')" />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <div>
          <label class="block text-base !font-bold mb-1">Upload Visa
            <span class="text-grayColor text-xs font-semibold">(Optional)</span>
          </label>
          <div class="flex flex-col gap-4">
            <div class="w-full" v-if="!admin.visa_image">
              <label class="w-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                <input type="file" class="hidden" accept="image/*,.pdf" @change="(e) => handleDocumentUpload(e, 'visa_image')" :disabled="isUploadingvisa_image" />
                <div class="flex flex-col items-center">
                  <img :src="getImageIconPath('upload-svg.svg')" alt="upload" class="w-8 h-8 mb-2" />
                  <span class="text-sm text-gray-600">Upload your image here</span>
                  <span v-if="isUploadingvisa_image" class="text-sm text-blue-600">Uploading...</span>
                </div>
              </label>
            </div>
            <div v-if="admin.visa_image">
              <div class="d-flex align-items-center border rounded-4 w-max">
                <div class="bg-success-subtle p-3 rounded-start-4 flex justify-center">
                  <img :src="getImagePath('file-icon.png')" alt="File Icon" class="img-fluid" style="width: 30px" />
                </div>
                <div class="px-3 flex items-center gap-1 justify-between">
                  <div>
                    <p class="text-sm font-semibold text-dm-blue mb-0 max-w-11/12">
                      {{ admin.visa_image.name }}
                    </p>
                    <p class="text-vivid-purple mb-0 text-xs font-normal">
                      {{ admin.visa_image.size }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2 cursor-pointer">
                    <img src="../../assets/image/icons/eye.svg" alt="eye-icon" class="w-4.5 h-4.5" />
                    <img src="../../assets/image/icons/Delete.png" alt="delete-icon" class="w-4.5 h-4.5" @click="removeDocument('emirates_id_back')" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <ThemeButton label="Cancel" data-bs-dismiss="modal" />
      <ThemeButton :label="'Save'" variant="primary" type="submit" />
    </div>
  </form>
</template>
