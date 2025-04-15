<template>
  <div class="container-fluid company-details">
    <div class="row">
      <!-- Company Info and Stats -->
      <CompanyHeader />
    </div>
    <div class="bg-white-100 py-6 px-4 rounded-xl relative">
      <div class="grid grid-cols-12 gap-4 items-center mb-7">
        <div class="col-span-8">
          <div class="flex items-center gap-4">
            <button
              class="text-dm-blue border border-solid border-lavender !rounded-lg py-2 px-3"
            >
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>

            <nav class="flex gap-2">
              <button
                v-for="(tab, index) in tabs"
                :key="tab.name"
                :class="tabButtonClass(tab)"
                @click="setActiveTab(index)"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>
        </div>

        <div class="col-span-4 flex items-center gap-3">
          <div class="relative flex-1 min-w-0">
            <InputText
              v-model="modelValue"
              :placeholder="placeholder"
              class="w-full !bg-light-lilac !px-4 !py-2.5 pl-10 placeholder-grayColor !rounded-lg focus:outline-none !border-[0.5px] !border-solid !border-silver-lining"
            />
            <img
              :src="searchIcon"
              alt="Search"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
            />
          </div>

          <button
            @click="toggleFilter"
            class="flex flex-row items-center border-0 gap-3 text-sm leading-5 font-semibold"
            :class="filterButtonClass"
          >
            Filters by
            <img
              :src="filterIcon"
              alt="Filter Icon"
              class="icon"
              :class="filterIconClass"
            />
          </button>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-3">
        <div class="col-span-9 grid grid-cols-9">
          <div class="rounded-2xl bg-white-100 col-span-3 flex flex-col gap-1">
            <div
              v-for="user in users"
              :key="user.id"
              :class="[
                'flex items-center space-x-3 py-2 px-3 rounded-tl-2xl rounded-bl-2xl cursor-pointer',
                user.id === selectedUser.id
                  ? 'bg-light-lilac'
                  : 'hover:bg-light-lilac',
              ]"
              @click="selectUser(user)"
            >
              <div class="relative">
                <div
                  class="w-12 h-12 rounded-2xl border-2 border-solid border-white-100 shadow-lavendar-card overflow-hidden"
                >
                  <img
                    :src="user.img"
                    :alt="user.name"
                    class="w-12 h-12 object-cover"
                  />
                </div>
                <div
                  class="absolute -bottom-0 -right-1 w-3 h-3 bg-accent-green rounded-full border-2 border-white-100"
                ></div>
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-dm-blue m-0">
                  {{ user.name }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="flex-1 flex flex-col bg-light-lilac col-span-6 py-6 px-4 rounded-2xl"
          >
            <div class="flex-1 space-y-2 overflow-y-auto">
              <div
                v-for="(msg, index) in selectedUserMessages"
                :key="index"
                class="flex"
                :class="msg.from === 'me' ? 'justify-end' : 'justify-start'"
              >
                <div
                  class="max-w-xs p-3 flex flex-col gap-2 rounded-tl-2xl rounded-tr-2xl"
                  :class="
                    msg.from === 'me'
                      ? 'bg-soft-lilac rounded-bl-2xl'
                      : 'bg-white-100 rounded-br-2xl'
                  "
                >
                  <div class="flex items-center gap-2 justify-between">
                    <span class="text-xs !font-semibold text-dm-blue">{{
                      msg.user.name
                    }}</span>
                    <span class="text-grayColor font-normal text-xs">{{
                      msg.date
                    }}</span>
                  </div>
                  <span class="text-sm font-normal text-dm-blue">
                    {{ msg.text }}
                  </span>
                </div>
              </div>
            </div>
            <div class="">
              <div
                class="flex items-center gap-2 rounded-full bg-white-100/80 border border-solid border-lavender pr-1 pl-3 py-1"
              >
                <div class="items-center flex gap-2">
                  <button class="w-5 h-5">
                    <img
                      src="../../assets/image/icons/paperclip-2.svg"
                      alt="paperclip-icon"
                    />
                  </button>
                  <button class="w-5 h-5">
                    <img
                      src="../../assets/image/icons/camera.svg"
                      alt="camera-icon"
                    />
                  </button>
                  <button class="w-5 h-5">
                    <img
                      src="../../assets/image/icons/microphone.svg"
                      alt="microphone-icon"
                    />
                  </button>
                  <div class="bg-gray-blue-100 w-0.5 h-4"></div>
                </div>
                <input
                  type="text"
                  placeholder="Text Message"
                  class="flex-1 bg-transparent outline-none text-sm ml-2 placeholder:text-sm placeholder:text-lavender-gray-2 placeholder:font-semibold"
                />
                <button
                  class="ml-2 bg-lavender-gray-2 !rounded-full p-2 w-10 h-10 flex items-center justify-center"
                >
                  <img
                    src="../../assets/image/icons/send-2.svg"
                    alt="send-icon"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-3">
          <div class="p-4 bg-light-lilac h-full rounded-xl">
            <button class="bg-white-100 p-2 !rounded-lg">
              <img :src="BackIcon" alt="Back-Icon" class="w-4 h-4" />
            </button>
            <div class="bg-blush-100 rounded-lg p-3 mt-4">
              <div class="flex items-center gap-4 justify-between">
                <div class="flex items-center gap-2">
                  <div class="bg-white-100 rounded-lg py-2 px-2.5">
                    <img :src="FlagIcon" alt="flat-icon" class="w-4 h-5" />
                  </div>
                  <div>
                    <h5 class="text-dm-blue !font-semibold !text-base mb-0">
                      No. of Violations:
                    </h5>
                    <button
                      class="font-bold !text-xs text-vivid-purple focus:ring-0 outline-none !uppercase"
                    >
                      Add more
                    </button>
                  </div>
                </div>
                <h5 class="!text-2xl !font-bold !text-light-orange">32</h5>
              </div>
              <div class="flex flex-col gap-2 mt-2">
                <div v-for="(item, index) in statusItems" :key="index" class="">
                  <div
                    class="flex justify-between items-center py-2 px-3 bg-white-100/50 rounded-[6px] cursor-pointer"
                    @click="toggleDropdown(index)"
                  >
                    <span class="text-base font-semibold text-dm-blue">{{
                      item.label
                    }}</span>
                    <img :src="ArrowIcon" alt="dropdown-icon" class="w-4 h-4" />
                  </div>

                  <div
                    v-if="item.isOpen"
                    class="p-4 bg-pink-50 text-dm-blue border-t border-pink-200"
                  >
                    {{ item.content }}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2 mt-4">
              <div
                v-for="(item, index) in items"
                :key="index"
                :class="[
                  'px-3 py-4 !rounded-lg flex items-center gap-4 justify-between cursor-pointer border border-solid',
                  activeIndex === index
                    ? 'prime-btn bg-gradient-aqua-light'
                    : 'border-lavender bg-white-100',
                ]"
                @click="setActive(index)"
              >
                <h5 class="!font-semibold !text-[18px] !text-dm-blue mb-0">
                  {{ item }}
                </h5>
                <button class="text-vivid-purple !text-sm font-bold !uppercase">
                  View Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CompanyHeader from "../../components/CompanyHeader.vue";
