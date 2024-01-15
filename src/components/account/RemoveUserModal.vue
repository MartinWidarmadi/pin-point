<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div
      class="flex flex-col items-center w-full max-w-[15rem] sm:max-w-[20rem] md:max-w-sm lg:max-w-md gap-2 py-4 mx-4 bg-white rounded-sm md:mx-auto"
    >
      <font-awesome-icon
        :icon="['fas', 'circle-exclamation']"
        @click.prevent="closeModal"
        class="text-6xl text-red-600 cursor-pointer sm:text-7xl md:text-8xl"
      />
      <h1 class="font-semibold lg:text-2xl md:text-xl sm:text-lg text-md">Remove</h1>
      <p class="text-xs sm:text-sm md:text-md lg:text-lg">
        Are you sure? you won't able to revert this!
      </p>
      <div class="flex justify-center w-full gap-2 md:gap-4">
        <button
          class="p-1 text-xs text-white bg-blue-600 md:p-2 sm:text-sm md:text-md lg:text-lg"
          @click.prevent="confirmRemove"
        >
          CONFIRM
        </button>
        <button
          class="p-1 text-xs text-white bg-red-600 md:p-2 sm:text-sm md:text-md lg:text-lg"
          @click.prevent="closeModal"
        >
          CANCEL
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

const { removeUserFromGroup } = useUserStore()

const emit = defineEmits(['closeModal'])
const prop = defineProps({
  userId: Number
})

const closeModal = () => {
  emit('closeModal', false)
}

const confirmRemove = () => {
  removeUserFromGroup(prop.userId!)
  useToast().success('Delete success')
  closeModal()
}
</script>
