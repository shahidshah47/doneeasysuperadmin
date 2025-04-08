<template>
  <article class="user-profile">
    <ProfileHeader />
    <ProfileTabs />
  </article>

  <div class="bg-white-100 py-6 px-5 rounded-xl relative">
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
              :key="index"
              :class="[
                'px-4 py-3 !rounded-lg font-semibold text-sm',
                tab.active
                  ? 'bg-vivid-purple text-white-100'
                  : 'text-dm-blue bg-light-lilac hover:bg-gray-100',
              ]"
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
          :class="showFilters ? 'text-vivid-purple' : 'text-gray-600'"
        >
          Filters by
          <img
            :src="filterIcon"
            alt="Filter Icon"
            class="icon"
            :class="showFilters ? 'filter-icon-active' : ''"
          />
        </button>
      </div>
    </div>
    <div class="flex h-screen bg-gray-50">
      <div class="w-64 border-r border-gray-200 bg-white">
        <div class="p-4 space-y-4">
          <div
            class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <div class="relative">
              <div
                class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold"
              >
                B
              </div>
              <div
                class="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"
              ></div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium">Biffco Enterprises</p>
              <p class="text-xs text-gray-500">2 days</p>
            </div>
          </div>

          <div
            class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <div
              class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold"
            >
              A
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium">AKAL Pvt</p>
              <p class="text-xs text-gray-500">12/03/2023</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main chat area -->
      <div class="flex-1 flex flex-col bg-light-lilac">
        <div class="flex-1 p-4 relative"></div>

        <!-- Message input -->
        <div class="p-4 bg-white border-t border-gray-200">
          <div class="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <button class="text-gray-400 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button class="text-gray-400 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4a.5.5 0 01-.5-.5v-6.5a.5.5 0 01.5-.5h12a.5.5 0 01.5.5V15a.5.5 0 01-.5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button class="text-gray-400 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Text Message"
              class="flex-1 bg-transparent outline-none text-sm ml-2"
            />
            <button class="ml-2 bg-gray-300 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Right sidebar - User profile -->
      <!-- <div class="w-72 border-l border-gray-200 bg-white">
        <div class="p-6 flex flex-col items-center">
          <div
            class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-2"
          >
            <div
              class="w-14 h-14 rounded-full bg-gray-300 overflow-hidden"
            ></div>
          </div>
          <h3 class="font-medium text-lg">Jane Cooper</h3>
          <div class="flex items-center text-sm text-purple-600 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fill-rule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clip-rule="evenodd"
              />
            </svg>
            Abstergo Ltd.
          </div>

          <div class="w-full space-y-2">
            <div class="border rounded-lg">
              <div class="flex items-center justify-between p-4">
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Order Status</span>
                </div>
                <div class="relative">
                  <div
                    class="w-1.5 h-1.5 bg-red-500 rounded-full absolute -top-1 -left-1"
                  ></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="border rounded-lg">
              <div class="flex items-center justify-between p-4">
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Files</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div class="border rounded-lg">
              <div class="flex items-center justify-between p-4">
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Links</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div class="border rounded-lg">
              <div class="flex items-center justify-between p-4">
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Notes</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div class="border rounded-lg">
              <div class="flex items-center justify-between p-4">
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Violence & Chat</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import ProfileHeader from "../../../components/ProfileHeader.vue";
import ProfileTabs from "../../../components/ProfileTabs.vue";
import { InputText } from "primevue";
import filterIcon from "../../../assets/image/icons/candle.svg";
import searchIcon from "../../../assets/image/icons/search.svg";

const tabs = ref([
  { name: "DoneEasy", active: false },
  { name: "Organization", active: true },
  { name: "Admin", active: false },
  { name: "Managers", active: false },
  { name: "Associates", active: false },
]);

import { ref } from "vue";
const modelValue = ref("");
const placeholder = "Search";
const showFilters = ref(false);
const selectedFilter = ref("all");

const getImagePath = (imageName) => {
  return new URL(`../../../assets/images2/${imageName}`, import.meta.url).href;
};

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
