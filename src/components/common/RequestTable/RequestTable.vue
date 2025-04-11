<template>
  <div class="p-4 bg-white-100 rounded-xl min-h-[300px]">
    <div class="max-h-[300px] overflow-y-auto">
      <table class="w-full text-left border-collapse">
        <thead>
        <tr class="text-grayish-purple bg-light-lilac !font-semibold text-base">
          <th class="px-4 py-2">Request Date & Time</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Request Summary</th>
          <th class="px-4 py-2">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(request, index) in props.requests"
            v-if="props.requests.length > 0"
            :key="index"
            class="border-b"
        >
          <td class="px-4 py-3 text-dark-indigo-100 text-base font-normal">
            {{ request.date }}
          </td>
          <td class="px-4 py-3">
              <span
                  :class="{
                  'bg-green-200 text-accent-green': request.status === 'In Progress',
                  'bg-blush-100 text-failedColor': request.status === 'Cancelled',
                }"
                  class="px-2 py-1 rounded-lg text-sm font-medium"
              >
                {{ request.status }}
              </span>
          </td>
          <td class="px-4 py-3 text-rich-navy font-semibold">
            {{ request.summary }}
          </td>
          <td class="px-4 py-3">
            <button
                @click="navigateToDetails(request.id)"
                class="p-2 !border-[1.5px] !border-vivid-purple !rounded-[10px] hover:bg-purple-100"
            >
              <img
                  src="../../../assets/image/icons/eye.svg"
                  alt="View"
                  class="h-5 w-5"
              />
            </button>
          </td>
        </tr>
        <tr v-if="props.requests.length === 0">
          <td class="px-4 py-3">Records not found.</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  requests: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['viewDetail']);

const router = useRouter();
const route = useRoute();

const companyId = computed(() => route.params.companyId || 'default_id');
const appointmentId = computed(() => route.params.appointmentId || 'default_id');

function navigateToDetails(id) {
  emit('viewDetail', true, id);
  router.push(`/super-admin/company-details/${companyId.value}/appointment/${appointmentId.value}/reoccurring/details`);
}
</script>
