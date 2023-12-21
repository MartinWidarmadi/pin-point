<template>
  <!-- Date picker modal -->
  <DateScrollPicker v-show="isDatePickerModalVisible" @showDateModal="toggleDatePickerModal" />
  <!-- User filter modal -->
  <UserFilter
    v-show="isUserFilterModalVisible"
    @showUserFilterModal="toggleUserFilterModal"
    @userIdData="handleUserIdData"
  />
  <main class="max-w-md p-5 mx-auto border-2 border-black md:max-w-lg -z-50">
    <!-- Data sort -->
    <div class="flex justify-between">
      <!-- Select date range -->
      <div
        @click.prevent="toggleDatePickerModal(true)"
        class="flex flex-col items-center gap-2 justify-center p-1 md:p-2 border-2 border-black rounded-md min-w-[5rem] md:min-w-[13rem] cursor-pointer"
      >
        <font-awesome-icon
          :icon="['fas', 'calendar']"
          class="text-lg lg:text-3xl md:text-2xl sm:text-xl"
        />
        <p class="text-sm text-red-700 justify-self-center sm:text-md md:text-lg">
          {{
            `${milisecondEpochToDateString(currentDate.startDate)} - ${milisecondEpochToDateString(
              currentDate.endDate
            )}`
          }}
        </p>
      </div>
      <!-- Select user -->
      <div
        @click.prevent="toggleUserFilterModal(true)"
        class="flex flex-col items-center justify-center gap-2 md:p-2 border-2 border-black rounded-md min-w-[5rem] sm:min-w-[10rem] md:min-w-[13rem] cursor-pointer"
      >
        <font-awesome-icon
          :icon="['fas', 'user']"
          class="text-lg lg:text-3xl md:text-2xl sm:text-xl"
        />
        <p class="text-sm text-red-700 sm:text-md md:text-lg">{{ currentUser?.username }}</p>
      </div>
    </div>

    <!-- Activity -->
    <div class="pt-5">
      <div class="min-w-[13rem] min-h-[29rem] flex flex-col gap-2 justify-center items-center">
        <div
          v-if="filteredActivitiesByUser.length === 0"
          class="flex items-center justify-center w-full h-screen p-2 text-3xl font-bold border-2 border-black rounded-md"
        >
          <p>No Activity</p>
        </div>
        <!-- Feeds -->
        <div
          v-else
          v-for="activity in displayedActivities"
          :key="activity.id"
          class="flex flex-col gap-2 p-4 border-2 border-black rounded-md"
        >
          <!-- Feeds header -->
          <div class="flex justify-between">
            <div class="flex items-center justify-center gap-2">
              <font-awesome-icon
                :icon="['fas', 'circle-user']"
                class="text-lg sm:text-xl md:text-3xl lg:text-5xl"
              />
              <div class="text-2xl font-bold">{{ activity.username }}</div>
            </div>
            <div>
              <p class="text-sm font-bold">{{ activity.email }}</p>
              <p class="text-xl font-bold">Group Name</p>
            </div>
          </div>
          <!-- Feeds Photo -->
          <div>
            <h3 class="text-2xl font-bold">Photo</h3>
            <img :src="activity.photoUrl" />
          </div>
          <!-- Feeds Location -->
          <div>
            <h3 class="text-2xl font-bold">Location</h3>
            <p>Latitude {{ activity.latLng.lat() }}</p>
            <p>Longitude {{ activity.latLng.lng() }}</p>
          </div>
          <!-- Feeds Tag & Time-->
          <div class="flex justify-between">
            <!-- Tag -->
            <div>
              <h3 class="text-2xl font-bold">Tag Location</h3>
              <p>{{ activity.tag.name }}</p>
            </div>
            <!-- Time -->
            <div class="text-right">
              <h4 class="text-xl font-bold">
                {{ milisecondEpochToDateString(activity.dateTime) }}
              </h4>
              <p>{{ milisecondEpochToTimeString(activity.dateTime) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <p class="absolute text-transparent">{{ displayedActivities }}</p> -->
  </main>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import DateScrollPicker from '../components/home/DateScrollPicker.vue'
import UserFilter from '@/components/home/UserFilter.vue'
import { type UserData, useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { useDateStore } from '@/stores/date'
import { type DateRange } from '@/stores/date'

const { userData } = useUserStore()
const { currentUser } = useAuthStore()
const { currentDate, milisecondEpochToDateString, milisecondEpochToTimeString } = useDateStore()
const isDatePickerModalVisible = ref(false)
const isUserFilterModalVisible = ref(false)
const selectedUserId = ref<number[]>([])
const filteredActivitiesByUser = ref<UserData[]>([])

const toggleDatePickerModal = (value: boolean) => {
  isDatePickerModalVisible.value = value
}

const toggleUserFilterModal = (value: boolean) => {
  isUserFilterModalVisible.value = value
}

const handleUserIdData = (value: number[]) => {
  selectedUserId.value = value
}

const filterByDate = (dateRange: DateRange, activities: UserData[]) => {
  return activities.filter(
    (activity) => activity.dateTime >= dateRange.startDate && activity.dateTime <= dateRange.endDate
  )
}

const filterUserActivities = () => {
  if (currentUser?.roles === 'user') {
    filteredActivitiesByUser.value = filterByDate(
      currentDate,
      userData.filter((activity) => activity.id === currentUser.id)
    )
  } else {
    filteredActivitiesByUser.value =
      selectedUserId.value.length > 0
        ? filterByDate(
            currentDate,
            userData.filter((activity) => selectedUserId.value.includes(activity.id))
          )
        : filterByDate(currentDate, userData)
  }
}

onMounted(() => {
  filterUserActivities() // Initial filter
})

const displayedActivities = computed(() => {
  return filteredActivitiesByUser.value
})
</script>
