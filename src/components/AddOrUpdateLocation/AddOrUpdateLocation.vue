<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { ref, onMounted, computed, nextTick, watch } from "vue";
import ThemeButton from "../common/ThemeButton/ThemeButton.vue";
import { useToast } from "primevue";
import { Loader } from "@googlemaps/js-api-loader";

const props = defineProps({
    showAddOrUpdateLocationModal: Boolean,
    locationData: Object
});

const toast = useToast();
const emit = defineEmits(["submit", "close"]);
const officeType = ref("1");
const location = ref({
    lat: props.locationData?.lat ? parseFloat(props.locationData.lat) : 25.2048,
    lng: props.locationData?.lng ? parseFloat(props.locationData.lng) : 55.2708
});
const newAddress = ref("");
const selectedAddress = ref(null);
const isLoading = ref(false);
const map = ref(null);
const autocomplete = ref(null);
const mapElement = ref(null);
const addressInput = ref(null);
const googleMapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const googleApiLoaded = ref(false);
const google = ref(null);

// ✅ Define validation schema
const schema = yup.object({
  state: yup.string()
    .required("State is required"),
  building_name: yup.string()
    .required("Building name is required"),
  office_no: yup.string()
    .required("Office number is required"),
  address: yup.string()
    .required("Address is required"),
  email: yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: yup.string()
    .required("Phone number is required")
    .matches(/^5[0-9]{8}$/, "Phone number must start with 5 and be 9 digits long"),
  near_landmark: yup.string()
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
    state: "",
    building_name: "",
    office_no: "",
    address: "",
    email: "",
    phone_number: "",
    near_landmark: ""
  }
});

// ✅ Use fields correctly
const [state, stateAttrs] = defineField("state");
const [building_name, building_nameAttrs] = defineField("building_name");
const [office_no, office_noAttrs] = defineField("office_no");
const [address, addressAttrs] = defineField("address");
const [email, emailAttrs] = defineField("email");
const [phone_number, phone_numberAttrs] = defineField("phone_number");
const [near_landmark, near_landmarkAttrs] = defineField("near_landmark");

// Initialize Google Maps
const initGoogleMaps = async () => {
  try {
    // If API is already loaded, just initialize the components
    if (googleApiLoaded.value && google.value) {
      initializeMapAndAutocomplete();
      return;
    }

    // Wait for the DOM to be ready
    await nextTick();

    // Check if map element exists
    if (!mapElement.value || !addressInput.value) {
      console.error('Map or address input elements not found');
      return;
    }

    const loader = new Loader({
      apiKey: googleMapApiKey,
      version: "weekly",
      libraries: ["places", "geometry"]
    });

    // Load Google Maps API
    google.value = await loader.load();
    googleApiLoaded.value = true;
    
    initializeMapAndAutocomplete();

  } catch (error) {
    console.error("Error loading Google Maps:", error);
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: 'Failed to load Google Maps', 
      life: 3000 
    });
  }
};

