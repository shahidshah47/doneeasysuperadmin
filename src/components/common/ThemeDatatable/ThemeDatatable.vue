<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { IconField, InputIcon, InputText, useToast } from "primevue";
import { FilterMatchMode } from '@primevue/core/api';
import Dropdown from "primevue/dropdown";

const props = defineProps({
    value: Array, // Data for the table
    selection: Object, // Selected row(s)
    filters: Object, // Filters object
    columns: Array, // Column configuration
    filterFields: Array,
    paginator: Boolean, // Enable pagination
    rows: Number, // Number of rows per page
    rowsPerPageOptions: Array, // Page size options
    totalRecords: Number,
    totalPageCount: Number,
    currentPage: Number
});

const emit = defineEmits(['update:selection', 'update:filters']);

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
            <slot name="header"></slot> <!-- Custom header slot -->
        </template>
        
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <!-- Dynamic Columns -->
        <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header"
            :class="col.class || ''">
            <template #body="slotProps">
                <slot :name="col.field" v-bind="slotProps"></slot>
            </template>
        </Column>

        <template #empty>
            <slot name="empty"> No records found. </slot>
        </template>
    </DataTable>
</template>
