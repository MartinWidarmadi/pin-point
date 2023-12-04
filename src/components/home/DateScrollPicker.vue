<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div class="flex flex-col w-full max-w-xl gap-2 mx-4 bg-white rounded-sm md:mx-auto">
      <div
        class="flex items-center justify-between py-2 border-b-[1px] border-black max-w-[35rem] mx-auto w-full"
      >
        <p class="text-2xl font-bold">Report Period (Month & Year)</p>
        <FontAwesomeIcon :icon="['fas', 'xmark']" class="text-2xl" @click.prevent="showModal" />
      </div>
      <div class="w-full max-w-sm mx-auto">
        <div class="w-full flex justify-between p-2 border-b-[1px] border-black">
          <h3>Date From</h3>
          <h3>Date To</h3>
        </div>
        <div class="flex items-center justify-between">
          <VueScrollPicker :options="dateOptions" v-model="selectedDate" />
          <p>-</p>
          <VueScrollPicker :options="nameData" v-model="selectedName" />
        </div>
      </div>
      <div>
        <button class="p-2 text-white bg-blue-600">Choose</button>
        <button class="p-2 text-white bg-gray-400">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineEmits } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { VueScrollPicker } from 'vue-scroll-picker'
import 'vue-scroll-picker/lib/style.css'

const emit = defineEmits(['showModal'])

const showModal = () => {
  emit('showModal', false)
}

const generateDateOptions = (todayDate: Date) => {
  const dateOptions = []
  for (let i = -3; i < 4; i++) {
    const date = new Date(todayDate)
    date.setDate(todayDate.getDate() + i)
    dateOptions.push(date.toISOString().slice(0, 10))
  }
  return dateOptions
}

const todayDate = new Date()
const dateOptions = ref(generateDateOptions(todayDate))
const selectedDate = ref('')
const nameData = ['alvon', 'martin', 'james', 'hafiz']
const selectedName = ref(nameData[0])

onMounted(() => {
  selectedDate.value = dateOptions.value[3]
  console.log('done')
})

watch(selectedDate, (newVal) => {
  selectedDate.value = newVal
  const newDate = new Date(newVal)
  generateDateOptions(newDate)
  console.log(newVal)
})
</script>
