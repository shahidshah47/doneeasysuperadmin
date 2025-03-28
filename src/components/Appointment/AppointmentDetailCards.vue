<template>
    <div class="row my-4 flex" v-if="appointmentDetails">
        <div class="col-md-6 flex flex-col">
            <SectionHeading title="Order Details" customClass="!text-base !font-bold text-dm-blue leading-5" />

            <div class="card border-0 rounded-3 flex-grow">
                <div class="card-body relative flex gap-2 flex-wrap flex-col">
                    <div class="inline-flex justify-between items-start">
                        <div>
                            <p class="text-base !text-grayish-purple font-normal leading-5 mb-1">
                                ID: {{ appointmentDetails.order_id }}
                            </p>
                            <h4 class="text-dm-blue !font-bold leading-4 !text-[20px] font-theme">
                                {{ appointmentDetails.offer.order.title }}
                            </h4>
                        </div>
                        <span
                            class="bg-gradient-primary rounded-sm text-uppercase text-white-100 !text-xs font-bold leding-4 px-2 py-1">
                            In Progress</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <InfoDisplay label="Date" :value="formatDateAndTime(appointmentDetails.delivery_date)
                                ?.formattedDate
                            " />
                        <InfoDisplay label="Time" :value="formatDateAndTime(null, appointmentDetails.delivery_time)
                                ?.formattedTime
                            " />
                        <InfoDisplay label="Order Type" :value="getOrderType(appointmentDetails.offer.order.type)" />
                        <InfoDisplay label="Payment Status" value="Paid" />
                        <InfoDisplay label="Order Amount" :value="appointmentDetails.offer.order.total_budget" />
                    </div>

                    <div class="flex justify-between" v-if="user || company">
                        <ProfileCard :filePath="user.profile_picture?.file_path"
                            imageSrc="../../../assets/images2/manager.png" altText="manager img" subText="Manager"
                            :mainText="user.name" />
                        <ProfileCard :filePath="company.company_logo?.file_path"
                            imageSrc="../../../assets/images2/ltd.png" altText="ltd" :mainText="company.company_name"
                            linkText="View Details" @viewDetails="handleViewDetails()" />
                    </div>

                    <div>
                        <SummaryCard title="Customer Summary" :description="appointmentDetails.offer.order.description"
                            readMoreLink="#" />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-3 flex flex-col gap-2">
            <div v-if="appointmentDetails.associate_user?.length > 0" class="h-full flex-1">
                <div class="d-flex">
                    <h5 class="fw-bold !text-base !text-dm-blue">Assign to</h5>
                    <p class="!text-grayColor text-sm leading-5 !font-bold mb-0 ms-auto font-theme">
                        View All
                    </p>
                </div>
                <div v-for="(associate, index) in appointmentDetails.associate_user">
                    <UserProfileCard :key="index" :profileImage="associate.profile_picture.file_path"
                        :name="associate.name" :designation="associate.designation" :rating="4" />
                </div>
            </div>

            <div v-if="appointmentDetails.offer.order.address" class="h-full flex-1">
                <h5 class="fw-bold !text-base !text-dm-blue">Order Location</h5>
                <LocationCard class="flex-grow h-full" :location="{
                    lat: Number(appointmentDetails?.offer?.order?.address?.lat),
                    lng: Number(appointmentDetails?.offer?.order?.address?.lng),
                }" :address="appointmentDetails.offer.order.address.address" buttonText="Open Map" />
            </div>
        </div>

        <div class="col-md-3 flex flex-col">
            <h5 class="fw-bold !text-base !text-dm-blue">Attachments</h5>
            <div v-for="(doc, index) in appointmentDetails.offer.order.documents">
                <FileCard :key="index" fileIcon="../../../assets/images2/file-icon.png" :fileName="doc.file_name"
                    :fileSize="doc.file_size" />
            </div>

            <DescriptionCard title="Additional terms" :content="appointmentDetails.offer.additional_terms"
                linkText="read more" :lineClamp="3" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useCompanyStore } from "../../store";
import { formatDateAndTime, getOrderType } from "../../utils/helper";
import DescriptionCard from "../common/DescriptionCard/DescriptionCard.vue";
import FileCard from "../common/FileCard/FileCard.vue";
import LocationCard from "../common/LocationCard/LocationCard.vue";
import UserProfileCard from "../common/UserProfileCard/UserProfileCard.vue";
import SummaryCard from "../common/SummaryCard/SummaryCard.vue";
import ProfileCard from "../common/ProfileCard/ProfileCard.vue";
import InfoDisplay from "../common/InfoDisplay/InfoDisplay.vue";
import SectionHeading from "../common/SectionHeading/SectionHeading.vue";

const companyStore = useCompanyStore();

const props = defineProps({
    appointmentDetails: Object,
    user: Object,
    company: Object
});

const handleViewDetails = () => {
  companyStore.toggleCompanyDetail();
};

console.log(props.appointmentDetails, "props appointment details");
</script>

