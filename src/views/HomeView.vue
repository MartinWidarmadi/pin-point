<script setup lang="ts"></script>

<template>
  <main class="max-w-lg p-5 mx-auto border-2 border-black -z-50">
    <!-- data sort -->
    <div class="flex justify-between">
      <!-- select date range -->
      <div
        class="flex flex-col items-center gap-2 p-2 border-2 border-black rounded-md min-w-[13rem]"
      >
        <font-awesome-icon :icon="['fas', 'calendar']" class="text-3xl" />
        <p class="text-lg text-red-700">11/04/2023 - 11/04/2023</p>
      </div>
      <!-- select user -->
      <div
        class="flex flex-col items-center gap-2 p-2 border-2 border-black rounded-md min-w-[13rem]"
      >
        <font-awesome-icon :icon="['fas', 'user']" class="text-3xl" />
        <p class="text-lg text-red-700">Hafiz</p>
      </div>
    </div>

    <!-- activity -->
    <div class="pt-5">
      <div
        class="min-w-[13rem] min-h-[29rem] p-2 border-2 border-black rounded-md flex justify-center items-center"
      >
        <p class="text-3xl font-bold">No Activity</p>
      </div>
    </div>
  </main>
</template>
