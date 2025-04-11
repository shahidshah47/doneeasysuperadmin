<template>
    <div class="bg-white border-0 p-3 rounded rounded-4 shadow-sm">
        <div class="flex flex-col justify-between gap-3 relative">
            <InfoDisplay v-if="data.item_title" :label="itemTitle" :value="data.item_title" textClass="!font-normal" />
            <div class="absolute right-0 me-2 top-0" @click="clickHandler(data)">
                <button type="button" class="text-reset">
                    <!-- <i class="text-decoration-underline text-primary text-xs fa-pen fa-solid"></i> -->
                    <img :src="imageUrl" alt="Edit Icon" class="icon-size" />
                </button>
            </div>
            <InfoDisplay v-if="data.description" label="Service Description" :value="data.description"
                textClass="!font-normal" />
            <div class="d-flex !bg-light-lilac justify-content-between rounded p-2 stats-section">
                <InfoDisplay label="Unit Price" :value="`AED ${data.unit_price}`" />
                <InfoDisplay label="Quantity" :value="data.quantity" />
                <InfoDisplay label="Total" :value="`AED ${formatWithCommas(data.total)}`" />
            </div>

            <InfoDisplay
                label="Procurement/lead time"
                v-if="data?.delivery_time"
                :value="getLeadTime(data.delivery_time)?.formattedDate + ' ' + getLeadTime(data.delivery_time)?.formattedTime" />
            <InfoDisplay
                label="Procurement/lead time"
                v-if="data?.procurement_time"
                :value="getLeadTime(data.procurement_time)?.formattedDate" />
        </div>
    </div>
</template>

<script setup>
import {defineProps, defineEmits, computed} from "vue";
import InfoDisplay from "../InfoDisplay/InfoDisplay.vue";
import {convertTimeTo12HourFormat, formatDateAndTime, formatWithCommas, getLeadTime} from "../../../utils/helper";

const props = defineProps({
    data: Object,
    itemTitle: String,
    clickHandler: Function,
});
const emit = defineEmits(['edit']);
const clickHandler = (data) => {
    emit('edit', data)
};

const imageUrl = new URL("../../../assets/image/icons/edit-2.svg", import.meta.url).href
</script>