// Separate function to initialize map and autocomplete
const initializeMapAndAutocomplete = () => {
  if (!google.value || !mapElement.value || !addressInput.value) return;

  try {
    // Initialize map
    map.value = new google.value.maps.Map(mapElement.value, {
      center: { lat: location.value.lat, lng: location.value.lng },
      zoom: 15,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeId: google.value.maps.MapTypeId.ROADMAP
    });

    // Add initial marker
    new google.value.maps.Marker({
      map: map.value,
      position: { lat: location.value.lat, lng: location.value.lng },
    });

    // Initialize autocomplete with specific options for UAE regions
    autocomplete.value = new google.value.maps.places.Autocomplete(addressInput.value, {
      componentRestrictions: { country: ["ae"] },
      fields: [
        "address_components",
        "geometry",
        "name",
        "formatted_address",
        "place_id"
      ],
      types: ["(regions)"],
      strictBounds: false,
      language: "en"
    });

    // Bind autocomplete to the map
    autocomplete.value.bindTo("bounds", map.value);

    // Add autocomplete listener
    autocomplete.value.addListener("place_changed", async () => {
      const place = autocomplete.value.getPlace();
      
      if (!place.geometry || !place.geometry.location) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please select a location from the dropdown',
          life: 3000
        });
        return;
      }

      // If the place has a geometry, then present it on a map
      if (place.geometry.viewport) {
        map.value.fitBounds(place.geometry.viewport);
      } else {
        map.value.setCenter(place.geometry.location);
        map.value.setZoom(17);
      }

      // Clear existing markers and add new one
      if (map.value) {
        new google.value.maps.Marker({
          map: map.value,
          position: place.geometry.location
        });
      }

      // Update location
      location.value = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      // Extract address components
      let city = "", state = "", country_code = "", district = "";
      
      for (const component of place.address_components) {
        const type = component.types[0];
        
        switch (type) {
          case "administrative_area_level_1":
            state = component.long_name;
            break;
          case "administrative_area_level_2":
            district = component.long_name;
            break;
          case "locality":
            city = component.long_name;
            break;
          case "country":
            country_code = component.short_name;
            break;
        }
      }

      // Get detailed place information using Places Service
      const service = new google.value.maps.places.PlacesService(map.value);
      service.getDetails(
        {
          placeId: place.place_id,
          fields: ["name", "formatted_address", "vicinity"]
        },
        (detailedPlace, status) => {
          if (status === google.value.maps.places.PlacesServiceStatus.OK) {
            // Update form values with the most accurate information
            setFieldValue("state", state || district || "");
            setFieldValue("building_name", detailedPlace.name || place.name || "");
            newAddress.value = detailedPlace.formatted_address || place.formatted_address;
            
            selectedAddress.value = {
              latitude: location.value.lat,
              longitude: location.value.lng,
              country_code,
              formatted_address: detailedPlace.formatted_address,
              city,
              state,
              district
            };
          }
        }
      );
    });
  } catch (error) {
    console.error("Error initializing map and autocomplete:", error);
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: 'Failed to initialize map components', 
      life: 3000 
    });
  }
};

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  if (!selectedAddress.value) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please select an address from the map',
      life: 3000
    });
    return;
  }

  isLoading.value = true;
  try {
    const formData = {
      ...values,
      office_type: parseInt(officeType.value),
      lat: selectedAddress.value.latitude,
      lng: selectedAddress.value.longitude,
      country_code: selectedAddress.value.country_code
    };

    emit("submit", formData);
    resetForm();
    emit("close");
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message || 'Failed to save address',
      life: 3000
    });
  } finally {
    isLoading.value = false;
  }
});

onMounted(() => {
  initGoogleMaps();
});

// Computed property for form validation
const isFormValid = computed(() => {
  return Object.keys(errors.value || {}).length === 0;
});
</script>

