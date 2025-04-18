<template>
  <SectionHeading
    title="Site Survey Progress"
    customClass="!text-base !font-semibold text-dm-blue leading-5"
  />
  <div class="card border-0 rounded-3 p-3 mb-4">
    <div class="row items-center">
      <div class="col-md-3">
        <ProgressStep
          icon="flag.svg"
          text="Start Trip"
          :date="'December 20, 2025 • 10:30 AM'"
          :isActive="true"
        />
      </div>
      <div class="col-md-3">
        <ProgressStep icon="clock.svg" text="Reach to Site" />
      </div>
      <div class="col-md-3">
        <ProgressStep icon="note.svg" text="Surveying" />
      </div>
      <div class="col-md-3">
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
          value="Shane Idrees"
          valueClass="!text-base fw-semibold"
        />
        <InfoItem
          label="Contact No."
          value="+971 75955165"
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
              src="../../../../../assets/images2/big-map.png"
              alt="Map"
              class="!rounded-lg"
            />
          </div>
          <div
            class="card border-0 rounded-3 p-3 !h-full flex flex-col items-center justify-center gap-8"
          >
            <img
              :src="getImagePath('location.svg')"
              :alt="text"
              class="w-32 h-28"
            />
            <div class="max-w-xl mx-auto text-center !px-10">
              <h1 class="!text-[20px] fw-semibold !text-dm-blue">
                Associate reacher to destination
              </h1>
              <p class="!text-sm !text-dm-blue font-normal">
                Optimize your travel with real-time navigation updates and seamless
                integration, ensuring you reach your destination efficiently and
                safely.
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
            v-for="(note, index) in notes"
            :key="index"
            :title="note.title"
            :content="note.content"
            :images="note.images"
            :author="note.author"
            :timestamp="note.timestamp"
            @note-clicked="handleNoteClick"
          />
        </div>
      </div>
    </div>

    <div class="col-md-5">
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
    </div>
  </div>
</template>

<script setup>
import SectionHeading from "../../../../../components/common/SectionHeading/SectionHeading.vue";
import ProgressStep from "../../../../../components/common/ProgressStep/ProgressStep.vue";
import InfoItem from "../../../../../components/common/InfoItem/InfoItem.vue";
import CountdownTimer from "../../../../../components/common/CountdownTimer/CountdownTimer.vue";
import NoteCard from "../../../../../components/common/NoteCard/NoteCard.vue";
import ExecutionLog from "../../../../../components/common/ExecutionLog/ExecutionLog.vue";
import { useSurveyStore } from "../../../../../store";
import { ref } from "vue";

const store = useSurveyStore();

const handleNoteClick = (note) => {
  store.setSelectedNote(note);
};

const notifications = ref([
  {
    image: "exe-image.svg",
    message: "John Doe reached the destination location.",
    date: "Nov 12",
    time: "07:00PM",
  },
  {
    image: "exe-image.svg",
    message: "Alice completed the survey task.",
    date: "Nov 13",
    time: "10:15AM",
  },
  {
    image: "exe-image.svg",
    message: "Bob started a new project phase.",
    date: "Nov 14",
    time: "03:30PM",
  },
]);

const images = [
  { src: "site-survey.jpg", alt: "Profile 1" },
  { src: "site-survey.jpg", alt: "Profile 2" },
  { src: "site-survey.jpg", alt: "Profile 3" },
];

const notes = ref([
  {
    title: "1. Note Title",
    content: "Lorem ipsum dolor sit amet",
    images: images,
    author: "Dianne Russell",
    timestamp: "Nov 12, 2023 at 07:00 PM",
  },
  {
    title: "1. Note Title",
    content: "Lorem ipsum dolor sit amet",
    images: images,
    author: "Dianne Russell",
    timestamp: "Nov 12, 2023 at 07:00 PM",
  },
]);

const getImagePath = (imageName) => {
  return new URL(`../../../../assets/image/icons/${imageName}`, import.meta.url)
    .href;
};
</script>

<style scoped>
.sidebar {
  background-color: #f2f4fb;
}

.breadcrumb {
  background-color: transparent;
}

.progress-step {
  display: flex;
  align-items: center;
  position: relative;
}

.progress-step i {
  font-size: 1.5rem;
}

.progress-bar {
  height: 2px;
}

img {
  border-radius: 10px;
}

.nav-link {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #6c757d;
}

.nav-link:hover {
  color: #007bff;
}

.nav-link i {
  font-size: 1.5rem;
}
</style>
