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

      <div>
        <SectionHeading
          title="Total Time"
          customClass="!text-base !font-semibold text-dm-blue leading-5"
        />
        <div class="card border-0 rounded-3 p-3 text-center">
          <div class="flex gap-3 justify-content-center">
            <CountdownTimer :hours="0" :minutes="15" :seconds="0" />
          </div>
          <div
            class="flex flex-col gap-4 mt-4"
            v-if="
              orderActivity?.progress_status === 3 ||
              orderActivity?.progress_status === 4
            "
          >
            <TimeCard
              :day="1"
              :hours="2"
              :minutes="16"
              :seconds="25"
              :active="true"
            />
            <TimeCard
              :day="2"
              :hours="2"
              :minutes="16"
              :seconds="25"
              :active="false"
            />
          </div>
        </div>
      </div>
      <div
        v-if="
          orderActivity?.progress_status === 3 ||
          orderActivity?.progress_status === 4
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
            v-for="(image, index) in images"
            :key="index"
            class="w-[88px] h-[62px] overflow-hidden border-2 border-solid border-white-100 rounded"
          >
            <img
              :src="getSurveyImage(image.src)"
              :alt="image.alt"
              class="img-fluid rounded w-full h-full"
            />
          </div>
        </div>
      </div>
      <div
        v-if="
          orderActivity?.progress_status === 3 ||
          orderActivity?.progress_status === 4
        "
      >
        <div class="flex justify-between mt-4">
          <SectionHeading
            title="After Work Picture"
            customClass="!text-lg !font-bold text-dm-blue leading-5 "
          />

          <p class="text-grayColor text-sm font-semibold">View All</p>
        </div>
        <div
          class="card border-0 rounded-3 p-3 text-center flex flex-row gap-2"
        >
          <div
            v-for="(image, index) in images"
            :key="index"
            class="w-[88px] h-[62px] overflow-hidden border-2 border-solid border-white-100 rounded"
          >
            <img
              :src="getSurveyImage(image.src)"
              :alt="image.alt"
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

        <div class="card border-0 rounded-3 p-2.5 text-center">
          <div class="!bg-light-lilac !rounded-lg flex w-full justify-center">
            <img
              :src="getImagePath('signature.svg')"
              alt="signature"
              class="w-44 h-28"
            />
          </div>
        </div>
      </div>
      <div class="mt-3" v-if="orderActivity?.progress_status === 4">
        <FileCard
          fileIcon="../../../assets/images2/file-icon.png"
          fileName="Company Profile"
          fileSize="3.2mb"
          :isEyeIcon="false"
        />
      </div>
      <div v-if="orderActivity?.progress_status === 4">
        <SectionHeading
          title="Review for Company"
          customClass="!text-lg !font-bold text-dm-blue leading-5 mb-3"
        />
        <div>
          <CompanyReview
            :profilePic="'/images/user1.jpg'"
            :name="'John Doe'"
            :role="'Product Manager'"
            :stars="4"
            :review="'John is fantastic! He always delivers clean and fresh laundry with impressive efficiency. His attention to detail is remarkable, and he’s a pleasure to work with. Highly recommended!'"
            :reviewImg="'/images/company-logo.png'"
            :orderTitle="'UI/UX Design Project'"
            :reviewDate="'Saturday, 19 Nov 2023'"
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
        <SectionHeading
          title="Add note (s) or Attach picture"
          customClass="!text-base !font-semibold text-dm-blue leading-4"
        />
        <div className="card border-0 rounded-3 p-3 mb-4 !h-full">
          <div
            className="flex flex-col gap-4 max-h-full overflow-y-auto vivid-gradient-scrollbar"
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
        <div v-for="(review, index) in reviews" :key="index">
          <SectionHeading
            title="Review for Associate"
            customClass="!text-base !font-semibold text-dm-blue leading-4"
          />
          <AssociateReview :associate="review" :stars="review.stars" />
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
import { ref, toRaw, watch } from "vue";
import exeIcon from "../../../../../assets/image/icons/exe-image.svg";
import { getPrettyDateTime } from "../../../../../utils/helper";

const store = useSurveyStore();
const props = defineProps({
  orderActivity: Object,
});
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

const reviews = [
  {
    user: {
      profile_picture: { file_path: null },
      name: "John Doe",
      role: "Sales Manager",
    },
    review_text: "John is excellent in communication and support.",
    after_sale_support: 5,
    communication: 4,
    pre_sale_support: 5,
    problem_resolution: 4,
    response_time: 3,
    service_quality: 5,
    reviewed_by: {
      profile_picture: { file_path: null },
      name: "Jane Smith",
      designation: "Manager",
    },
    stars: 5,
  },
  {
    user: {
      profile_picture: { file_path: null },
      name: "John Doe",
      role: "Sales Manager",
    },
    review_text: "John is excellent in communication and support.",
    after_sale_support: 5,
    communication: 4,
    pre_sale_support: 5,
    problem_resolution: 4,
    response_time: 3,
    service_quality: 5,
    reviewed_by: {
      profile_picture: { file_path: null },
      name: "Jane Smith",
      designation: "Manager",
    },
    stars: 5,
  },
];

const getSurveyImage = (imageName) => {
  return new URL(`../../../../../assets/image/${imageName}`, import.meta.url)
    .href;
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
  return new URL(
    `../../../../../assets/image/icons/${imageName}`,
    import.meta.url
  ).href;
};

watch(
  () => props.orderActivity,
  (newValue) => {
    // Access the raw version of orderSummary
    const rawOrderSummary = toRaw(newValue);
    console.log("Raw orderActivity:", rawOrderSummary);
  },
  { immediate: true } // You can make it run on initial render as well
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
