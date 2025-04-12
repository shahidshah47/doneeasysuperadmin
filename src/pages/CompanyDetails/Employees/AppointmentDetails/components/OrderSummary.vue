<template>
  <div class="row my-4 flex">
    <div class="col-md-6 flex flex-col">
      <SectionHeading
        title="Offers Details"
        customClass="!text-base !font-semibold text-dm-blue leading-5"
      />

      <div class="card border-0 rounded-3 flex-grow">
        <div class="card-body position-relative">
          <div class="position-absolute end-0 me-3 mt-3 top-0">
            <span
              class="bg-gradient-primary rounded-sm text-uppercase text-white-100 !text-xs font-bold leding-4 px-2 py-1"
            >
              In Progress
            </span>
          </div>
          <p class="!text-base !text-grayish-purple font-normal leading-5 mb-0">
            ID: 98374861
          </p>
          <h4
            class="text-dm-blue !font-semibold leading-4 !text-[20px] font-theme"
          >
            Laundry Services
          </h4>

          <div class="row g-2 mb-2">
            <div class="col-md-6">
              <InfoDisplay
                label="Date"
                value="Sat, 19 Nov 2023"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                label="Time"
                value="10:30 AM"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                label="Order Type"
                value="Online"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                label="Payment Status"
                value="Paid"
                className="flex flex-col gap-1"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                label="Order Amount"
                value="$150.00"
                className="flex flex-col gap-1"
              />
            </div>
          </div>

          <div class="row">
            <ProfileCard
              :imageSrc="ManagerIcon"
              altText="manager img"
              subText="Manager"
              mainText="John Doe"
            />
            <ProfileCard
              :imageSrc="CompanyIcon"
              altText="ltd"
              mainText="XYZ Bito Group Pvt Ltd"
              linkText="View Details"
            />
          </div>

          <div class="mt-4">
            <SummaryCard
              title="Customer Summary"
              description="Lorem ipsum dolor sit amet consectetur. Proin tellus ac sit ullamcorper morbi condimentum tellus."
              readMoreLink="#"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 flex flex-col">
      <div class="d-flex">
        <h5 class="fw-semibold !text-base !text-dm-blue">Assign to</h5>
        <p
          class="!text-grayColor text-sm leading-5 !font-semibold mb-0 ms-auto font-theme"
        >
          View All
        </p>
      </div>
      <UserProfileCard
        :profileImage="ManagerIcon"
        name="Nancy Tolbert"
        designation="Senior Manager"
        :rating="4"
      />

      <h5 class="fw-semibold mt-3 !text-base !text-dm-blue">Order Location</h5>
      <div class="flex-1 flex">
        <LocationCard
          class="flex-grow h-full"
          address="123 Main St."
          :imageSrc="MapIcon"
          buttonText="Open Map"
        />
      </div>
    </div>
    <div class="col-md-3 flex flex-col">
      <h5 class="fw-semibold !text-base !text-dm-blue">Attachments</h5>
      <FileCard
        fileIcon="../../../../../assets/images2/file-icon.png"
        fileName="Company Profile"
        fileSize="3.2mb"
      />

      <DescriptionCard
        title="Additional terms"
        content="Custom content goes here..."
        linkText="read more"
        :lineClamp="3"
      />
    </div>
  </div>

  <h5 class="fw-semibold">Payment Terms</h5>
  <div class="card border-0 rounded-3">
    <div class="card-body">
      <div class="row">
        <PaymentCard
          badgeText="1st payment"
          paymentDescription="25% - After event reservation."
          paymentDate="2020-05-17, 10:00 AM"
          currency="AED"
          amount="2300.00"
          status="Paid"
        />
      </div>
    </div>
  </div>

  <BreakDown title="Offer Breakdown" @toggle="handleToggle" />

  <div class="mb-4" v-if="services.length > 0">
    <div class="flex justify-between items-center">
      <h5 class="fw-bold !text-base leading-5 text-dm-blue">
        Quote for Services
      </h5>
      <button
        @click="handleServices"
        class="text-decoration-none text-primary !text-sm !font-bold"
      >
        + Add Service
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <ServiceCard
        v-for="(service, index) in services"
        :key="service.id"
        :data="service"
        :itemTitle="`Item No ${index + 1}`"
        @edit="(data) => handleClickEdit(data)"
      />
    </div>
  </div>

  <div v-if="quotations.length > 0">
    <div class="flex justify-between items-center">
      <h5 class="fw-bold !text-base leading-5 text-dm-blue">
        Quote for Materials
      </h5>
      <button
        @click="handleMaterials"
        class="text-decoration-none text-primary !text-sm !font-bold"
      >
        + Add Material
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <MaterialCard
        v-for="(quote, index) in quotations"
        :key="quote.id"
        :itemTitle="`Item No ${index + 1}`"
        :data="quote"
        @edit="(data) => handleClickEdit(data)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BreakDown from "../../../../../components/common/BreakDown/BreakDown.vue";
