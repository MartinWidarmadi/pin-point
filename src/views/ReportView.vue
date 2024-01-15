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
        <p class="text-sm text-red-700 sm:text-md md:text-lg">
          {{ selectedUserId.length <= 1 ? currentUser?.username : 'Multiple Users' }}
        </p>
      </div>
    </div>

    <!-- Report -->
    <div class="pt-5">
      <div class="min-w-[13rem] min-h-[29rem] flex flex-col gap-2">
        <table class="table-auto">
          <thead>
            <tr>
              <td class="min-w-[7rem] bg-blue-200 rounded-sm border-blue-400 border-2 text-center">
                #
              </td>
              <td class="min-w-[5rem] bg-blue-200 rounded-sm border-blue-400 border-2 text-center">
                Date
              </td>
              <td class="min-w-[5rem] bg-blue-200 rounded-sm border-blue-400 border-2 text-center">
                Time
              </td>
              <td class="min-w-[5rem] bg-blue-200 rounded-sm border-blue-400 border-2 text-center">
                User
              </td>
              <td class="min-w-[5rem] bg-blue-200 rounded-sm border-blue-400 border-2 text-center">
                Location
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in filteredActivitiesByUser" :key="activity.id">
              <td class="text-xs text-center border-2 border-blue-400">
                {{ filteredActivitiesByUser.indexOf(activity) + 1 }}
              </td>
              <td class="text-xs text-center border-2 border-blue-400">
                {{ milisecondEpochToDateString(activity.dateTime) }}
              </td>
              <td class="text-xs text-center border-2 border-blue-400">
                {{ milisecondEpochToTimeString(activity.dateTime) }}
              </td>
              <td class="text-xs text-center border-2 border-blue-400">{{ activity.username }}</td>
              <td class="p-1 text-xs text-center text-blue-800 border-2 border-blue-400">
                {{ activity.address.split(',')[0] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import DateScrollPicker from '../components/home/DateScrollPicker.vue'
import UserFilter from '@/components/home/UserFilter.vue'
import { type UserData, useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { useDateStore, type DateRange } from '@/stores/date'

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
      userData.filter((activity) => activity.userId === currentUser.id)
    )
  } else {
    filteredActivitiesByUser.value =
      selectedUserId.value.length > 0
        ? filterByDate(
            currentDate,
            userData.filter((activity) => selectedUserId.value.includes(activity.userId))
          )
        : filterByDate(currentDate, userData)
  }
}

const filteUserActivitiesOnMounted = () => {
  filteredActivitiesByUser.value = filterByDate(
    currentDate,
    userData.filter((activity) => activity.userId === currentUser!.id)
  )
}

onMounted(() => {
  filteUserActivitiesOnMounted() // Initial filter
})

watch([() => currentDate.startDate, () => currentDate.endDate, () => selectedUserId.value], () => {
  filterUserActivities()
})
</script>
