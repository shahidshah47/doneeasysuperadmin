<template>
  <div class="row my-4 flex">
    <div class="col-md-6 flex flex-col">
      <SectionHeading
        title="Order Details"
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

          <div class="row">
            <div class="col-md-6">
              <InfoDisplay label="Date" value="Sat, 19 Nov 2023" />
            </div>
            <div class="col-md-6">
              <InfoDisplay label="Time" value="10:30 AM" />
            </div>
            <div class="col-md-6">
              <InfoDisplay label="Order Type" value="Online" />
            </div>
            <div class="col-md-6">
              <InfoDisplay label="Payment Status" value="Paid" />
            </div>
            <div class="col-md-6">
              <InfoDisplay label="Order Amount" value="$150.00" />
            </div>
          </div>

          <div class="row">
            <ProfileCard
              imageSrc="../../../assets/images2/manager.png"
              altText="manager img"
              subText="Manager"
              mainText="John Doe"
            />
            <ProfileCard
              imageSrc="../../../assets/images2/ltd.png"
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
        profileImage="../../../assets/images2/profile-1.png"
        name="Nancy Tolbert"
        designation="Senior Manager"
        :rating="4"
      />

      <h5 class="fw-semibold mt-3 !text-base !text-dm-blue">Order Location</h5>
      <div class="flex-1 flex">
        <LocationCard
          class="flex-grow h-full"
          address="123 Main St."
          imageSrc="../../../assets/images2/map-2.png"
          buttonText="Open Map"
        />
      </div>
    </div>

    <div class="col-md-3 flex flex-col">
      <h5 class="fw-semibold !text-base !text-dm-blue">Attachments</h5>
      <FileCard
        fileIcon="../../../assets/images2/file-icon.png"
        fileName="Company Profile"
        fileSize="3.2mb"
      />

      <DescriptionCard
        title="Custom Title"
        content="Custom content goes here..."
        link="https://example.com"
        linkText="read more"
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

  <div class="d-flex justify-content-between align-items-center">
    <h5 class="fw-semibold !text-[20px] leading-5 text-dm-blue">
      Quote for Services
    </h5>
    <a
      href="#"
      class="text-decoration-none text-primary !text-sm !font-semibold"
    >
      + Add Service
    </a>
  </div>

  <div class="row row-gap-4 mb-5 mt-3">
    <div class="col-md-4">
      <ServiceCard
        itemTitle="Item No 1"
        sessionName="Session - Introduction"
        serviceTitle="Service Description"
        serviceDescription="Lorem ipsum dolor sit amet consectetur..."
        editLink="/super-admin/company-details/info/authentication"
        unitPriceLabel="Unit Price"
        unitPrice="AED 12.00"
        quantityLabel="Quantity"
        quantity="24"
        totalLabel="Total"
        total="AED 288.00"
        deliveryTimeLabel="Delivery Time"
        deliveryTime="Not Specific"
      />
    </div>
  </div>

  <div class="d-flex justify-content-between align-items-center">
    <h5 class="fw-semibold !text-[20px] leading-5 text-dm-blue">
      Quote for Materials
    </h5>
    <a
      href="#"
      class="text-decoration-none text-primary !text-sm !font-semibold"
    >
      + Add Material
    </a>
  </div>

  <div class="row row-gap-4 mb-5 mt-3">
    <div class="col-md-4">
      <ServiceCard
        itemTitle="Item No 1"
        sessionName="Lorem ipsum dolor sit amet consectetur. Proin tellus ac sit ullamcorper morbi condimentu"
        editLink="/super-admin/company-details/info/authentication"
        unitPriceLabel="Unit Price"
        unitPrice="AED 12.00"
        quantityLabel="Quantity"
        quantity="24"
        totalLabel="Total"
        total="AED 288.00"
        deliveryTimeLabel="Procurement/lead time"
        deliveryTime="12 Hours"
      />
    </div>
  </div>
</template>

<script>
import BreakDown from "../../../components/common/BreakDown/BreakDown.vue";
import DescriptionCard from "../../../components/common/DescriptionCard/DescriptionCard.vue";
import FileCard from "../../../components/common/FileCard/FileCard.vue";
import InfoDisplay from "../../../components/common/InfoDisplay/InfoDisplay.vue";
import LocationCard from "../../../components/common/LocationCard/LocationCard.vue";
import PaymentCard from "../../../components/common/PaymentCard/PaymentCard.vue";
import ProfileCard from "../../../components/common/ProfileCard/ProfileCard.vue";
import SectionHeading from "../../../components/common/SectionHeading/SectionHeading.vue";
import ServiceCard from "../../../components/common/ServiceCard/ServiceCard.vue";
import StarRating from "../../../components/common/StarRating/StarRating.vue";
import SummaryCard from "../../../components/common/SummaryCard/SummaryCard.vue";
import UserProfileCard from "../../../components/common/UserProfileCard/UserProfileCard.vue";

export default {
  components: {
    InfoDisplay,
    ProfileCard,
    SummaryCard,
    SectionHeading,
    UserProfileCard,
    StarRating,
    LocationCard,
    FileCard,
    DescriptionCard,
    BreakDown,
    PaymentCard,
    ServiceCard,
  },
};
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
