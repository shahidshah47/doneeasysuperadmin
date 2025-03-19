<template>
  <div class="table-responsive">
    <table class="table align-middle mt-5">
      <thead class="bg-gray-200">
        <tr>
          <th
            v-for="header in tableHeaders"
            :key="header"
            class="!text-grayish-purple text-base font-semibold font-theme leading-3.5 !bg-light-lilac"
          >
            <div v-if="header.includes('Sort')" class="flex items-center gap-3">
              {{ header.replace("Sort", "") }}
              <img
                src="../../../assets/image/icons/chevron-down.svg"
                alt="chevron-down"
                class="w-2.5 h-2.5"
              />
            </div>
            <span v-else>{{ header }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="index" class="text-center">
          <td>
            <label
              class="relative flex justify-center items-center w-6 h-6 border-[1.5px] border-[#CFCFD7] rounded cursor-pointer"
            >
              <input type="checkbox" class="hidden peer" />
              <span
                class="absolute w-full h-full bg-vivid-purple rounded hidden peer-checked:flex peer-checked:items-center peer-checked:justify-center text-white"
              >
                ✔
              </span>
            </label>
          </td>
          <td
            class="!text-rich-navy text-sm font-theme font-semibold text-left"
          >
            {{ order.id }}
          </td>
          <td
            class="!text-rich-navy text-sm font-theme font-semibold text-left flex items-center"
          >
            <img :src="order.avatar" alt="Avatar" class="me-2" />
            {{ order.organization }}
          </td>
          <td
            class="!text-rich-navy text-sm font-theme font-semibold text-left"
          >
            {{ order.title }}
          </td>
          <td
            class="!text-rich-navy text-sm font-theme font-semibold text-left flex items-center"
          >
            <img :src="order.verticalImg" alt="Vertical" class="me-2" />
            {{ order.vertical }}
          </td>
          <td
            class="!text-rich-navy text-sm font-theme font-semibold text-left"
          >
            {{ order.orderType }}
          </td>
          <td
            class="!text-dark-indigo-100 text-sm font-theme font-normal text-left"
          >
            {{ order.deliveryDate }}
          </td>
          <td>
            <span
              :class="{
                'bg-green-200 !text-accent-green':
                  order.payment === 'Half Done',
                'bg-blush-100 !text-light-orange': order.payment === 'Pending',
                'bg-info-warning !text-warning-50':
                  order.payment === 'In Progress',
                'bg-gray-200 !text-gray-700': ![
                  'Half Done',
                  'Pending',
                  'In Progress',
                ].includes(order.payment),
              }"
              class="!px-2 text-sm font-theme font-semibold rounded-lg py-1"
            >
              {{ order.payment }}
            </span>
          </td>

          <td class="!text-dm-blue font-semibold text-base font-theme">
            <span class="text-vivid-purple text-xs font-normal">AED</span>
            {{ order.amount }}
          </td>
          <td>
            <span
              :class="{
                'bg-info-warning !text-warning-50':
                  order.paymentState === 'Waiting',
                'bg-blush-100 !text-light-orange':
                  order.paymentState === 'Cancelled',
                'bg-green-200 !text-accent-green': [
                  'In Progress',
                  'Completed',
                ].includes(order.paymentState),
                'bg-gray-200 !text-gray-700': ![
                  'Waiting',
                  'Cancelled',
                  'In Progress',
                  'Completed',
                ].includes(order.paymentState),
              }"
              class="!px-2 text-sm font-theme font-semibold rounded-lg py-1"
            >
              {{ order.paymentState }}
            </span>
          </td>

          <td class="d-flex gap-2 py-4">
            <a :href="order.detailsLink" class="text-decoration-none">
              <div
                class="border !border-vivid-purple py-1.5 px-2.5 rounded-[10px] d-flex align-items-center"
              >
                <img
                  src="../../../assets/image/icons/eye.svg"
                  alt="View"
                  class="w-4 h-6"
                />
              </div>
            </a>
            <div
              class="border !border-vivid-purple py-1.5 px-2.5 rounded-[10px] d-flex align-items-center cursor-pointer"
            >
              <img
                src="../../../assets/image/icons/trash.svg"
                alt="Delete"
                class="w-4 h-6"
              />
            </div>
            <div
              class="border !border-vivid-purple py-1.5 px-2.5 rounded-[10px] d-flex align-items-center cursor-pointer"
            >
              <img
                src="../../../assets/image/icons/share.svg"
                alt="Share"
                class="w-4 h-6"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination />
  </div>
</template>

<script>
import Pagination from "../Pagination/Pagination.vue";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      tableHeaders: [
        "",
        "ID",
        "Organization Name",
        "Title & Description",
        "VerticalSort",
        "Order TypeSort",
        "Expected Delivery Date & Time",
        "Payment",
        "Order Amount",
        "Payment State",
        "Action",
      ],
      orders: [
        {
          id: "98374861",
          avatar: new URL(
            "../../../assets/images2/Avatar (1).png",
            import.meta.url
          ).href,
          organization: "Acme Co.",
          title: "Need business consultant for my startup",
          verticalImg: new URL(
            "../../../assets/images2/vertical_img.png",
            import.meta.url
          ).href,
          vertical: "Event Management",
          orderType: "One-Time",
          deliveryDate: "2020-05-17, 10:00 AM",
          payment: "Half Done",
          amount: "32,100",
          paymentState: "In Progress",
          detailsLink: "/super-admin/company-details/appointment/details",
        },
        {
          id: "98374861",
          avatar: new URL(
            "../../../assets/images2/Avatar (1).png",
            import.meta.url
          ).href,
          organization: "Acme Co.",
          title: "Need business consultant for my startup",
          verticalImg: new URL(
            "../../../assets/images2/vertical_img.png",
            import.meta.url
          ).href,
          vertical: "Event Management",
          orderType: "One-Time",
          deliveryDate: "2020-05-17, 10:00 AM",
          payment: "Pending",
          amount: "32,100",
          paymentState: "Waiting",
          detailsLink: "/super-admin/company-details/appointment/details",
        },
      ],
    };
  },
};
</script>

<style>
tbody,
thead {
  border: 1px solid #ffffff !important;
}
</style>
