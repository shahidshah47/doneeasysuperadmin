<template>
  <div class="company-details">
    <CompanyHeader />
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-6 col-start-8 flex items-center gap-6">
        <div class="relative flex-1 min-w-0 max-w-80 ml-auto">
          <InputText
            :modelValue="searchQuery"
            @update:modelValue="updateSearchQuery"
            :placeholder="'Search'"
            class="w-full !bg-white-100 !px-4 !py-2.5 pl-10 placeholder-grayColor !rounded-lg focus:outline-none !border-[0.5px] !border-solid !border-silver-lining"
          />
          <img
            :src="searchIcon"
            alt="Search"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
        </div>
        <!--        <div class="relative mr-4">-->
        <!--          <div class="flex items-center gap-2.5">-->
        <!--            <span class="text-grayColor text-base font-semibold">Year</span>-->
        <!--            <button-->
        <!--              @click="toggleYearDropdown"-->
        <!--              class="flex items-center focus:outline-none gap-2.5"-->
        <!--            >-->
        <!--              <span class="text-base font-semibold text-dm-blue">{{-->
        <!--                selectedYear-->
        <!--              }}</span>-->
        <!--              <img :src="chevronDown" alt="chevron-down" class="w-3 h-2" />-->
        <!--            </button>-->
        <!--          </div>-->

        <!--          <div-->
        <!--            v-if="yearDropdownOpen"-->
        <!--            class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"-->
        <!--          >-->
        <!--            <div-->
        <!--              v-for="year in years"-->
        <!--              :key="year"-->
        <!--              @click="selectYear(year)"-->
        <!--              class="px-3 py-2 hover:bg-gray-100 cursor-pointer"-->
        <!--            >-->
        <!--              {{ year }}-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="relative mr-4">-->
        <!--          <div class="flex items-center gap-2.5">-->
        <!--            <span class="text-grayColor text-base font-semibold">Month</span>-->
        <!--            <button-->
        <!--              @click="toggleMonthDropdown"-->
        <!--              class="flex items-center focus:outline-none gap-2.5"-->
        <!--            >-->
        <!--              <span class="text-base font-semibold text-dm-blue">{{ selectedMonth }}</span>-->
        <!--              <img :src="chevronDown" alt="chevron-down" class="w-3 h-2" />-->
        <!--            </button>-->
        <!--          </div>-->

        <!--          <div-->
        <!--            v-if="monthDropdownOpen"-->
        <!--            class="static bottom-0 top-0 left-0 right-0 z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"-->
        <!--          >-->
        <!--            <div-->
        <!--              v-for="month in months"-->
        <!--              :key="month"-->
        <!--              @click="selectMonth(month)"-->
        <!--              class="px-3 py-2 hover:bg-gray-100 cursor-pointer"-->
        <!--            >-->
        <!--              {{ month }}-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="relative">
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
          <div
            v-if="showFilters"
            ref="dropdownRef"
            class="modal-content shadow-soft-blue !bg-white-100 flex-row items-center absolute min-w-64"
          >
            <ThemeCheckbox
              :options="sortOptions"
              v-model="selectedSort"
              name="sort-options"
              @update:selected-value="handleSelectSort"
            />
          </div>
        </div>
      </div>
      <div class="col-span-4" v-for="(card, index) in cardList" :key="index">
        <VerticalCard
          :cardData="card"
          :onClick="() => goToVerticalDetails(card.id)"
        />
      </div>

      <div class="col-span-12" v-if="cardList.length === 0">
        Verticals not found.
      </div>
    </div>

    <ChangeManagerModal
      :currentManager="{
        name: 'Jane Cooper',
        image: 'profile-pic.png',
      }"
      :managersList="[
        { name: 'Jerome Bell', image: 'profile-pic.png' },
        { name: 'Jacob Jones', image: 'profile-pic.png' },
        { name: 'Jenny Wilson', image: 'profile-pic.png' },
      ]"
    />
    <!--      @change-manager="handleManagerChange"-->
  </div>
</template>

