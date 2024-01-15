<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div
      class="flex flex-col items-center w-full max-w-md gap-2 py-4 mx-4 bg-white rounded-sm md:mx-auto"
    >
      <font-awesome-icon
        :icon="['fas', 'circle-exclamation']"
        @click.prevent="closeModal"
        class="text-red-600 cursor-pointer text-8xl"
      />
      <h1 class="text-2xl font-semibold">Remove</h1>
      <p class="text-sm">Are you sure? you won't able to revert this!</p>
      <div class="flex justify-center w-full gap-4">
        <button class="p-2 text-white bg-blue-600" @click.prevent="confirmRemove">CONFIRM</button>
        <button class="p-2 text-white bg-red-600" @click.prevent="closeModal">CANCEL</button>
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