<template>
  <form v-if="showAddOrUpdateLocationModal" class="modal-content border-0 rounded-4" @submit.prevent="onSubmit">
    <div class="modal-header border-0 rounded-top-4 flex items-center justify-between"
      style="background-color: #f2f4fb">
      <h5 class="!text-lg !font-bold mb-0">
        {{ locationData ? 'Edit Address' : 'Add New Address' }}
      </h5>
      <button type="button" @click="$emit('close')" class="close-btn" data-bs-dismiss="modal">
        <i class="fa-solid fa-xmark text-dm-blue"></i>
      </button>
    </div>

    <div class="modal-body flex flex-col gap-2">
      <!-- Office Type Selection -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <input
            type="radio"
            id="main-office"
            v-model="officeType"
            value="1"
            class="hidden peer"
          />
          <label
            for="main-office"
            :class="['rounded-xl flex items-center cursor-pointer p-3 gap-2', 
              officeType === '1' ? 'gradient-field' : 'bg-white']"
          >
            <i class="fas fa-building"></i>
            <span class="text-base font-semibold">Main Office</span>
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="site-office"
            v-model="officeType"
            value="2"
            class="hidden peer"
          />
          <label
            for="site-office"
            :class="['rounded-xl flex items-center cursor-pointer p-3 gap-2',
              officeType === '2' ? 'gradient-field' : 'bg-white']"
          >
            <i class="fas fa-hard-hat"></i>
            <span class="text-base font-semibold">Site Office</span>
          </label>
        </div>
      </div>

      <!-- Google Maps Address Search -->
      <div class="flex flex-col gap-2">
        <label class="text-base font-semibold">
          Search Location
          <span class="text-gray-500 text-sm">(Enter emirate, city, or area)</span>
        </label>
        <div class="relative">
          <input
            ref="addressInput"
            v-model="newAddress"
            type="text"
            class="w-full p-3 pl-10 border-none rounded-xl outline-0 focus:outline-0 bg-light-lilac address-search-input"
            placeholder="e.g., Dubai, Abu Dhabi, Al Barsha, Business Bay"
          />
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      <!-- Address Details -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <label class="text-base font-semibold mb-1">State/province</label>
          <input
            v-model="state"
            v-bind="stateAttrs"
            type="text"
            class="w-full p-3 border-none rounded-xl outline-0 focus:outline-0 bg-light-lilac"
          />
          <span class="text-red-500 text-sm">{{ errors?.state }}</span>
        </div>

        <div class="flex flex-col">
          <label class="text-base font-semibold mb-1">Full Address</label>
          <input
            v-model="building_name"
            v-bind="building_nameAttrs"
            type="text"
            class="w-full p-3 border-none rounded-xl outline-0 focus:outline-0 bg-light-lilac"
          />
          <span class="text-red-500 text-sm">{{ errors?.building_name }}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <label class="text-base font-semibold mb-1">Suite/Office No</label>
          <input
            v-model="office_no"
            v-bind="office_noAttrs"
            type="text"
            class="w-full p-3 border-none rounded-xl outline-0 focus:outline-0 bg-light-lilac"
          />
          <span class="text-red-500 text-sm">{{ errors?.office_no }}</span>
        </div>

        <div class="flex flex-col">
          <label class="text-base font-semibold mb-1">Friendly Name</label>
          <input
            v-model="address"
            v-bind="addressAttrs"
            type="text"
            class="w-full p-3 border-none rounded-xl outline-0 focus:outline-0 bg-light-lilac"
          />
          <span class="text-red-500 text-sm">{{ errors?.address }}</span>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="border-2 border-dashed border-gray-300 p-3 rounded-xl relative mt-6">
        <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-4">
          <span class="text-gray-600 font-semibold">Location Contact Details</span>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mt-2">
          <div class="flex flex-col">
            <label class="text-base font-semibold mb-1">Email</label>
            <input
              v-model="email"
              v-bind="emailAttrs"
              type="email"
              class="w-full p-3 border-none rounded-xl outline-0 focus:outline-0 bg-light-lilac"
            />
            <span class="text-red-500 text-sm">{{ errors?.email }}</span>
          </div>

          <div class="flex flex-col">
            <label class="text-base font-semibold mb-1">Mobile No</label>
            <div class="flex gap-2">
              <span class="p-3 bg-light-lilac rounded-xl font-bold">+971</span>
              <input
                v-model="phone_number"
                v-bind="phone_numberAttrs"
                type="text"
                maxlength="9"
                class="w-full p-3 border-none rounded-xl outline-0 focus:outline-0 bg-light-lilac"
                placeholder="5XXXXXXXX"
              />
            </div>
            <span class="text-red-500 text-sm">{{ errors?.phone_number }}</span>
          </div>
        </div>
      </div>

      <!-- Landmark -->
      <div class="flex flex-col">
        <label class="text-base font-semibold mb-1">
          Nearest landmark
          <span class="text-gray-500 text-sm">(optional)</span>
        </label>
        <textarea
          v-model="near_landmark"
          v-bind="near_landmarkAttrs"
          rows="3"
          class="w-full p-3 border-none rounded-xl outline-0 focus:outline-0 bg-light-lilac"
        ></textarea>
      </div>
    </div>

    <div class="modal-footer flex justify-end gap-3 mt-4">
      <ThemeButton 
        label="Cancel" 
        @click="$emit('close')" 
        data-bs-dismiss="modal"
      />
      <ThemeButton 
        :label="isLoading ? 'Saving...' : (locationData ? 'Save' : 'Add Now')"
        variant="primary" 
        type="submit"
        :disabled="!isFormValid || isLoading"
      />
    </div>
  </form>
</template>

<style scoped>
.gradient-field {
  background: linear-gradient(to right, #e9efff, #f2f4fb);
}

#map {
  border: 4px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Google Maps Autocomplete styles */
.pac-container {
  z-index: 9999;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
  font-family: inherit;
}

.pac-item {
  padding: 8px 12px;
  cursor: pointer;
}

.pac-item:hover {
  background-color: #f2f4fb;
}

.pac-item-query {
  font-size: 14px;
  color: #333;
}

/* Ensure the autocomplete input is above other elements */
.address-search-input {
  position: relative;
  z-index: 1000;
}
</style>

