<template>
  <article class="user-profile">
    <ProfileHeader />
    <ProfileTabs />
  </article>

  <div class="flex flex-col gap-6">
    <div>
      <SectionHeading
        title="Achievements & Badges"
        customClass="!text-lg !font-semibold text-dm-blue leading-5 mb-3"
      />
      <div class="grid grid-cols-6 gap-3">
        <BadgeCard image="badge.png" text="Senior Professional" />
        <BadgeCard image="badge.png" text="Senior Professional" />
      </div>
    </div>

    <div>
      <SectionHeading
        title="Customer reviews"
        customClass="!text-lg !font-semibold text-dm-blue leading-5 mb-3"
      />
      <div class="bg-white-100 py-6 px-5 rounded-xl relative">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-6 flex items-center gap-3 col-start-9">
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

        <div class="grid grid-cols-2 gap-4 mt-4">
          <CustomerCard
            v-for="(item, index) in customerList"
            :key="index"
            :customer="item"
            :stars="stars"
            :fallbackManager="fallbackManager"
          />
        </div>
        <Paginator :rows="pagination.perPage" :totalRecords="pagination.total">
          <template
            #container="{
              first,
              last,
              page,
              pageCount,
              rows,
              firstPageCallback,
              lastPageCallback,
              rowChangeCallback,
              prevPageCallback,
              nextPageCallback,
              totalRecords,
            }"
          >
            <Pagination
              :first="first"
              :last="last"
              :page="page"
              :pageCount="pageCount"
              :rows="rows"
              :firstPageCallback="firstPageCallback"
              :lastPageCallback="lastPageCallback"
              :rowChangeCallback="rowChangeCallback"
              @perPageClick="(cPage, perPage) => handlePerPage(cPage, perPage)"
              :prevPageCallback="prevPageCallback"
              @nextPageClick="(page) => fetchData(page)"
              :nextPageCallback="nextPageCallback"
              :totalRecords="totalRecords"
              :perPage="pagination.perPage"
              :totalEntries="pagination.total"
            />
          </template>
        </Paginator>

        <div
          v-if="showFilters"
          ref="dropdownRef"
          class="modal-content shadow-soft-blue !bg-white-100 !grid grid-cols-4 gap-4 flex-row items-center"
        >
          <SortDropdown
            label="Sort by"
            :options="[
              { label: 'Newest First', value: 'newest' },
              { label: 'Oldest First', value: 'oldest' },
              { label: 'A-Z', value: 'asc' },
              { label: 'Z-A', value: 'desc' },
            ]"
          />
          <SortDropdown
            label="Review by"
            :options="[
              { label: 'All Reviewers', value: 'all' },
              { label: 'John Doe', value: '1' },
              { label: 'Jane Smith', value: '2' },
              { label: 'Alice Johnson', value: '3' },
            ]"
          />
          <SortDropdown
            label="Rating"
            :options="[
              { label: 'All Ratings', value: 'all' },
              { label: '4 Stars Only', value: '4' },
              { label: '5 Stars Only', value: '5' },
            ]"
          />
          <SortDropdown
            :dropdownClass="'mt-4'"
            :options="[
              { label: 'All Content', value: 'all' },
              { label: 'Text', value: 'text' },
              { label: 'Image', value: 'image' },
              { label: 'Video', value: 'video' },
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { InputText } from "primevue";
import { Paginator } from "primevue";
import ProfileHeader from "../../../components/ProfileHeader.vue";
import ProfileTabs from "../../../components/ProfileTabs.vue";
import SectionHeading from "../../../components/common/SectionHeading/SectionHeading.vue";
import BadgeCard from "../../../components/common/BadgeCard/BadgeCard.vue";
import CustomerCard from "../../../components/common/CustomerCard/CustomerCard.vue";
import filterIcon from "../../../assets/image/icons/candle.svg";
import searchIcon from "../../../assets/image/icons/search.svg";
import fallbackManager from "../../../assets/images2/manager.png";
import SortDropdown from "../../../components/common/SortDropdown/SortDropdown.vue";
import Pagination from "../../../components/common/Pagination/Pagination.vue";

const modelValue = ref("");
const placeholder = "Search";
const showFilters = ref(false);
const selectedFilter = ref("all");
const customerList = ref([
  {
    user: {
      name: "John Doe",
      role: "Software Engineer",
      profile_picture: { file_path: "path/to/profile1.jpg" },
    },
    review_text: "John has done an excellent job!",
    reviewed_by: {
      name: "Jane Smith",
      designation: "Manager",
      profile_picture: { file_path: "path/to/reviewer1.jpg" },
    },
  },
  {
    user: {
      name: "Alice Johnson",
      role: "Product Manager",
      profile_picture: { file_path: "path/to/profile2.jpg" },
    },
    review_text: "Alice consistently meets deadlines and delivers quality.",
    reviewed_by: {
      name: "Tom Hardy",
      designation: "Director",
      profile_picture: { file_path: "path/to/reviewer2.jpg" },
    },
  },
  {
    user: {
      name: "David Kim",
      role: "UI/UX Designer",
      profile_picture: { file_path: "path/to/profile3.jpg" },
    },
    review_text: "David brings creativity and clarity to every project.",
    reviewed_by: {
      name: "Emily Clark",
      designation: "Lead Designer",
      profile_picture: { file_path: "path/to/reviewer3.jpg" },
    },
  },
]);

const pagination = ref({
  perPage: 10,
  total: customerList.value.length,
});

const handlePerPage = (currentPage, perPage) => {
  pagination.value.perPage = perPage;
  pagination.value.total = customerList.value.length;
  fetchData(currentPage);
};

const fetchData = (currentPage) => {
  const start = (currentPage - 1) * pagination.value.perPage;
  const end = start + pagination.value.perPage;
  const paginatedData = customerList.value.slice(start, end);

  // Update the customer list or use paginatedData accordingly
};

const toggleFilter = (event) => {
  event.stopPropagation();
  showFilters.value = !showFilters.value;
};

const stars = ref(4.5);

const dropdownRef = ref(null);

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showFilters.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
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

.bg-white-100 {
  position: relative;
}

.modal-content {
  position: absolute;
  top: 85px;
  left: 20px;
  right: 20px;

  padding: 24px;
  border-radius: 16px;
  width: calc(100% - 40px);

  z-index: 10;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.filter-icon-active {
  filter: hue-rotate(180deg);
}
</style>
