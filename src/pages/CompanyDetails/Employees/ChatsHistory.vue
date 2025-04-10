<template>
  <article class="user-profile">
    <ProfileHeader />
    <ProfileTabs />
  </article>

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
                    src="../../../assets/image/icons/paperclip-2.svg"
                    alt="paperclip-icon"
                  />
                </button>
                <button class="w-5 h-5">
                  <img
                    src="../../../assets/image/icons/camera.svg"
                    alt="camera-icon"
                  />
                </button>
                <button class="w-5 h-5">
                  <img
                    src="../../../assets/image/icons/microphone.svg"
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
                  src="../../../assets/image/icons/send-2.svg"
                  alt="send-icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserProfileSidebar />
    </div>
  </div>
</template>

<script setup>
import ProfileHeader from "../../../components/ProfileHeader.vue";
import ProfileTabs from "../../../components/ProfileTabs.vue";
import { InputText } from "primevue";
import filterIcon from "../../../assets/image/icons/candle.svg";
import searchIcon from "../../../assets/image/icons/search.svg";
import UserProfileSidebar from "../../../components/common/UserProfileSidebar/UserProfileSidebar.vue";
import { ref, computed } from "vue";
import ProfileImg from "../../../assets/image/profile-picture.jpg";

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
.user-profile {
  border-radius: 16px;
  background-color: #fcfdff;
  font-family: Averta, sans-serif;
  padding: 22px 22px 0;
  width: 100%;
  margin-bottom: 20px;
}
</style>
