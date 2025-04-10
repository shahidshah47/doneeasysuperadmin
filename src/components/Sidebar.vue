<template>
  <div class="flex flex-col items-center justify-between gap-0 px-3 h-full">
    <div class="flex flex-col items-center justify-between gap-4 py-8 h-full">
      <img :src="getImageUrl('Logo.svg')" alt="Logo" class="w-14" />

      <ul
        class="nav flex flex-col items-center gap-4 bg-gray-100 rounded-full px-2 py-3"
      >
        <li
          v-for="(item, index) in sidebarItems"
          :key="index"
          class="list-item transition-all duration-200 cursor-pointer rounded-full !w-auto hover:!bg-primary hover:!p-2.5"
          :class="{ 'bg-primary !p-2.5': isActiveRoute(item.route) }"
          @click="navigateTo(item.route)"
          @mouseenter="hoveredItem = index"
          @mouseleave="hoveredItem = null"
        >
          <img
            :src="
              getImageUrl(
                isActiveRoute(item.route) || hoveredItem === index
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
          :src="getImagePath('logout.svg')"
          class="cursor-pointer w-6"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue";

const router = useRouter();
const hoveredItem = ref(null);
const toast = useToast();

const getImagePath = (imageName) => {
  return new URL(`../assets/images2/${imageName}`, import.meta.url).href;
};

const getImageUrl = (imageName) => {
  return new URL(`../assets/image/icons/${imageName}`, import.meta.url).href;
};

const sidebarItems = ref([
  {
    activeImage: "element-2-active.svg",
    inactiveImage: "element-2.svg",
    route: "",
  },
  {
    activeImage: "profile-user-active.svg",
    inactiveImage: "profile-user-inactive.svg",
    route: "/super-admin/vendor",
  },
  {
    activeImage: "building-active.svg",
    inactiveImage: "building.svg",
    route: "",
  },
  { activeImage: "note-active.svg", inactiveImage: "note-2.svg", route: "" },

  {
    activeImage: "notification-status-active.svg",
    inactiveImage: "notification-status.svg",
    route: "/super-admin/order",
  },
  {
    activeImage: "calendar-2-active.svg",
    inactiveImage: "calendar-2.svg",
    route: "",
  },
  {
    activeImage: "document-active.svg",
    inactiveImage: "document-copy.svg",
    route: "",
  },
  {
    activeImage: "briefcase-active.svg",
    inactiveImage: "briefcase.svg",
    route: "",
  },
  {
    activeImage: "book-active.svg",
    inactiveImage: "book.svg",
    route: "",
  },
  {
    activeImage: "dollar-circle-active.svg",
    inactiveImage: "dollar-circle.svg",
    route: "",
  },
  {
    activeImage: "lock-active.svg",
    inactiveImage: "lock.svg",
    route: "",
  },
  {
    activeImage: "status-up-active.svg",
    inactiveImage: "status-up.svg",
    route: "",
  },
  {
    activeImage: "hashtag-active.svg",
    inactiveImage: "hashtag.svg",
    route: "",
  },
]);

const navigateTo = (route) => {
  if (route && route.trim() !== "") {
    router.push(route);
  } else {
    toast.add({
      severity: "contrast",
      summary: "In Progress",
      life: 3000,
    });
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/super-admin/login");
};

const isActiveRoute = (route) => {
  return (
    (router.currentRoute.value.path.startsWith(route) && route !== "") ||
    (route === "/super-admin/vendor" &&
      router.currentRoute.value.path.startsWith("/super-admin/company-details"))
  );
};
</script>

<style scoped>
.list-item {
  transition: all 0.2s ease-in-out;
}
</style>