import ProfileImg from "../../assets/image/profile-picture.jpg";
import { InputText } from "primevue";
import filterIcon from "../../assets/image/icons/candle.svg";
import searchIcon from "../../assets/image/icons/search.svg";
import BackIcon from "../../assets/image/icons/arrow-left.svg";
import FlagIcon from "../../assets/image/icons/flag-2.svg";
import ArrowIcon from "../../assets/image/icons/arrow-down.svg";

const getImagePath = (imageName) => {
  return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};

const items = ["Offer", "Site survey", "Appointment"];
const activeIndex = ref(0);
const statusItems = ref([
  {
    label: "Under investigation",
    isOpen: false,
    content: 'This is a demo detail for "Under investigation".',
  },
  {
    label: "Violation level 1, 2, 3",
    isOpen: false,
    content: "This is a demo detail about all Violation levels.",
  },
  {
    label: "False Alarm",
    isOpen: false,
    content: "This is a demo explanation for a False Alarm scenario.",
  },
  {
    label: "Un-identified",
    isOpen: false,
    content: "This is a demo detail about unidentified issues.",
  },
]);

const toggleDropdown = (index) => {
  statusItems.value[index].isOpen = !statusItems.value[index].isOpen;
};

const users = ref([
  {
    id: 1,
    img: ProfileImg,
    name: "Biffco Enterprises",
    initials: "B",
    latestMessage: "Let’s catch up soon.",
    messages: [
      {
        from: "Biffco",
        text: "Hey, how are things?",
        user: { name: "Biffco" },
        date: "11:56",
      },
      {
        from: "me",
        text: "Doing good! You?",
        user: { name: "Johnny Jackie by Organization" },
        date: "11:56",
      },
      {
        from: "Biffco",
        text: "Let’s catch up soon.",
        user: { name: "Biffco" },
        date: "11:56",
      },
    ],
  },
  {
    id: 2,
    img: ProfileImg,
    name: "Wayne Enterprises",
    initials: "W",
    latestMessage: "I’ll send the report.",
    messages: [
      {
        from: "Wayne",
        text: "Can you review the proposal?",
        user: { name: "Wayne" },
        date: "11:56",
      },
      {
        from: "me",
        text: "Sure. Give me a few mins.",
        user: { name: "Johnny Jackie by Organization" },
        date: "11:56",
      },
      {
        from: "Wayne",
        text: "I’ll send the report.",
        user: { name: "Wayne" },
        date: "11:56",
      },
    ],
  },
]);

