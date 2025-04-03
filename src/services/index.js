// import { useToast } from "primevue";
// import api from "../api";

// const toast = useToast();

// export const fetchAppointDetailsById = async (id) => {
//     try {
//         const response = await api.get("/superadmin/user/appointment/" + id);
//         if (response.status === 200) {
//             const { data, message } = response?.data;
//             appointmentDetails.value = data;

//             const {
//                 offer,
//                 user: appointmentUser,
//             } = appointmentDetails?.value;
//             const { user: offerUser, payment_terms, services, quotations } = offer || {};

//             user.value = isVendorOrAdmin.value ? appointmentDetails?.value?.user : offerUser || appointmentUser;
//             company.value = user?.value?.company || appointmentUser?.company || "";
//             toast.add({
//                 severity: "success",
//                 summary: "Success",
//                 detail: message,
//                 life: 3000,
//             });
//         }
//     } catch (err) {
//         error.value = "Error fetching data";
//         console.error(err);
//     } finally {
//         loading.value = false;
//     }
// };