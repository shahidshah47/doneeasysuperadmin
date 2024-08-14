<script setup>

import TopBar from "../layouts/TopBar.vue";
</script>

<template>
  <div class="px-4 py-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Card 1 -->
      <div class="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <h5 class="text-lg font-bold">Total Sales</h5>
          <img src="../assets/icons/sales-icon.svg" alt="Sales Icon" class="h-6 w-6">
        </div>
        <div class="flex justify-between items-center">
          <p class="text-2xl font-semibold mt-2">1,234</p>
          <div class="bg-green-100 p-1">
            50%
          </div>
        </div>

        <p class="text-sm text-gray-500 mt-1">Lifetime</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <h5 class="text-lg font-bold">Total Sales</h5>
          <img src="../assets/icons/sales-icon.svg" alt="Sales Icon" class="h-6 w-6">
        </div>
        <div class="flex justify-between items-center">
          <p class="text-2xl font-semibold mt-2">1,234</p>
          <div class="bg-green-100 p-1">
            50%
          </div>
        </div>

        <p class="text-sm text-gray-500 mt-1">Lifetime</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <h5 class="text-lg font-bold">Total Sales</h5>
          <img src="../assets/icons/sales-icon.svg" alt="Sales Icon" class="h-6 w-6">
        </div>
        <div class="flex justify-between items-center">
          <p class="text-2xl font-semibold mt-2">1,234</p>
          <div class="bg-green-100 p-1">
            50%
          </div>
        </div>

        <p class="text-sm text-gray-500 mt-1">Lifetime</p>
      </div>
      <div class="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <h5 class="text-lg font-bold">Total Sales</h5>
          <img src="../assets/icons/sales-icon.svg" alt="Sales Icon" class="h-6 w-6">
        </div>
        <div class="flex justify-between items-center">
          <p class="text-2xl font-semibold mt-2">1,234</p>
          <div class="bg-green-100 p-1">
            50%
          </div>
        </div>

        <p class="text-sm text-gray-500 mt-1">Lifetime</p>
      </div>
    </div>
    <div class="bg-white shadow-lg rounded-lg p-4 mt-5">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
        <!-- Left Section with Buttons -->
        <div class="mb-4 md:mb-0 flex space-x-2">
          <button class="bg-[#5825EB] text-white px-4 py-2 rounded">All</button>
          <button class="bg-[#5825EB] text-white px-4 py-2 rounded">Approved</button>
          <button class="bg-[#5825EB] text-white px-4 py-2 rounded">Pending</button>
        </div>

        <!-- Right Section with Search and Filter -->
        <div class="flex space-x-2">
          <input type="text" placeholder="Search..." class="border-gray-300 border p-2 rounded w-full md:w-auto" />
          <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded">Filter</button>
          <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded">Columns</button>
        </div>
      </div>

      <!-- Table -->
      <div class="mt-4 overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" class="px-6 py-3">
              <input type="checkbox" />
            </th>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Date</th>
            <th scope="col" class="px-6 py-3">Role</th>
            <th scope="col" class="px-6 py-3">Usage</th>
            <th scope="col" class="px-6 py-3">Limit</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
          </thead>
          <tbody>
          <!-- Dynamic rows can be inserted here -->
          <tr class="bg-white border-b">
            <td class="px-6 py-4 whitespace-nowrap">
              <input type="checkbox" />
            </td>
            <td class="px-6 py-4">1</td>
            <td class="px-6 py-4">John Doe</td>
            <td class="px-6 py-4">Approved</td>
            <td class="px-6 py-4">01/01/2022</td>
            <td class="px-6 py-4">Admin</td>
            <td class="px-6 py-4">80%</td>
            <td class="px-6 py-4">100GB</td>
            <td class="px-6 py-4">
              <a href="#" class="text-blue-600 hover:text-blue-900">Edit</a>
            </td>
          </tr>
          <!-- Additional rows -->
          </tbody>
        </table>
      </div>
    </div>

  </div>

</template>

<style scoped>

</style>