const selectedUser = ref(users.value[0]);

const selectUser = (user) => {
  selectedUser.value = user;
};

const selectedUserMessages = computed(() =>
  selectedUser.value ? selectedUser.value.messages : []
);

const vendorData = ref([
  {
    id: "OFC 001",
    companyName: "ABS Company Pvt.",
    companyImage: "Avatar.png",
    ceoManager: "Floyd Miles",
    managerImage: "Avatar (5).png",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "Active",
    verticalSubscribed: 16,
    registeredDate: "2020-05-17<br>10:00 AM",
    statusColor: "lightgreen",
  },
  {
    id: "OFC 002",
    companyName: "Big Kahuna Ltd.",
    companyImage: "Avatar.png",
    ceoManager: "Kristin Watson",
    managerImage: "Avatar (4).png",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "Banned",
    verticalSubscribed: 23,
    registeredDate: "2020-05-17<br>10:00 AM",
    statusColor: "#ffb09c",
  },
  {
    id: "OFC 003",
    companyName: "Barone LLC.",
    companyImage: "Avatar (5).png",
    ceoManager: "Albert Flores",
    managerImage: "Avatar (4).png",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "Inactive",
    verticalSubscribed: 23,
    registeredDate: "2020-05-17<br>10:00 AM",
    statusColor: "lightgrey",
  },
  {
    id: "OFC 004",
    companyName: "Biffco Enterprises Ltd.",
    companyImage: "Avatar.png",
    ceoManager: "Dianne Russell",
    managerImage: "Avatar (4).png",
    contactEmail: "(239) 555-0108<br>xyz@gmail.com",
    totalRevenue: "AED 32,100",
    totalSpending: "AED 32,100",
    status: "Monitory",
    verticalSubscribed: 23,
    registeredDate: "2020-05-17<br>10:00 AM",
    statusColor: "lightyellow",
  },
]);

const tabs = ref([
  { name: "DoneEasy", active: false },
  { name: "Organization", active: true },
  { name: "Admin", active: false },
  { name: "Managers", active: false },
  { name: "Associates", active: false },
]);

const modelValue = ref("");
const placeholder = "Search";
const showFilters = ref(false);
const selectedFilter = ref("all");

const tabButtonClass = (tab) => {
  return [
    "px-4 py-3 !rounded-lg font-semibold text-sm",
    tab.active
      ? "bg-vivid-purple text-white-100"
      : "text-dm-blue bg-light-lilac hover:bg-gray-100",
  ];
};

const filterButtonClass = computed(() => {
  return showFilters.value ? "text-vivid-purple" : "text-gray-600";
});

const filterIconClass = computed(() => {
  return showFilters.value ? "filter-icon-active" : "";
});

const setActiveTab = (index) => {
  tabs.value.forEach((tab, i) => {
    tab.active = i === index;
  });
};
</script>

<style scoped>
body {
  background-color: #f7f8fc;
  font-family: "Inter", sans-serif;
}

.avatar {
  width: 40px;
  height: 40px;
}

.conversation {
  cursor: pointer;
}

.violation-alert {
  background-color: #ffe8d6;
}

.chat-window {
  height: 250px;
  overflow-y: auto;
}

.violation-warning {
  background-color: #ffe8e8;
}

.list-unstyled li {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
}

.btn-primary {
  background-color: #007bff;
}

.btn-outline-primary {
  border-color: #007bff;
  color: #007bff;
}

.violation-warning a {
  text-decoration: none;
}
</style>
