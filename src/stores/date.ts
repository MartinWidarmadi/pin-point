import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface DateRange {
  startDate: number
  endDate: number
}

export const useDateStore = defineStore('date', () => {
  const today = new Date()

  const currentDate = ref<DateRange>({
    startDate: new Date(today.setHours(0, 0, 0, 0)).getTime(),
    endDate: new Date(today.setHours(23, 59, 59, 999)).getTime()
  })

  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${day}/${month}/${year}`
  }

  const milisecondEpochToDateString = (milisecondEpoch: number): string => {
    const day = String(new Date(milisecondEpoch).getDate()).padStart(2, '0')
    const year = new Date(milisecondEpoch).getFullYear()
    const month = String(new Date(milisecondEpoch).getMonth() + 1).padStart(2, '0')
    return `${day}/${month}/${year}`
  }

  const milisecondEpochToTimeString = (milisecondEpoch: number): string => {
    const hours = String(new Date(milisecondEpoch).getHours()).padStart(2, '0')
    const minutes = String(new Date(milisecondEpoch).getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const getStartOfDayFromMilisecondEpoch = (milisecondEpoch: number): number => {
    return new Date(milisecondEpoch).setHours(0, 0, 0, 0)
  }

  const getEndOfDayFromMilisecondEpoch = (milisecondEpoch: number): number => {
    return new Date(milisecondEpoch).setHours(23, 59, 59, 999)
  }

  const substractTime = (today: number, time: number): string => {
    const hoursToMinuteToday = new Date(today).getHours() * 60
    const getMinuteToday = new Date(today).getMinutes()
    const minutesToday = hoursToMinuteToday + getMinuteToday

    const hoursToMinuteNow = new Date(time).getHours() * 60
    const getMinuteNow = new Date(time).getMinutes()
    const minutesNow = hoursToMinuteNow + getMinuteNow

    const minutes = minutesToday - minutesNow

    if (minutes > 59) {
      return `${Math.round(minutes / 60)} Jam`
    }
    return `${minutes} Menit`
  }

  return {
    currentDate,
    formatDateToString,
    milisecondEpochToDateString,
    milisecondEpochToTimeString,
    getStartOfDayFromMilisecondEpoch,
    getEndOfDayFromMilisecondEpoch,
    substractTime
  }
})
