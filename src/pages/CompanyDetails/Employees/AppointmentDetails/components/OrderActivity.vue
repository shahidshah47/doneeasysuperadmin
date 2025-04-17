<template>
  <SectionHeading
    title="Order Progress"
    customClass="!text-base !font-semibold text-dm-blue leading-5"
  />
  <div class="card border-0 rounded-3 p-3 mb-4">
    <div class="row items-center">
      <div v-for="(step, index) in steps" :key="index" class="col-md-3">
        <ProgressStep
          :icon="getIcon(step, index + 1)"
          :text="step.text"
          :date="
            orderActivity?.progress_status >= index + 1 ? formattedDate : ''
          "
          :isActive="checkActive(index + 1)"
        />
      </div>
    </div>
  </div>

  <div class="row mb-5">
    <div class="col-md-3">
      <div
        v-if="
          orderActivity?.progress_status === 1 ||
          orderActivity?.progress_status === 2
        "
      >
        <SectionHeading
          title="Details"
          customClass="!text-base !font-semibold text-dm-blue leading-5 mb-1"
        />

        <div class="card border-0 rounded-3 p-3 mb-4">
          <InfoItem
            label="Start Trip"
            :value="orderActivity?.order?.address?.address"
            valueClass="!text-base fw-semibold"
          />
          <InfoItem
            label="End Trip"
            :value="orderActivity?.order?.address?.address"
            valueClass="!text-base fw-semibold"
          />
          <!-- <InfoItem
            label="Travel Distance"
            :value="50"
            unit="km"
            valueClass="!text-2xl fw-bold"
          />
          <InfoItem
            label="Travel Time"
            value="15 min"
            valueClass="!text-base fw-semibold"
          /> -->
          <InfoItem
            label="Client Name"
            :value="orderActivity?.offer?.user?.name"
            valueClass="!text-base fw-semibold"
          />
          <InfoItem
            label="Contact No."
            :value="`+97 ${orderActivity?.offer?.user?.mobile_number}`"
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
      </div>

      <div
        v-if="
          orderActivity?.total_time && orderActivity?.timer_summery.length > 0
        "
      >
        <SectionHeading
          title="Total Time"
          customClass="!text-base !font-semibold text-dm-blue leading-5"
        />
        <div class="card border-0 rounded-3 p-3 text-center">
          <div class="flex gap-3 justify-content-center">
            <CountdownTimer
              :hours="hours"
              :minutes="minutes"
              :seconds="seconds"
            />
          </div>
          <div
            class="flex flex-col gap-4 mt-4"
            v-if="
              orderActivity?.progress_status === 3 ||
              orderActivity?.progress_status === 4
            "
          >
            <TimeCard
              v-for="(entry, index) in orderActivity?.timer_summery"
              :key="entry.id"
              :day="Math.floor(entry.total_working_time / 86400)"
              :hours="Math.floor((entry.total_working_time % 86400) / 3600)"
              :minutes="Math.floor((entry.total_working_time % 3600) / 60)"
              :seconds="entry.total_working_time % 60"
              :active="index === 0"
            />
          </div>
        </div>
      </div>
      <div
        v-if="
          (orderActivity?.progress_status === 3 ||
            orderActivity?.progress_status === 4) &&
          orderActivity?.before_pictures.length > 0
        "
      >
        <div class="flex justify-between mt-4">
          <SectionHeading
            title="Before Work Picture"
            customClass="!text-lg !font-bold text-dm-blue leading-5"
          />

          <p class="text-grayColor text-sm font-semibold">View All</p>
        </div>
        <div
          class="card border-0 rounded-3 p-3 text-center flex flex-row gap-2"
        >
          <div
            v-for="(image, index) in orderActivity?.before_pictures"
            :key="index"
            class="w-[88px] h-[62px] overflow-hidden border-2 border-solid border-white-100 rounded"
          >
            <img
              :src="image.file_path"
              alt="work-before-image"
              class="img-fluid rounded w-full h-full"
            />
          </div>
        </div>
      </div>
      <div
        v-if="
          (orderActivity?.progress_status === 3 ||
            orderActivity?.progress_status === 4) &&
          orderActivity?.after_pictures.length > 0
        "
      >
        <div class="flex justify-between mt-4">
          <SectionHeading
            title="After Work Picture"
            customClass="!text-lg !font-bold text-dm-blue leading-5"
          />
          <p class="text-grayColor text-sm font-semibold">View All</p>
        </div>
        <div
          class="card border-0 rounded-3 p-3 text-center flex flex-row gap-2"
        >
          <div
            v-for="(image, index) in orderActivity.after_pictures"
            :key="index"
            class="w-[88px] h-[62px] overflow-hidden border-2 border-solid border-white-100 rounded"
          >
            <img
              :src="image.file_path"
              alt="work-after-picture"
              class="img-fluid rounded w-full h-full"
            />
          </div>
        </div>
      </div>

      <div class="mt-4" v-if="orderActivity?.progress_status === 4">
        <SectionHeading
          title="Download completion report & Sign off"
          customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
        />

        <div
          class="card border-0 rounded-3 p-2.5 text-center"
          v-if="orderActivity?.sign_off"
        >
          <div class="!bg-light-lilac !rounded-lg flex w-full justify-center">
            <img
              v-if="showImage"
              :src="orderActivity?.sign_off"
              alt="signature"
              class="w-44 h-28"
              @error="showImage = false"
            />
          </div>
        </div>
      </div>
      <div class="mt-3" v-if="orderActivity?.progress_status === 4">
        <div
          v-for="(doc, index) in orderActivity?.complete_reports"
          :key="index"
        >
          <FileCard :fileName="doc.file_name" :fileSize="doc.file_size" />
        </div>
      </div>
      <div v-if="orderActivity?.progress_status === 4">
        <SectionHeading
          title="Review for Company"
          customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
        />
        <div
          v-for="review in orderActivity?.order?.company_reviews"
          :key="review.id"
        >
          <CompanyReview
            :profilePic="
              review.reviewed_by.profile_picture || '/images/user1.jpg'
            "
            :name="review.reviewed_by.name"
            :role="review.reviewed_by.designation"
            :stars="parseFloat(review.avg_rating)"
            :review="review.review_text"
            :reviewImg="review.order.image || '/images/company-logo.png'"
            :orderTitle="review.order.title"
            :reviewDate="formatDate(review.created_at)"
          />
        </div>
      </div>
    </div>

    <!-- This is the code that I commented on. You can use it -->
    <div
      class="col-md-7"
      v-if="
        orderActivity?.progress_status === 1 ||
        orderActivity?.progress_status === 2
      "
    >
      <SectionHeading
        title="Map"
        customClass="!text-base !font-semibold text-dm-blue leading-5"
      />
      <div v-if="orderActivity?.progress_status === 1">
        <img
          src="../../../../../assets/images2/big-map.png"
          alt="Map"
          class="!rounded-lg"
        />
      </div>
      <div
        class="card border-0 rounded-3 p-3 !h-full flex flex-col items-center justify-center gap-8"
        v-if="orderActivity?.progress_status === 2"
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
    </div>

    <div
      className="grid grid-cols-2 grid-rows-2 gap-4  col-md-9 "
      v-if="
        orderActivity?.progress_status === 3 ||
        orderActivity?.progress_status === 4
      "
    >
      <div className="col-span-2 md:col-span-1">
        <div v-if="orderActivity?.notes?.length > 0" class="h-full">
          <SectionHeading
            title="Add note (s) or Attach picture"
            customClass="!text-base !font-semibold text-dm-blue leading-4"
          />
          <div className="card border-0 rounded-3 p-3 mb-4 !h-full">
            <div
              class="flex flex-col gap-4 max-h-full overflow-y-auto vivid-gradient-scrollbar"
            >
              <NoteCard
                v-for="note in orderActivity?.notes"
                :key="note.id"
                :title="note.title"
                :content="note.description"
                :images="note.media"
                :author="orderActivity?.order?.user?.name"
                :timestamp="getPrettyDateTime(note.created_at)"
                @note-clicked="handleNoteClick(note)"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2 md:col-span-1">
        <SectionHeading
          title="Execution summary"
          customClass="!text-base !font-semibold text-dm-blue leading-4"
        />
        <div className="card border-0 rounded-3 p-3 mb-4 !h-full">
          <div
            className="flex flex-col gap-4 max-h-full overflow-y-auto vivid-gradient-scrollbar"
          >
            <ExecutionLog
              v-for="(notification, index) in orderActivity?.execution_logs"
              :key="index"
              :image="exeIcon"
              :message="notification.description"
              :date="getPrettyDateTime(notification.created_at)"
            />
          </div>
        </div>
      </div>

      <div
        class="col-span-2 grid grid-cols-2 gap-4 mt-4"
        v-if="orderActivity?.progress_status === 4"
      >
        <div
          v-for="(review, index) in orderActivity?.order?.user_reviews"
          :key="index"
        >
          <SectionHeading
            title="Review for Associate"
            customClass="!text-base !font-semibold text-dm-blue leading-4"
          />
          <AssociateReview :associate="review" :stars="review.avg_rating" />
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
import TimeCard from "../../../../../components/common/TimeCard/TimeCard.vue";
import FileCard from "../../../../../components/common/FileCard/FileCard.vue";
import CompanyReview from "../../../../../components/common/CompanyReview/CompanyReview.vue";
import AssociateReview from "../../../../../components/common/AssociateReview/AssociateReview.vue";
import { useSurveyStore } from "../../../../../store";
import { onMounted, ref, toRaw, watch } from "vue";
import exeIcon from "../../../../../assets/image/icons/exe-image.svg";
import { formatDate, getPrettyDateTime } from "../../../../../utils/helper";

