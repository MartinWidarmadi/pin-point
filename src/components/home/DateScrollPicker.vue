<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div class="flex flex-col w-full max-w-xl gap-2 mx-4 bg-white rounded-sm md:mx-auto">
      <div
        class="flex items-center justify-between py-2 border-b-[1px] border-black max-w-[35rem] mx-auto w-full"
      >
        <p class="text-2xl font-bold">Report Period (Month & Year)</p>
        <FontAwesomeIcon
          :icon="['fas', 'xmark']"
          class="text-2xl cursor-pointer"
          @click.prevent="closeDateModal"
        />
      </div>
      <div class="w-full max-w-sm mx-auto">
        <div class="w-full flex justify-between p-2 border-b-[1px] border-black">
          <h3>Date From</h3>
          <h3>Date To</h3>
        </div>
        <div class="flex items-center justify-between">
          <VueScrollPicker :options="startDateOptions" v-model="startDate" />
          <p>-</p>
          <VueScrollPicker :options="endDateOptions" v-model="endDate" />
        </div>
      </div>
      <div class="flex flex-col gap-2 p-2">
        <button @click="confirmDate" class="p-2 text-white bg-blue-600">Choose</button>
        <button @click="cancelDate" class="p-2 text-white bg-gray-400">Cancel</button>\
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { VueScrollPicker } from 'vue-scroll-picker'
import 'vue-scroll-picker/lib/style.css'
import { useDateStore } from '@/stores/date'

const { formatDateToString, getStartOfDayFromMilisecondEpoch, getEndOfDayFromMilisecondEpoch } =
  useDateStore()

const emit = defineEmits(['showDateModal', 'dateIsFiltered'])
const todayDate = new Date()
const { currentDate } = useDateStore()

const generateDateOptions = (startDate: number, startOffset: number, endOffset: number) => {
  const dateOptions: DateOptions[] = []
  for (let i = startOffset; i < endOffset; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    dateOptions.push({ name: formatDateToString(date), value: date.getTime() })
  }
  return dateOptions
}

const startDate = ref(getStartOfDayFromMilisecondEpoch(todayDate.getTime()))
const endDate = ref(getEndOfDayFromMilisecondEpoch(todayDate.getTime()))
const startDateOptions = ref(generateDateOptions(todayDate.getTime(), -10, 11))
const endDateOptions = ref(generateDateOptions(todayDate.getTime(), 0, 10))

watch(startDate, (newStartDate) => {
  startDateOptions.value = generateDateOptions(newStartDate, -10, 11)
  endDateOptions.value = generateDateOptions(newStartDate, 0, 10)
  endDate.value = newStartDate
})

watch(endDate, (newEndDate) => {
  const length = endDateOptions.value.length
  if (newEndDate === endDateOptions.value[length - 1].value) {
    endDateOptions.value = generateDateOptions(startDate.value, 0, length + 10)
  }
})

const closeDateModal = () => {
  emit('showDateModal', false)
}

const confirmDate = () => {
  currentDate.startDate = getStartOfDayFromMilisecondEpoch(startDate.value)
  currentDate.endDate = getEndOfDayFromMilisecondEpoch(endDate.value)
  closeDateModal()
}

const cancelDate = () => {
  closeDateModal()
}

interface DateOptions {
  name: string
  value: number
}
</script>
