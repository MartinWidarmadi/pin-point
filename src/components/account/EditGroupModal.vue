<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div
      class="flex flex-col w-full max-w-[15rem] sm:max-w-[20rem] md:max-w-md md:gap-2 gap-1 mx-4 bg-white rounded-sm md:mx-auto"
    >
      <div class="flex justify-between md:p-5 sm:p-3 p-2 border-b-black border-b-[1px]">
        <h1 class="font-bold lg:text-2xl md:text-xl sm:text-lg text-md">Edit Group</h1>
        <font-awesome-icon
          :icon="['fas', 'times']"
          @click.prevent="closeModal"
          class="cursor-pointer lg:text-2xl md:text-xl sm:text-lg text-md"
        />
      </div>
      <div class="flex flex-col gap-2 p-2 md:gap-6 sm:gap-3 md:p-5 sm:p-3">
        <div class="flex flex-col gap-2">
          <h1 class="font-semibold lg:text-2xl md:text-xl sm:text-lg text-md">Name</h1>
          <input
            type="text"
            v-model="name"
            placeholder="GROUP1"
            class="border-[1px] border-black md:p-2 p-1 rounded-sm lg:text-lg md:text-md sm:text-sm text-xs"
          />
        </div>
        <button
          class="p-1 text-xs text-white bg-blue-600 md:p-2 lg:text-lg md:text-md sm:text-sm"
          @click.prevent="confirmEdit"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import { useGroupStore } from '@/stores/group'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['closeModal'])
const props = defineProps({
  groupId: Number
})

const { editGroup } = useGroupStore()

const name = ref('')

const closeModal = () => {
  emit('closeModal', false)
}

const confirmEdit = () => {
  editGroup(props.groupId!, name.value)
  name.value = ''
  useToast().success('Edit group success')
  closeModal()
}
</script>
