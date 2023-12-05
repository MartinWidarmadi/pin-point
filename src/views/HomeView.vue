<template>
  <!-- date picker modal -->
  <DateScrollPicker v-show="datePickerModalIsOpened" @showModal="showModal" />
  <main class="max-w-md p-5 mx-auto border-2 border-black md:max-w-lg -z-50">
    <!-- data sort -->
    <div class="flex justify-between">
      <!-- select date range -->
      <div
        @click.prevent="datePickerModalIsOpened = true"
        class="flex flex-col items-center gap-2 justify-center p-1 md:p-2 border-2 border-black rounded-md min-w-[5rem] md:min-w-[13rem]"
      >
        <font-awesome-icon
          :icon="['fas', 'calendar']"
          class="text-lg lg:text-3xl md:text-2xl sm:text-xl"
        />
        <p class="text-sm text-red-700 justify-self-center sm:text-md md:text-lg">
          11/04/2023 - 11/04/2023
        </p>
      </div>
      <!-- select user -->
      <div
        class="flex flex-col items-center justify-center gap-2 md:p-2 border-2 border-black rounded-md min-w-[5rem] sm:min-w-[10rem] md:min-w-[13rem]"
      >
        <font-awesome-icon
          :icon="['fas', 'user']"
          class="text-lg lg:text-3xl md:text-2xl sm:text-xl"
        />
        <p class="text-sm text-red-700 sm:text-md md:text-lg">{{ username }}</p>
      </div>
    </div>

    <!-- activity -->
    <div class="pt-5">
      <div class="min-w-[13rem] min-h-[29rem] flex flex-col gap-2 justify-center items-center">
        <div
          v-if="userData.length === 0"
          class="flex items-center justify-center w-full h-screen p-2 text-3xl font-bold border-2 border-black rounded-md"
        >
          <p>No Activity</p>
        </div>
        <!-- Feeds -->
        <div
          v-else
          v-for="data in userData"
          :key="data.id"
          class="flex flex-col gap-2 p-4 border-2 border-black rounded-md"
        >
          <!-- Feeds header -->
          <div class="flex justify-between">
            <div class="flex items-center justify-center gap-2">
              <font-awesome-icon
                :icon="['fas', 'circle-user']"
                class="text-lg sm:text-xl md:text-3xl lg:text-5xl"
              />
              <div class="text-2xl font-bold">{{ data.username }}</div>
            </div>
            <div>
              <p class="text-sm font-bold">{{ data.email }}</p>
              <p class="text-xl font-bold">Group Name</p>
            </div>
          </div>
          <!-- Feeds Photo -->
          <div>
            <h3 class="text-2xl font-bold">Photo</h3>
            <img :src="data.photoUrl" />
          </div>
          <!-- Feeds Location -->
          <div>
            <h3 class="text-2xl font-bold">Location</h3>
            <p>Latitude {{ data.latLng.lat() }}</p>
            <p>Longitude {{ data.latLng.lng() }}</p>
          </div>
          <!-- Feeds Tag & Time-->
          <div class="flex justify-between">
            <!-- Tag -->
            <div>
              <h3 class="text-2xl font-bold">Tag Location</h3>
              <p>{{ data.tag.name }}</p>
            </div>
            <!-- Time -->
            <div class="text-right">
              <h4 class="text-xl font-bold">{{ data.date }}</h4>
              <p>{{ data.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import DateScrollPicker from '../components/home/DateScrollPicker.vue'
import { ref } from 'vue'

const { userData } = useUserStore()
const { username } = useAuthStore()
const datePickerModalIsOpened = ref(false)

const showModal = (value: boolean) => {
  datePickerModalIsOpened.value = value
}
</script>
