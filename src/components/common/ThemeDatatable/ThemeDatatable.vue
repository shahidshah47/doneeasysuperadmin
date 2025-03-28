<script setup>
import { defineProps, defineEmits } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

/**
 * Function to resolve image paths dynamically
 */
const getImageUrl = (imagePath) => {
  return new URL(`../../../assets/image/icons/${imagePath}`, import.meta.url)
    .href;
};

// Define component props
const props = defineProps({
  value: Array, // Table data
  selection: Object, // Selected row(s)
  filters: Object, // Filters object
  columns: Array, // Column configuration
  filterFields: Array,
  paginator: Boolean, // Enable pagination
  rows: Number, // Number of rows per page
  rowsPerPageOptions: Array, // Page size options
  totalRecords: Number,
  totalPageCount: Number,
  currentPage: Number,
});

// Define emits
const emit = defineEmits(["update:selection", "update:filters"]);
</script>

<template>
  <DataTable
    :value="value"
    :selection="props.selection"
    @update:selection="emit('update:selection', $event)"
    dataKey="id"
    v-model:filters="props.filters"
    :rows="props.rows"
    :globalFilterFields="props.filterFields"
    tableStyle="min-width: 50rem"
    class="custom-datatable"
  >
    <template #header>
      <slot name="header"></slot>
    </template>

    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

    <!-- Dynamic Columns -->
    <Column v-for="col in columns" :key="col.field" :field="col.field">
      <template #header>
        <div class="header-container">
          <div class="header-text !text-grayish-purple !font-semibold">
            <span v-if="Array.isArray(col.header)">
              <span v-for="(line, index) in col.header" :key="index">
                {{ line }} <br v-if="index !== col.header.length - 1" />
              </span>
            </span>
            <span v-else v-html="col.header"></span>
          </div>
          <img
            v-if="col.icon"
            :src="getImageUrl(col.icon)"
            alt="icon"
            class="header-icon"
            :style="{
              width: col.iconWidth ? col.iconWidth + 'px' : '20px',
              height: col.iconHeight ? col.iconHeight + 'px' : '20px',
            }"
          />
        </div>
      </template>

      <template #body="slotProps">
        <slot :name="col.field" v-bind="slotProps"></slot>
      </template>
    </Column>

    <template #empty>
      <slot name="empty"> No records found. </slot>
    </template>
  </DataTable>
</template>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.header-text {
  display: inline-block;
}

.header-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}
</style>