<script setup>
import { InputText, useToast } from "primevue";
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../api";
import filterIcon from "../../assets/image/icons/candle.svg";
import chevronDown from "../../assets/image/icons/chevron-down-2.svg";
import searchIcon from "../../assets/image/icons/search.svg";
import CompanyHeader from "../../components/CompanyHeader.vue";
import ChangeManagerModal from "../../components/common/ChangeManagerModal/ChangeManagerModal.vue";
import ThemeCheckbox from "../../components/common/ThemeCheckbox/ThemeCheckbox.vue";
import VerticalCard from "../../components/common/VerticalCard/VerticalCard.vue";
import { debounce } from "../../utils/helper.js";

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref(null);
const showFilters = ref(false);
const toast = useToast();
const cardList = ref([]);
const searchQuery = ref("");
const selectedSort = ref(null);
const sortOptions = [
  {
    id: "sort1",
    value: { param: "revenue", val: "desc" },
    label: "Higher To Lower Total Revenue.",
  },
  {
    id: "sort2",
    value: { param: "revenue", val: "asc" },
    label: "Lower To Higher Total Revenue.",
  },
  {
    id: "sort3",
    value: { param: "orders", val: "desc" },
    label: "Higher To Lower Active Orders.",
  },
  {
    id: "sort4",
    value: { param: "orders", val: "asc" },
    label: "Lower To Higher Active Orders.",
  },
  {
    id: "sort5",
    value: { param: "name", val: "asc" },
    label: "Vertical Name A - Z",
  },
  {
    id: "sort6",
    value: { param: "name", val: "desc" },
    label: "Vertical Name Z - A",
  },
];

const goToVerticalDetails = (verticalId) => {
  router.push(
    `/super-admin/company-details/${route.params.companyId}/verticals/${verticalId}/details`
  );
};

const fetchData = async (search = "", sorting = null) => {
  try {
    let url = `/superadmin/user/verticals?user_id=${route.params.companyId}&search=${search}`;
    if (sorting) {
      url = `/superadmin/user/verticals?user_id=${route.params.companyId}&search=${search}&${sorting.param}=${sorting.val}`;
    }
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("token")}`,
      },
    });
    if (response?.status === 200) {
      const { data, message } = response.data;
      cardList.value = data;
      toast.add({
        severity: "success",
        summary: "Success",
        detail: message,
        life: 3000,
      });
    }
  } catch (err) {
    error.value = "Error fetching data";
    console.error("Error in fetchData:", err);
  } finally {
    loading.value = false;
  }
};

const handleSelectSort = (value) => {
  selectedSort.value = value;
};

onMounted(() => {
  nextTick(() => {
    fetchData();
  });
});

const updateSearchQuery = (value) => {
  searchQuery.value = value;
};

const debouncedFetch = debounce((val) => {
  fetchData(val);
}, 500);

watch(
  () => searchQuery.value,
  (newVal, oldValue) => {
    debouncedFetch(newVal);
  }
);

watch(
  () => selectedSort.value,
  (val) => {
    fetchData(searchQuery.value, val);
  }
);

// Year dropdown
const years = [2021, 2022, 2023, 2024, 2025];
const selectedYear = ref("2021");
const yearDropdownOpen = ref(false);

const toggleYearDropdown = () => {
  yearDropdownOpen.value = !yearDropdownOpen.value;
  if (yearDropdownOpen.value) {
    monthDropdownOpen.value = false;
  }
};

const selectYear = (year) => {
  selectedYear.value = year;
  yearDropdownOpen.value = false;
};

// Month dropdown
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const selectedMonth = ref("March");
const monthDropdownOpen = ref(false);

const toggleMonthDropdown = () => {
  monthDropdownOpen.value = !monthDropdownOpen.value;
  if (monthDropdownOpen.value) {
    yearDropdownOpen.value = false;
  }
};

const selectMonth = (month) => {
  selectedMonth.value = month;
  monthDropdownOpen.value = false;
};

// Close dropdowns when clicking outside
if (typeof window !== "undefined") {
  window.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) {
      yearDropdownOpen.value = false;
      monthDropdownOpen.value = false;
    }
  });
}

const toggleFilter = (event) => {
  event.stopPropagation();
  showFilters.value = !showFilters.value;
};

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
.modal-content {
  position: absolute;
  top: 42px;
  left: -150px;
  padding: 16px;
  border-radius: 8px;
  width: calc(100% - 40px);
  z-index: 10;
}

.custom-radio {
  position: relative;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.custom-radio:checked {
  background: linear-gradient(
    98.24deg,
    #9e21ee -10%,
    #5925eb 64.63%,
    #442ae8 116.94%
  );
  border: none;
}

.custom-radio:checked::after {
  content: "✓";
  position: absolute;

  left: 3px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: white;
  font-size: 13px;
}

label {
  cursor: pointer;
}

.filter-icon-active {
  filter: hue-rotate(180deg);
}
</style>
