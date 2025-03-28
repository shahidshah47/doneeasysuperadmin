<template>
  <div class="flex gap-2">
    <button
      v-for="tab in tabs"
      :key="tab.name"
      @click="activeTab = tab.name"
      :class="[
        'px-4 py-3 font-semibold !rounded-lg flex items-center space-x-2',
        activeTab === tab.name
          ? '!bg-vivid-purple text-white'
          : '!bg-white-100 !text-dm-blue',
      ]"
    >
      <span>{{ tab.name }}</span>
      <span
        v-if="tab.count !== null"
        class="!bg-vivid-purple p-[2px] text-xs !font-semibold !rounded-[2px] !text-white-100"
        >{{ formatCount(tab.count) }}</span
      >
    </button>
  </div>
  <OrderSummary
    v-if="orderData && activeTab === 'Summary'"
    :orderData="orderData"
  />
  <OfferDetail v-if="orderData && activeTab === 'Offers'" />
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { ref, onMounted, watch, toRaw } from "vue";
import { useRoute } from "vue-router";
import api from "../../../api";
import OrderSummary from "../../../components/Order/OrderSummary.vue";
import OfferDetail from "../../../components/Order/OfferDetail.vue";

const route = useRoute();
const orderId = ref(null);
const toast = useToast();
const activeTab = ref("Summary");

const orderData = ref(null);

const siteSurveyData = ref(null);

const tabs = ref([
  { name: "Summary", count: null },
  { name: "Offers", count: 0 },
  { name: "Site Survey", count: 0 },
  { name: "Chats", count: 0 },
]);

onMounted(() => {
  orderId.value = route.params.id || route.path.split("/").pop();
  if (orderId.value) {
    fetchOrderData();
  }
});

const fetchOrderData = async () => {
  if (!orderId.value) return;

  let endpoint = "";
  let stateVar = null;
  let useNestedData = false;

  if (activeTab.value === "Summary") {
    endpoint = `/superadmin/order/${orderId.value}`;
    stateVar = orderData;
    useNestedData = true;
  } else if (activeTab.value === "Site Survey") {
    endpoint = `/superadmin/order/site-surveys/list?order_id=${orderId.value}`;
    stateVar = siteSurveyData;
  } else {
    return;
  }

  try {
    const response = await api.get(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("token")}`,
      },
    });

    if (response?.status === 200) {
      stateVar.value = useNestedData ? response.data.data : response.data;

      const dataLength = Array.isArray(stateVar.value)
        ? stateVar.value.length
        : null;
      const tab = tabs.value.find((t) => t.name === activeTab.value);
      if (tab) tab.count = dataLength;

      toast.add({
        severity: "success",
        summary: "Success",
        detail: response.data.message || "Data retrieved successfully",
        life: 3000,
      });
    }
  } catch (error) {
    stateVar.value = null;
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.response?.data?.message || "Failed to retrieve data",
      life: 3000,
    });
  }
};

watch(activeTab, () => {
  fetchOrderData();
});

const formatCount = (count) => {
  return count !== null && count < 10 ? `0${count}` : count;
};
</script>

<style scoped>
button {
  transition: background-color 0.3s, color 0.3s;
}
</style>