import DescriptionCard from "../../../../../components/common/DescriptionCard/DescriptionCard.vue";
import FileCard from "../../../../../components/common/FileCard/FileCard.vue";
import InfoDisplay from "../../../../../components/common/InfoDisplay/InfoDisplay.vue";
import LocationCard from "../../../../../components/common/LocationCard/LocationCard.vue";
import PaymentCard from "../../../../../components/common/PaymentCard/PaymentCard.vue";
import ProfileCard from "../../../../../components/common/ProfileCard/ProfileCard.vue";
import SectionHeading from "../../../../../components/common/SectionHeading/SectionHeading.vue";
import ServiceCard from "../../../../../components/common/ServiceCard/ServiceCard.vue";
import SummaryCard from "../../../../../components/common/SummaryCard/SummaryCard.vue";
import UserProfileCard from "../../../../../components/common/UserProfileCard/UserProfileCard.vue";
import MapIcon from "../../../../../assets/images2/map-2.png";
import ManagerIcon from "../../../../../assets/images2/manager.png";
import CompanyIcon from "../../../../../assets/images2/ltd.png";

const handleClickEdit = (data) => {
  if (data.item_title) {
    // appointStore.toggleIsMaterialDetails(data);
  } else {
    // appointStore.toggleIsServiceDetails(data);
  }
};

const services = ref([
  {
    id: 578,
    offer_id: 419,
    item_number: "Item No 1 update",
    title: "Session - Introduction 21",
    description:
      "Lorem ipsum dolor sit amet consectetur. Proin tellus ac sit ullamcorper morbi condimentum tellus.",
    unit_price: "15.00",
    quantity: 38,
    sub_total: "570.00",
    delivery_time: "2026-05-12 20:53:00",
    total: "570.00",
    created_at: "2025-03-07T14:02:00.000000Z",
    updated_at: "2025-04-04T09:31:53.000000Z",
    serviceable_type: null,
    serviceable_id: null,
    user_id: null,
  },
  {
    id: 610,
    offer_id: 419,
    item_number: "Item No 2",
    title: "New service 4",
    description: "Test service description for this 2",
    unit_price: "40.00",
    quantity: 25,
    sub_total: "1000.00",
    delivery_time: "2025-04-04 16:23:00",
    total: "1000.00",
    created_at: "2025-04-03T09:22:00.000000Z",
    updated_at: "2025-04-04T09:28:47.000000Z",
    serviceable_type: null,
    serviceable_id: null,
    user_id: null,
  },
]);

const quotations = ref([
  {
    id: 608,
    offer_id: 419,
    item_title: "Tsgsh",
    description: "Hajsj",
    unit_price: "56.00",
    quantity: 30,
    sub_total: "1680.00",
    delivery_time: "2025-04-05 00:00:00",
    total: "1680.00",
    type: 1,
    created_at: "2025-03-07T14:02:00.000000Z",
    updated_at: "2025-04-04T09:18:28.000000Z",
  },
]);
</script>

<style scoped>
p {
  font-size: 14px;
  font-weight: 500;
}

.stats-section {
  background-color: #f2f4fb;
}
</style>
