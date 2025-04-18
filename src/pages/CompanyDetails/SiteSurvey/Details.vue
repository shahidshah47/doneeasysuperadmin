<template>
  <div v-if="siteSurveyDetails">
    <div
      class="flex items-center gap-2"
      v-if="siteSurveyDetails.progress_status !== 0"
    >
      <button
        class="btn !font-semibold"
        :class="
          activeButton === 'order'
            ? '!bg-vivid-purple !text-white-100'
            : 'btn-light'
        "
        @click="setActiveButton('order')"
      >
        Order Summary
      </button>
      <button
        class="btn me-2 !font-semibold"
        :class="
          activeButton === 'survey'
            ? '!bg-vivid-purple !text-white-100'
            : 'btn-light'
        "
        @click="setActiveButton('survey')"
        style="text-transform: none !important"
      >
        Site Survey Activity
      </button>
    </div>

    <div v-if="activeButton === 'survey'">
      <SiteSurveyActivity :orderActivity="siteSurveyDetails" />
    </div>
    <div v-if="activeButton === 'order'">
      <OrderSummary
        :orderSummary="siteSurveyDetails"
        :user="user"
        :company="company"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useSurveyStore } from "../../../store";
import api from "../../../api";
import { useRoute } from "vue-router";
import { useToast } from "primevue";
import OrderSummary from "../../../components/SiteSurveys/OrderSummary.vue";
import SiteSurveyActivity from "../../../components/SiteSurveys/SiteSurveyActivity.vue";

const route = useRoute();
const siteSurveyDetails = ref(null);
const user = ref(null);
const company = ref(null);
const loading = ref(true);
const error = ref(null);
const toast = useToast();
const activeButton = ref("survey");

const setActiveButton = (button) => {
  activeButton.value = button;
};

const fetchSiteSurveyDetailsById = async (id) => {
  try {
    const response = await api.get("/superadmin/user/site-survey/" + id);
    if (response.status === 200) {
      const { data, message } = response?.data;
      siteSurveyDetails.value = data;
      user.value = data?.order?.user;
      company.value = data?.order?.company;
      if (data.progress_status === 0) {
        setActiveButton("order");
      }
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
  fetchSiteSurveyDetailsById(route.params.siteSurveyId);
});
</script>

<style scoped>
.sidebar {
  background-color: #f2f4fb;
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
