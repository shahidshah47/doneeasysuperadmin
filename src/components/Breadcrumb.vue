<template>
  <nav aria-label="breadcrumb" class="flex gap-4 items-center mb-4">
    <router-link to="/" class="custom-text-dark">
      <i class="fas fa-home text-dm-blue"></i>
    </router-link>
    <ol
      class="custom-breadcrumb font-theme-bold flex m-0 items-center gap-4 !text-base"
    >
      <!-- <li class="custom-breadcrumb-item">
        <router-link to="/" class="custom-text-dark">
          <i class="fas fa-home"></i>
        </router-link>
      </li> -->
      <li
        v-for="(crumb, index) in crumbs"
        :key="index"
        class="custom-breadcrumb-item"
        :class="{ active: index === crumbs.length - 1 }"
        aria-current="page"
      >
        <img
          v-if="index !== 0"
          src="../assets/image/icons/chevron-right.svg"
          alt="separator"
          class="custom-breadcrumb-separator"
        />
        <router-link
          v-if="index !== crumbs.length - 1"
          :to="crumb.link"
          :class="index !== 0 ? 'ml-4' : ''"
          class="custom-text-dark text-decoration-none font-theme-bold"
        >
          {{ crumb.label }}
        </router-link>
        <span
          v-else
          class="font-theme-bold"
          :class="index !== 0 ? 'ml-4' : ''"
          >{{ crumb.label }}</span
        >
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const crumbs = computed(() => {
  const companyId = route.query.companyId || route.params.companyId || "";

  return (route.meta.breadcrumb || []).map((crumb) => ({
    label: crumb.label,
    link: crumb.link.replace(":companyId", companyId),
  }));
});
</script>

<style scoped>
.custom-breadcrumb {
  background-color: transparent;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
}

.custom-breadcrumb-item {
  display: flex;
  align-items: center;
}

.custom-breadcrumb-separator {
  width: 20px;
  height: auto;
}

.custom-breadcrumb-item.active {
  font-weight: 600;
  color: #0e0d35;
}

.custom-text-dark {
  color: #6e6e86 !important;
  font-weight: normal;
}

.custom-text-dark:hover {
  text-decoration: none;
}

.custom-breadcrumb i {
  font-size: 0.9rem;
}
</style>
