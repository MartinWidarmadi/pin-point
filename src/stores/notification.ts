import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export interface Notification {
  id: number
  userId: number
  senderName: string
  group: string
  roles: string
  dateTime: number
  description: string
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications: Ref<Notification[]> = ref([])

  const sendNotification = (
    userId: number,
    senderName: string,
    group: string,
    roles: string,
    dateTime: number,
    description: string
  ) => {
    notifications.value.push({
      id: notifications.value.length + 1,
      userId,
      senderName,
      group,
      roles,
      dateTime,
      description
    })
  }

  return { notifications, sendNotification }
})
