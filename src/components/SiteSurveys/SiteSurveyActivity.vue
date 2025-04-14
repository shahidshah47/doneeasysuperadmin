<template>
  <div class="row my-4 flex" v-if="orderActivity">
    <SectionHeading
      title="Site Survey Progress"
      customClass="!text-base !font-semibold text-dm-blue leading-5"
    />
    <div class="card border-0 rounded-3 p-3 mb-4">
      <div
        class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 items-center"
      >
        <div>
          <ProgressStep
            icon="flag.svg"
            text="Start Trip"
            :date="'December 20, 2025 • 10:30 AM'"
            :isActive="true"
          />
        </div>
        <div>
          <ProgressStep icon="clock.svg" text="Reach to Site" />
        </div>
        <div>
          <ProgressStep icon="note.svg" text="Surveying" />
        </div>
        <div>
          <ProgressStep icon="emoji-happy.svg" text="Completed" />
        </div>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-md-3">
        <SectionHeading
          title="Details"
          customClass="!text-base !font-semibold text-dm-blue leading-5"
        />

        <div class="card border-0 rounded-3 p-3 mb-4">
          <InfoItem
            label="Start Trip"
            value="2118 Thornridge Cir."
            valueClass="!text-base fw-semibold"
          />
          <InfoItem
            label="End Trip"
            value="775 Rolling Green Rd."
            valueClass="!text-base fw-semibold"
          />
          <InfoItem
            label="Travel Distance"
            :value="50"
            unit="km"
            valueClass="!text-2xl fw-bold"
          />
          <InfoItem
            label="Travel Time"
            value="15 min"
            valueClass="!text-base fw-semibold"
          />
          <InfoItem
            label="Client Name"
            :value="siteSurveyDetails?.user?.name"
            valueClass="!text-base fw-semibold"
          />
          <InfoItem
            label="Contact No."
            :value="siteSurveyDetails?.user?.mobile_number"
            valueClass="!text-base fw-semibold"
          />
          <InfoItem
            label="Survey Conducted by"
            value="Dianne Russell"
            valueClass="!text-base fw-semibold"
          />
          <InfoItem
            label="Survey Conducted by"
            value="Leslie Alexander"
            valueClass="!text-base fw-semibold"
          />
        </div>

        <SectionHeading
          title="Total Time"
          customClass="!text-base !font-semibold text-dm-blue leading-5"
        />
        <div class="card border-0 rounded-3 p-3 text-center">
          <div class="d-flex gap-3 justify-content-center">
            <CountdownTimer :hours="0" :minutes="15" :seconds="0" />
          </div>
        </div>
      </div>
      <!-- This is the code that I commented on. You can use it -->
      <!-- <div class="col-md-7">
        <SectionHeading
          title="Map"
          customClass="!text-base !font-semibold text-dm-blue leading-5"
        />
        <div>
          <img
            src="../../assets/images2/big-map.png"
            alt="Map"
            class="!rounded-lg"
          />
        </div>
        <div
          class="card border-0 rounded-3 p-3 !h-full flex flex-col items-center justify-center gap-8"
        >
          <img :src="locationIcon" :alt="text" class="w-32 h-28" />
          <div class="max-w-xl mx-auto text-center !px-10">
            <h1 class="!text-[20px] fw-semibold !text-dm-blue">
              Associate reacher to destination
            </h1>
            <p class="!text-sm !text-dm-blue font-normal">
              Optimize your travel with real-time navigation updates and
              seamless integration, ensuring you reach your destination
              efficiently and safely.
            </p>
          </div>
        </div>
      </div> -->

      <div class="col-md-4">
        <SectionHeading
          title="Add note (s) or Attach picture"
          customClass="!text-base !font-semibold text-dm-blue leading-4"
        />
        <div class="card border-0 rounded-3 p-3 mb-4 !h-full">
          <div
            class="flex flex-col gap-4 max-h-full overflow-y-auto vivid-gradient-scrollbar"
          >
            <NoteCard
              v-for="(note, index) in orderActivity?.notes"
              :key="index"
              :title="note.title ? index + 1 + '. ' + note.title : '-'"
              :content="note.description"
              :images="note.media"
              :author="note.author"
              :timestamp="note.timestamp"
              @note-clicked="handleNoteClick"
            />
          </div>
        </div>
      </div>

      <!-- <div class="col-md-5">
        <SectionHeading
          title="Execution summary"
          customClass="!text-base !font-semibold text-dm-blue leading-4"
        />
        <div class="card border-0 rounded-3 p-3 mb-4 !h-full">
          <div
            class="flex flex-col gap-4 max-h-full overflow-y-auto vivid-gradient-scrollbar"
          >
            <ExecutionLog
              v-for="(notification, index) in notifications"
              :key="index"
              :image="notification.image"
              :message="notification.message"
              :date="notification.date"
              :time="notification.time"
            />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRaw, watch } from "vue";

import SectionHeading from "../../components/common/SectionHeading/SectionHeading.vue";
import ProgressStep from "../../components/common/ProgressStep/ProgressStep.vue";
import InfoItem from "../../components/common/InfoItem/InfoItem.vue";
import CountdownTimer from "../../components/common/CountdownTimer/CountdownTimer.vue";
import NoteCard from "../../components/common/NoteCard/NoteCard.vue";
import ExecutionLog from "../../components/common/ExecutionLog/ExecutionLog.vue";
import locationIcon from "../../assets/image/icons/location.svg";
import { useSurveyStore } from "../../store";

const store = useSurveyStore();

const handleNoteClick = (note) => {
  store.setSelectedNote(note);
};

const props = defineProps({
  orderActivity: Object,
  user: Object,
  company: Object,
});

// watch(
//   () => props.orderActivity,
//   (newVal, oldVal) => {
//     console.log("orderSummary changed:", toRaw(newVal));
//   },
//   { immediate: true, deep: true }
// );
</script>
