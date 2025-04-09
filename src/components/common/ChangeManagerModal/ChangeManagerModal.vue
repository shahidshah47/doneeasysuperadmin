<template>
  <div
    class="modal fade !bg-slate-gray backdrop-blur-[6px]"
    id="changeManagerModal"
    tabindex="-1"
    aria-labelledby="changeManagerModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-4">
        <div
          class="modal-header rounded-top-4 bg-light-lilac flex items-center gap-4 justify-between border-0"
        >
          <h5
            class="text-dm-blue !font-semibold text-base m-0"
            id="changeManagerModalLabel"
          >
            Change Manager
          </h5>
          <button
            type="button"
            class=""
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark text-dm-blue"></i>
          </button>
        </div>

        <div class="modal-body pb-5">
          <div class="current-manager mb-3">
            <p class="mb-2 text-base font-semibold text-dm-blue">
              Current Manager
            </p>
            <div class="flex items-center bg-light-lilac !rounded-lg p-4">
              <img
                :src="getImagePath(currentManager.image)"
                alt="Manager Image"
                class="w-8 h-8 rounded"
              />
              <div class="ms-2">
                <p class="mb-0 text-base text-dm-blue font-semibold">
                  {{ currentManager.name }}
                </p>
              </div>
            </div>
          </div>

          <div class="new-manager mt-4 position-relative">
            <p class="mb-2 text-base font-semibold text-dm-blue">New Manager</p>
            <div class="input-with-icon">
              <input
                type="text"
                class="form-control !bg-light-lilac border-0 p-3"
                v-model="searchQuery"
                placeholder=""
              />
              <i
                class="fa-solid fa-chevron-down dropdown-icon"
                :class="{ rotate: showDropdown }"
              ></i>
            </div>

            <transition name="fade-slide">
              <ul
                v-if="showDropdown && filteredManagers.length > 0"
                class="custom-dropdown-menu w-100 mt-1 pl-0 bg-light-lilac"
              >
                <li
                  v-for="(manager, index) in filteredManagers"
                  :key="index"
                  @click.prevent="selectManager(manager)"
                >
                  <a class="dropdown-item custom-dropdown-item" href="#">
                    <img
                      :src="getImagePath(manager.image)"
                      :alt="manager.name"
                      class="w-8 h-8 border border-solid border-white-100 rounded"
                    />
                    <p class="text-dm-blue text-xs font-semibold">
                      {{ manager.name }}
                    </p>
                  </a>
                </li>
              </ul>
            </transition>

            <transition name="fade-slide">
              <div
                v-if="searchQuery && filteredManagers.length === 0"
                class="dropdown-menu show w-100 mt-1 p-2 text-center text-muted"
              >
                No results found
              </div>
            </transition>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="!uppercase border border-solid border-lavender-gray-2 !text-base !font-bold !text-lavender-gray-2 !px-8 !py-4 !rounded-2xl"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="bg-mix-gradient text-white-100 !uppercase !text-base !font-bold !px-12 !py-4 !rounded-2xl"
            @click="save"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, watch } from "vue";

const props = defineProps({
  currentManager: {
    type: Object,
    required: true,
  },
  managersList: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(["change-manager"]);

const selectedManager = ref(null);
const searchQuery = ref("");
const showDropdown = ref(false);

const filteredManagers = computed(() => {
  return props.managersList.filter((manager) =>
    manager.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

watch(searchQuery, (newVal) => {
  showDropdown.value = newVal.trim() !== "";
});

const selectManager = (manager) => {
  selectedManager.value = manager;
  searchQuery.value = manager.name;
  showDropdown.value = false;
};

const save = () => {
  emits("change-manager", selectedManager.value);
};

const getImagePath = (imageName) => {
  return new URL(`../../../assets/images2/${imageName}`, import.meta.url).href;
};
</script>

<style scoped>
.custom-dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 6px;
}

.custom-dropdown-item p {
  margin: 0;
}

.custom-dropdown-item:hover {
  background-color: white;
  border-radius: 8px;
}

.position-relative {
  position: relative;
}

.input-with-icon {
  position: relative;
  cursor: pointer;
}

.input-with-icon input {
  padding-right: 2rem;
  cursor: pointer;
}

.dropdown-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  transition: transform 0.3s ease;
}

.dropdown-icon.rotate {
  transform: translateY(-50%) rotate(180deg);
}

.custom-dropdown-menu {
  display: block;
  z-index: 1050;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  border-radius: 8px;
}

/* Animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
  transform-origin: top;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: scaleY(0.95);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: scaleY(1);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: scaleY(1);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: scaleY(0.95);
}
</style>
