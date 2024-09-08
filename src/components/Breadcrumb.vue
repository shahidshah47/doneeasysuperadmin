<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/" class="text-dark"><i class="fas fa-home"></i></router-link>
            </li>
            <li v-for="(crumb, index) in crumbs" :key="index" class="breadcrumb-item"
                :class="{ 'active': index === crumbs.length - 1 }" aria-current="page">
                <router-link v-if="index !== crumbs.length - 1" :to="crumb.link" class="text-dark text-decoration-none">
                    {{ crumb.label }}
                </router-link>
                <span v-else>{{ crumb.label }}</span>
            </li>
        </ol>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Extract breadcrumbs from route meta or prop
const route = useRoute();
const crumbs = computed(() => {
    return route.meta.breadcrumb || [];
});
</script>

<style scoped>
.breadcrumb {
    background-color: transparent;
    padding: 0;
    margin-bottom: 1rem;
    font-size: 0.875rem;
}

.breadcrumb-item+.breadcrumb-item::before {
    content: ">";
    color: #495057;
    padding: 0 5px;
}

.breadcrumb-item.active {
    font-weight: 600;
    color: #495057;
}

.text-dark {
    color: #1f2937 !important;
}

.text-dark:hover {
    text-decoration: none;
}

.breadcrumb i {
    font-size: 0.9rem;
}
</style>