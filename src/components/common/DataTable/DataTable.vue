<template>
  <div class="table-responsive">
    <table class="table align-middle mt-5">
      <thead>
        <tr>
          <th></th>
          <th v-for="column in columns" :key="column.key">
            <span v-html="column.label"></span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id" class="text-center">
          <td><input type="checkbox" class="form-check-input" /></td>

          <td v-for="column in columns" :key="column.key">
            <template
              v-if="
                column.key === 'org_image' || column.key === 'vertical_image'
              "
            >
              <img
                :src="item[column.key]"
                alt=""
                style="width: 40px; height: 40px; border-radius: 50%"
              />
            </template>
            <template v-else>
              {{ item[column.key] }}
            </template>
          </td>

          <td class="d-flex gap-1 py-4">
            <div
              v-for="(action, index) in actions"
              :key="index"
              class="p-2 border border-primary rounded-3 d-flex align-items-center"
              @click="action.action(item)"
            >
              <img class="px-1 w-6 h-6" :src="getImagePath(action.icon)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  columns: Array,
  data: Array,
  actions: Array,
});

const getImagePath = (imageName) => {
  console.log("🚀 ~ getImagePath ~ imageName:", imageName);
  return new URL(`../../../assets/image/icons/${imageName}`, import.meta.url)
    .href;
};
</script>
