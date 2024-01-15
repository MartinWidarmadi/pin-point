<template>
  <main class="max-w-md p-5 mx-auto border-2 border-black md:max-w-lg -z-50">
    <!-- Notification -->
    <div class="pt-5 h-[74vh]">
      <div class="min-w-[13rem] min-h-[29rem] flex flex-col gap-2">
        <div v-for="date in filterByDate" :key="date" class="flex flex-col items-start gap-2">
          <h2 class="font-semibold lg:text-2xl md:text-xl sm:text-lg text-md">
            {{ labelDate(date) }}
          </h2>
          <div
            v-for="notification in filterNotificationByCurrentUser"
            :key="notification.id"
            class="flex flex-col items-start w-full gap-2 p-4 border-2 border-gray-300 rounded-sm"
          >
            <h3 class="font-semibold lg:text-2xl md:text-xl sm:text-lg text-md">
              {{ `${notification.senderName} ${notification.description}` }}
            </h3>
            <div class="flex items-center justify-between w-full">
              <div class="p-1 text-sm border-2 border-black rounded-sm">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <p class="text-xs sm:text-sm md:text-md">Group Name</p>
                      </td>
                      <td>
                        <p class="text-xs sm:text-sm md:text-md">: {{ notification.group }}</p>
                      </td>
                    </tr>
                    <tr class="text-xs sm:text-sm md:text-md">
                      <td>Role</td>
                      <td>: {{ notification.roles }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex items-center justify-between gap-4">
                <button
                  class="p-2 text-xs text-white bg-blue-600 rounded sm:text-sm md:text-md"
                  @click.prevent="addUserToGroup(notification.userId, notification.group)"
                >
                  Accept
                </button>
                <p class="text-xs sm:text-sm md:text-md">
                  {{ substractTime(new Date().getTime(), notification.dateTime) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { useDateStore } from '@/stores/date'
import { useNotificationStore } from '@/stores/notification'
import { storeToRefs } from 'pinia'

const { addUserToGroup } = useUserStore()
const { currentUser } = useAuthStore()
const { currentDate, milisecondEpochToDateString, substractTime } = useDateStore()
const { notifications } = storeToRefs(useNotificationStore())

const filterByDate = computed(() => {
  const setDate = notifications.value.map((notification) =>
    new Date(notification.dateTime).setHours(0, 0, 0, 0)
  )
  return Array.from(new Set(setDate)).sort((a, b) => a - b)
})

const filterNotificationByCurrentUser = computed(() => {
  return notifications.value.filter((notification) => notification.userId === currentUser!.id)
})

const labelDate = (date: number) => {
  if (date > currentDate.startDate || date < currentDate.endDate) {
    return 'Today'
  }
  return milisecondEpochToDateString(date)
}

watch(
  () => notifications.value,
  () => {
    filterByDate.value
    filterNotificationByCurrentUser.value
  }
)
</script>
