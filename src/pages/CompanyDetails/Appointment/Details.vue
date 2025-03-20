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
            <InfoDisplay label="Date" value="Sat, 19 Nov 2023" />
            <InfoDisplay label="Time" value="10:30 AM" />
            <InfoDisplay label="Order Type" value="Online" />
            <InfoDisplay label="Payment Status" value="Paid" />
            <InfoDisplay label="Order Amount" value="$150.00" />
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

  <div class="d-flex align-items-center justify-content-center my-4">
    <span class="text-muted fw-bold mx-2">Offer Breakdown</span>
    <div class="flex-grow-1 border-bottom"></div>
    <div
      class="d-flex align-items-center bg-white justify-content-center p-2 rounded-pill ms-3"
    >
      <i class="fa-chevron-up fa-solid"></i>
    </div>
  </div>

  <div class="d-flex justify-content-between">
    <h5 class="fw-semibold">Quote for Services</h5>
    <a href="#" class="text-decoration-none text-primary"> + Add Service </a>
  </div>

  <div class="row row-gap-4 mb-5 mt-3">
    <div class="col-md-4">
      <div class="bg-white border-0 p-4 rounded rounded-4 shadow-sm">
        <div
          class="d-flex align-items-center justify-content-between position-relative mb-3"
        >
          <div>
            <p class="text-primary -font mb-0">Item No 1</p>
            <p class="fs-6 mb-0">Session - Introduction</p>
          </div>
          <div class="position-absolute end-0 me-2 mt-2 top-0">
            <a
              href="/super-admin/company-details/info/authentication"
              class="text-reset"
            >
              <i
                class="text-decoration-underline text-primary fa-pen fa-solid"
              ></i>
            </a>
          </div>
        </div>

        <div
          class="d-flex bg-light justify-content-between rounded mb-3 px-4 py-3 stats-section"
        >
          <div>
            <p class="text-primary mb-0 small-font">Unit Price</p>
            <p class="fw-semibold mb-0">AED 12.00</p>
          </div>
          <div>
            <p class="text-primary mb-0 small-font">Quantity</p>
            <p class="fw-semibold mb-0">24</p>
          </div>
          <div>
            <p class="text-primary mb-0 small-font">Total</p>
            <p class="fw-semibold mb-0">AED 288.00</p>
          </div>
        </div>

        <div>
          <p class="text-primary mb-0 small-font">Delivery Time</p>
          <p class="fw-semibold mb-0">Not Specific</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DescriptionCard from "../../../components/common/DescriptionCard/DescriptionCard.vue";
import FileCard from "../../../components/common/FileCard/FileCard.vue";
import InfoDisplay from "../../../components/common/InfoDisplay/InfoDisplay.vue";
import LocationCard from "../../../components/common/LocationCard/LocationCard.vue";
import PaymentCard from "../../../components/common/PaymentCard/PaymentCard.vue";
import ProfileCard from "../../../components/common/ProfileCard/ProfileCard.vue";
import SectionHeading from "../../../components/common/SectionHeading/SectionHeading.vue";
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
    PaymentCard,
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
