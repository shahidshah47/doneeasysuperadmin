<template>
  <div class="flex flex-col items-center justify-between gap-0 px-3 h-full">
    <div class="flex flex-col items-center justify-between gap-4 py-8 h-full">
      <img :src="getImagePath('Logo.png')" alt="Logo" class="w-14" />

      <ul
        class="nav flex flex-col items-center gap-4 bg-gray-100 rounded-full px-2 py-3"
        id="sidebar-menu"
      >
        <li
          v-for="(item, index) in sidebarItems"
          :key="index"
          class="list-item transition-all duration-200 cursor-pointer rounded-full !w-auto"
          :class="{
            'bg-primary !p-2.5': item.route === router.currentRoute.value.path,
            '': item.route !== router.currentRoute.value.path,
          }"
          @click="navigateTo(item.route)"
        >
          <img
            :src="
              getImageUrl(
                item.route === router.currentRoute.value.path ||
                  hoveredItem === item.route
                  ? item.activeImage
                  : item.inactiveImage
              )
            "
            class="cursor-pointer w-6 h-6"
          />
        </li>
      </ul>

      <div
        class="bg-gray-100 rounded-full flex flex-col gap-2 items-center px-2 py-4 w-full"
      >
        <img
          :src="getImagePath('Frame 48096327.png')"
          class="w-10 shadow rounded-full"
        />
        <img
          @click="handleLogout"
          :src="getImagePath('logout.png')"
          class="cursor-pointer w-6"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const hoveredItem = ref(null);

const getImagePath = (imageName) => {
  return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};

const getImageUrl = (imageName) => {
  return new URL(`../assets/image/icons/${imageName}`, import.meta.url).href;
};

const sidebarItems = ref([
  {
    activeImage: "profile-user-active.svg",
    inactiveImage: "profile-user-inactive.svg",
    route: "/super-admin/vendor",
  },

  {
    activeImage: "notification-status-active.svg",
    inactiveImage: "notification-status.svg",
    route: "/super-admin/order",
  },
  {
    activeImage: "hashtag.svg",
    inactiveImage: "hashtag.svg",
    route: "",
  },
  {
    activeImage: "status-up.svg",
    inactiveImage: "status-up.svg",
    route: "",
  },
  {
    activeImage: "lock.svg",
    inactiveImage: "lock.svg",
    route: "",
  },
  {
    activeImage: "dollar-circle.svg",
    inactiveImage: "dollar-circle.svg",
    route: "",
  },
  {
    activeImage: "book.svg",
    inactiveImage: "book.svg",
    route: "",
  },
  {
    activeImage: "briefcase.svg",
    inactiveImage: "briefcase.svg",
    route: "",
  },
  {
    activeImage: "document-copy.svg",
    inactiveImage: "document-copy.svg",
    route: "",
  },
  {
    activeImage: "calendar-2.svg",
    inactiveImage: "calendar-2.svg",
    route: "",
  },
  {
    activeImage: "note-2.svg",
    inactiveImage: "note-2.svg",
    route: "",
  },
  {
    activeImage: "building.svg",
    inactiveImage: "building.svg",
    route: "",
  },
  {
    activeImage: "element-2.svg",
    inactiveImage: "element-2.svg",
    route: "",
  },
]);

const navigateTo = (route) => {
  if (route && route.trim() !== "") {
    router.push(route);
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/super-admin/login");
};
</script>

<style scoped>
.list-item {
  transition: all 0.2s ease-in-out;
}
</style>
