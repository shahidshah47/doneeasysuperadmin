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

    <div class="col-md-6 flex flex-col">
      <div class="mt-6">
        <SectionHeading
          title="Order Details"
          customClass="!text-[20px] !font-semibold text-dm-blue leading-5 mb-3"
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
            <p
              class="!text-base !text-grayish-purple font-normal leading-5 mb-0"
            >
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
    </div>
    <div class="col-md-3 flex flex-col">
      <div class="mt-6">
        <SectionHeading
          title="Other Location"
          customClass="!text-[20px] !font-semibold text-dm-blue leading-5 mb-3"
        />
        <div class="flex-1 flex">
          <LocationCard
            class="flex-grow h-full"
            address="123 Main St."
            imageSrc="../../../assets/images2/map-2.png"
            buttonText="Open Map"
          />
        </div>
      </div>
    </div>
    <div class="col-md-3 flex flex-col">
      <div class="flex items-center mb-3 mt-6">
        <SectionHeading
          title="Attachments"
          customClass="!text-[20px] !font-semibold text-dm-blue leading-5 m-0"
        />
        <p
          class="!text-grayColor text-sm leading-5 !font-semibold mb-0 ms-auto font-theme"
        >
          View All
        </p>
      </div>
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
</template>

<script>
import InfoDisplay from "../../../../components/common/InfoDisplay/InfoDisplay.vue";
import ProfileCard from "../../../../components/common/ProfileCard/ProfileCard.vue";
import RequestTable from "../../../../components/common/RequestTable/RequestTable.vue";
import SectionHeading from "../../../../components/common/SectionHeading/SectionHeading.vue";
import SummaryCard from "../../../../components/common/SummaryCard/SummaryCard.vue";
import LocationCard from "../../../../components/common/LocationCard/LocationCard.vue";
import FileCard from "../../../../components/common/FileCard/FileCard.vue";
import DescriptionCard from "../../../../components/common/DescriptionCard/DescriptionCard.vue";

export default {
  components: {
    RequestTable,
    SectionHeading,
    InfoDisplay,
    ProfileCard,
    SummaryCard,
    LocationCard,
    FileCard,
    DescriptionCard,
  },
  data() {
    return {
      requests: [
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
      ],
    };
  },
};
</script>
