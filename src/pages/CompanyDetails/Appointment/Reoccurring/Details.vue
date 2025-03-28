<template>
  <div class="row my-4 flex">
    <div class="col-md-6">
      <SectionHeading
        title="Active Requests"
        customClass="!text-[20px] !font-semibold text-dm-blue leading-5 mb-3"
      />
      <RequestTable title="Order Details" :requests="requests" />
    </div>
    <div class="col-md-6">
      <SectionHeading
        title="Previous Requests"
        customClass="!text-[20px] !font-semibold text-dm-blue leading-5 mb-3"
      />
      <RequestTable title="Order Summary" :requests="requests" />
    </div>

    <AppointmentDetailCards :appointmentDetails="appointDetails" :user="user" :company="company" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import RequestTable from "../../../../components/common/RequestTable/RequestTable.vue";
import SectionHeading from "../../../../components/common/SectionHeading/SectionHeading.vue";
import { useRoute } from "vue-router";
import { useToast } from "primevue";
import api from "../../../../api";
import AppointmentDetailCards from "../../../../components/Appointment/AppointmentDetailCards.vue";

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const appointDetails = ref(null);
const toast = useToast();
const user = ref(null);
const company = ref(null);
const isUserAvailable = ref(JSON.parse(localStorage.getItem("user")));
const requests = ref([
  {
    date: "2020-05-17, 10:00 AM",
    status: "In Progress",
    summary: "Lorem ipsum...",
  },
  {
    date: "2020-05-17, 10:00 AM",
    status: "Cancelled",
    summary: "Proin tellus...",
  },
]);

const isVendorOrAdmin = computed(() => {
  const { current_user_type, user_type, role_type } = isUserAvailable.value;

  return (
    current_user_type === 3 ||
    (current_user_type === null &&
      user_type === 3 &&
      role_type === "sales_manager") ||
    current_user_type === 6 ||
    (current_user_type === null &&
      user_type === 3 &&
      role_type === "company_owner")
  );
});

const fetchAppointDetailsById = async (id) => {
  try {
    const response = await api.get("/superadmin/user/appointment/" + id);
    if (response.status === 200) {
      const { data, message } = response?.data;
      console.log(data, "data");
      appointDetails.value = data;
      
      const { offer, user: appointmentUser } = appointDetails?.value;
      const { user: offerUser, payment_terms } = offer || {};
      user.value = isVendorOrAdmin.value ? appointDetails?.value?.user : offerUser || appointmentUser;
      company.value = user?.value?.company || appointmentUser?.company || "";
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

const fetchRequestsById = async (id) => {
  try {
    const response = await api.get("/superadmin/user/appointment/request/" + id);
    if (response.status === 200) {
      // const { data, message } = response?.data;
      console.log(response, "data response for fetch requests");
      // toast.add({
      //   severity: "success",
      //   summary: "Success",
      //   detail: message,
      //   life: 3000,
      // });
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
  fetchRequestsById(route.params.appointmentId);
  fetchAppointDetailsById(route.params.appointmentId);
});
</script>
