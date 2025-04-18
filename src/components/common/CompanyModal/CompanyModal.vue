<template>
  <Modal
    :isVisible="isVisible"
    :modalStyles="modalStyles"
    @update:isVisible="isVisible = $event"
  >
    <div
      class="flex flex-row items-center justify-between !bg-light-lilac rounded-tl-2xl rounded-tr-2xl px-6 py-2"
    >
      <h2 class="!text-[20px] !font-semibold text-dm-blue m-0">
        Company Profile
      </h2>
      <button
        @click="closeModal"
        class="text-dm-blue hover:text-black !text-2xl font-semibold"
        type="button"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div
      v-if="details"
      class="flex flex-col gap-4 !bg-white-100 rounded-bl-2xl rounded-br-2xl px-6 py-3 shadow-soft-blue"
    >
      <div class="flex items-center justify-between">
        <div class="flex flex-row items-center gap-6">
          <div class="h-28 w-28 rounded-lg flex items-center justify-center">
            <img
              :src="details.company_logo.file_path"
              alt="Company Logo"
              class="w-full h-full rounded-md"
            />
          </div>
          <div>
            <h1 class="!text-[22px] !font-semibold !text-dm-blue m-0">
              {{ details.company_name }}
            </h1>
            <p class="text-sm !text-vivid-purple m-0">
              Joined {{ formatDateAndTime(details.created_at)?.formattedDate }}
            </p>
            <div class="flex items-center mt-1">
              <StarRating :rating="4" :width="16" :height="16" />
              <span class="ml-1 py-[2px] px-3 bg-light-lilac rounded-2xl">
                <span class="text-sm !font-semibold !text-dm-blue">4.5</span>
              </span>
            </div>
          </div>
        </div>
        <!-- <button
            class=" sm:mt-0 px-3 py-2 bg-primary text-white-100 text-sm !font-semibold !rounded-lg hover:bg-indigo-700 transition-colors uppercase"
          >
            View Details
          </button> -->
      </div>
      <div>
        <h2 class="!text-[20px] !font-semibold">Summary</h2>
        <div class="flex flex-row gap-10">
          <OrderStat
            v-for="(stat, index) in stats"
            :key="index"
            :label="stat.label"
            :value="stat.value"
            :breakPoint="stat.breakPoint"
          />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  defineProps,
  defineEmits,
} from "vue";
import OrderStat from "../OrderStat/OrderStat.vue";
import StarRating from "../StarRating/StarRating.vue";
import { formatDateAndTime } from "../../../utils/helper";
import { useToast } from "primevue";
import { useRoute } from "vue-router";
import api from "../../../api";
import Modal from "../Modal/Modal.vue";
import { useCompanyStore } from "../../../store";
import { storeToRefs } from "pinia";

const details = ref(null);
const error = ref(null);
const loading = ref(true);
const emit = defineEmits(["close"]);
const toast = useToast();
const route = useRoute();
const companyStore = useCompanyStore();
const { companyId } = storeToRefs(companyStore);

const isVisible = ref(true);
const screenWidth = ref(window.innerWidth);
const screenHeight = ref(window.innerHeight);
const profileImageSrc = ref("../../../assets/image/company-profile.png");

const stats = ref([
  { label: "No. of completed orders", value: 2304, breakPoint: "of" },
  { label: "No. of cancelled orders", value: 0, breakPoint: "of" },
  { label: "No. of work in progress", value: 12, breakPoint: "work" },
  { label: "Submitted orders on DocEasy", value: 312, breakPoint: "on" },
]);

const modalStyles = computed(() => ({
  width: screenWidth.value < 768 ? "30vw" : "50vw",
  height: screenHeight.value < 600 ? "80vh" : "auto",
  maxHeight: "90vh",
}));

const profileImageUrl = computed(() => {
  return new URL(profileImageSrc.value, import.meta.url).href;
});

const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

const updateScreenSize = () => {
  screenWidth.value = window.innerWidth;
  screenHeight.value = window.innerHeight;
};

const fetchCompanyDetails = async () => {
  try {
    const response = await api.get(
      "/superadmin/user/appointment/company/" + companyId?.value
    );
    if (response.status === 200) {
      const { data } = response.data;
      details.value = data;
      stats.value = [
        {
          label: "No. of completed orders",
          value: data.completed_orders,
          breakPoint: "of",
        },
        {
          label: "No. of cancelled orders",
          value: data.canceled_orders,
          breakPoint: "of",
        },
        {
          label: "No. of work in progress",
          value: data.in_Progress_orders,
          breakPoint: "work",
        },
        {
          label: "Submitted orders on DocEasy",
          value: data.total_orders,
          breakPoint: "on",
        },
      ];
      toast.add({
        severity: "success",
        summary: "Success",
        detail: response?.data?.message,
        life: 3000,
      });
    }
  } catch (err) {
    console.error(err);
    error.value = "Error fetching data";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
  fetchCompanyDetails();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>