const showImage = ref(true);

const store = useSurveyStore();
const props = defineProps({
  orderActivity: Object,
});

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const showCountdown = ref(false);

watch(
  () => props.orderActivity?.total_time,
  (totalTime) => {
    if (typeof totalTime === "number" && totalTime > 0) {
      hours.value = Math.floor(totalTime / 3600);
      minutes.value = Math.floor((totalTime % 3600) / 60);
      seconds.value = totalTime % 60;
      showCountdown.value = true;
    } else {
      showCountdown.value = false;
    }
  },
  { immediate: true }
);
const steps = [
  { text: "Start Trip", icon: "flag.svg" },
  { text: "Reach to Site", icon: "clock.svg", activeIcon: "clock-active.svg" },
  { text: "Work Begin", icon: "cup.svg", activeIcon: "cup-active.svg" },
  {
    text: "Completed",
    icon: "emoji-happy.svg",
    activeIcon: "emoji-happy-active.svg",
    exact: true,
  },
];

const formattedDate = "December 20, 2025 • 10:30 AM";

const getIcon = (step, level) => {
  if (step.exact) {
    return props?.orderActivity?.progress_status === level
      ? step.activeIcon
      : step.icon;
  }
  return props?.orderActivity?.progress_status >= level
    ? step.activeIcon || step.icon
    : step.icon;
};

const checkActive = (level) => {
  return steps[level - 1]?.exact
    ? props?.orderActivity?.progress_status === level
    : props?.orderActivity?.progress_status >= level;
};

const handleNoteClick = (note) => {
  store.setSelectedNote(note);
};

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
  return new URL(
    `../../../../../assets/image/icons/${imageName}`,
    import.meta.url
  ).href;
};

watch(
  () => props.orderActivity,
  (newValue) => {
    const rawOrderSummary = toRaw(newValue);
    console.log("Raw orderActivity:", rawOrderSummary);
  },
  { immediate: true }
);
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
