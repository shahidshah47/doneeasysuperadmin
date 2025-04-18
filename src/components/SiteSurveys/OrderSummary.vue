<template>
  <div class="row my-4 flex" v-if="orderSummary">
    <div class="col-md-6 flex flex-col">
      <SectionHeading
        title="Order Details"
        customClass="!text-base !font-bold text-dm-blue leading-5"
      />

      <div class="card border-0 rounded-3 flex-grow">
        <div class="card-body relative flex gap-2 flex-wrap flex-col">
          <div class="inline-flex justify-between items-start">
            <div>
              <p
                class="text-base !text-grayish-purple font-normal leading-5 mb-1"
              >
                ID: {{ orderSummary.order_id }}
              </p>
              <h4
                class="text-dm-blue !font-bold leading-4 !text-[20px] font-theme"
              >
                {{ orderSummary.order.title }}
              </h4>
            </div>
            <span
              :style="{
                backgroundColor: getOrderStatus(orderSummary?.order?.status)
                  ?.bgColor,
                color: getOrderStatus(orderSummary?.order?.status)?.color,
              }"
              class="rounded-sm text-uppercase !text-xs font-bold leding-4 px-2 py-1"
            >
              {{ getOrderStatus(orderSummary?.order?.status)?.statusText }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InfoDisplay
              label="Start Date"
              :value="
                formatDateAndTime(orderSummary.order.start_date)?.formattedDate
              "
            />
            <InfoDisplay
              label="End Date"
              :value="
                formatDateAndTime(orderSummary.order.end_date)?.formattedDate
              "
            />
            <InfoDisplay
              label="Order Type"
              :value="getOrderType(orderSummary.order.type)"
            />
            <InfoDisplay label="Payment Status" value="Paid" />
            <InfoDisplay
              label="Order Amount"
              :value="formatWithCommas(orderSummary.order.total_budget)"
            />
          </div>

          <div class="flex justify-between" v-if="user || company">
            <ProfileCard
              v-if="user"
              :filePath="user?.profile_picture?.file_path"
              :imageSrc="ManagerIcon"
              altText="manager img"
              subText="Manager"
              :mainText="user?.name"
            />
            <ProfileCard
              v-if="company"
              :filePath="company?.company_logo?.file_path"
              :imageSrc="CompanyIcon"
              altText="ltd"
              :mainText="company?.company_name"
              linkText="View Details"
              @viewDetails="handleViewDetails(company.id)"
            />
          </div>

          <div>
            <SummaryCard
              title="Customer Summary"
              :description="orderSummary.order.description"
              readMoreLink="#"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3 flex flex-col gap-2">
      <div
        v-if="orderSummary.associate_users?.length > 0"
        class="h-full flex-1"
      >
        <div class="d-flex">
          <h5 class="fw-bold !text-base !text-dm-blue">Assign to</h5>
          <p
            class="!text-grayColor text-sm leading-5 !font-bold mb-0 ms-auto font-theme"
          >
            View All
          </p>
        </div>
        <div
          v-for="(associate, index) in orderSummary.associate_users"
          :key="index"
        >
          <UserProfileCard
            :key="index"
            :profileImage="associate.profile_picture.file_path"
            :name="associate.name"
            :designation="associate.designation"
            :rating="4"
          />
        </div>
      </div>

      <div v-if="orderSummary.order.address" class="h-full flex-1">
        <h5 class="fw-bold !text-base !text-dm-blue">Order Location</h5>
        <LocationCard
          class="flex-grow h-full"
          :location="{
            lat: Number(orderSummary?.order?.address?.lat),
            lng: Number(orderSummary?.order?.address?.lng),
          }"
          :address="orderSummary.order.address.address"
          buttonText="Open Map"
        />
      </div>
    </div>

    <div class="col-md-3 flex flex-col">
      <h5 class="fw-bold !text-base !text-dm-blue">Attachments</h5>
      <div v-for="(doc, index) in orderSummary.order.documents" :key="index">
        <FileCard
          :key="index"
          fileIcon="../../../assets/images2/file-icon.png"
          :fileName="doc.file_name"
          :fileSize="doc.file_size"
        />
      </div>

      <DescriptionCard
        v-if="orderSummary?.additional_terms"
        title="Additional terms"
        :content="orderSummary.additional_terms"
        linkText="read more"
        :lineClamp="3"
      />
    </div>
  </div>
  <div class="row my-4 flex">
    <div class="col-md-6 flex flex-col">
      <SectionHeading
        title="Schedule site survey "
        customClass="!text-base !font-semibold text-dm-blue leading-5"
      />
      <div class="card border-0 rounded-3 flex-grow">
        <div class="card-body position-relative">
          <div class="row g-3">
            <div class="col-md-6">
              <InfoDisplay
                className="flex flex-col gap-1"
                label="Survey No.1 Date"
                :value="formatDateAndTime(orderSummary.date)?.formattedDate"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                class="flex flex-col gap-1"
                label="Survey No.1 Time"
                :value="`${formatTime(orderSummary.start_time)} - ${formatTime(
                  orderSummary.end_time
                )}`"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                className="flex flex-col gap-1"
                label="Coordinator Name "
                :value="orderSummary.coordinator_name || '-'"
              />
            </div>
            <div class="col-md-6">
              <InfoDisplay
                className="flex flex-col gap-1"
                label="Coordinator Phone No."
                :value="`+971 ${orderSummary.mobile_number || '-'}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRaw, watch } from "vue";
import {
  formatDateAndTime,
  formatTime,
  formatWithCommas,
  getOrderType,
} from "../../utils/helper";
import DescriptionCard from "../common/DescriptionCard/DescriptionCard.vue";
import FileCard from "../common/FileCard/FileCard.vue";
import LocationCard from "../common/LocationCard/LocationCard.vue";
import UserProfileCard from "../common/UserProfileCard/UserProfileCard.vue";
import SummaryCard from "../common/SummaryCard/SummaryCard.vue";
import ProfileCard from "../common/ProfileCard/ProfileCard.vue";
import InfoDisplay from "../common/InfoDisplay/InfoDisplay.vue";
import SectionHeading from "../common/SectionHeading/SectionHeading.vue";
import { getOrderStatus } from "../../utils/constants";
import ManagerIcon from "../../assets/images2/manager.png";
import CompanyIcon from "../../assets/images2/ltd.png";

const props = defineProps({
  orderSummary: Object,
  user: Object,
  company: Object,
});
</script>
