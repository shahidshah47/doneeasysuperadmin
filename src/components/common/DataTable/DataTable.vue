<template>
  <div class="table-responsive">
    <table class="table align-middle mt-5">
      <thead class="bg-gray-200">
        <tr>
          <th
            v-for="header in tableHeaders"
            :key="header"
            class="text-base !bg-light-lilac !text-grayish-purple font-semibold font-theme leading-3.5"
          >
            <div v-if="header.includes('Sort')" class="flex gap-3 items-center">
              {{ header.replace("Sort", "") }}
              <img
                src="../../../assets/image/icons/chevron-down.svg"
                alt="chevron-down"
                class="h-2.5 w-2.5"
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
              class="flex border-[#CFCFD7] border-[1.5px] h-6 justify-center rounded w-6 cursor-pointer items-center relative"
            >
              <input type="checkbox" class="hidden peer" />
              <span
                class="bg-vivid-purple h-full rounded text-white w-full absolute hidden peer-checked:flex peer-checked:items-center peer-checked:justify-center"
              >
                ✔
              </span>
            </label>
          </td>
          <td
            class="text-left text-sm !text-rich-navy font-semibold font-theme"
          >
            {{ order.id }}
          </td>
          <td
            class="flex text-left text-sm !text-rich-navy font-semibold font-theme items-center"
          >
            <img :src="order.avatar" alt="Avatar" class="me-2" />
            {{ order.organization }}
          </td>
          <td
            class="text-left text-sm !text-rich-navy font-semibold font-theme"
          >
            {{ order.title }}
          </td>
          <td
            class="flex text-left text-sm !text-rich-navy font-semibold font-theme items-center"
          >
            <img :src="order.verticalImg" alt="Vertical" class="me-2" />
            {{ order.vertical }}
          </td>
          <td
            class="text-left text-sm !text-rich-navy font-semibold font-theme"
          >
            {{ order.orderType }}
          </td>
          <td
            class="text-left text-sm !text-dark-indigo-100 font-normal font-theme"
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
              class="rounded-lg text-sm !px-2 font-semibold font-theme py-1"
            >
              {{ order.payment }}
            </span>
          </td>

          <td class="text-base !text-dm-blue font-semibold font-theme">
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
              class="rounded-lg text-sm !px-2 font-semibold font-theme py-1"
            >
              {{ order.paymentState }}
            </span>
          </td>

          <td class="d-flex gap-2 py-4">
            <a :href="order.detailsLink" class="text-decoration-none">
              <div
                class="d-flex align-items-center border rounded-[10px] !border-vivid-purple px-2.5 py-1.5"
              >
                <img
                  src="../../../assets/image/icons/eye.svg"
                  alt="View"
                  class="h-6 w-5"
                />
              </div>
            </a>
            <div
              class="d-flex align-items-center border rounded-[10px] !border-vivid-purple cursor-pointer px-2.5 py-1.5"
            >
              <img
                src="../../../assets/image/icons/trash.svg"
                alt="Delete"
                class="h-6 w-5"
              />
            </div>
            <div
              class="d-flex align-items-center border rounded-[10px] !border-vivid-purple cursor-pointer px-2.5 py-1.5"
            >
              <img
                src="../../../assets/image/icons/share.svg"
                alt="Share"
                class="h-6 w-5"
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
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Pagination,
  },
  setup() {
    const route = useRoute();
    const companyId = computed(() => route.params.companyId);

    const orders = computed(() => [
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
        detailsLink: `/super-admin/company-details/appointment/details?companyId=${companyId.value}`,
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
        detailsLink: `/super-admin/company-details/appointment/details?companyId=${companyId.value}`,
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
        orderType: "Reoccuring",
        deliveryDate: "2020-05-17, 10:00 AM",
        payment: "Pending",
        amount: "32,100",
        paymentState: "Waiting",
        detailsLink: `/super-admin/company-details/appointment/reoccurring/details?companyId=${companyId.value}`,
      },
    ]);

    return {
      companyId,
      orders,
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
