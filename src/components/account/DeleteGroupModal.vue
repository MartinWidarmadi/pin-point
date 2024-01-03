<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div class="flex flex-col w-full max-w-xl gap-2 mx-4 bg-white rounded-sm md:mx-auto">
      <div class="flex justify-between p-5 border-b-black border-b-[1px]">
        <h1 class="text-3xl font-bold">Delete Group</h1>
        <font-awesome-icon
          :icon="['fas', 'times']"
          @click.prevent="closeModal"
          class="text-3xl cursor-pointer"
        />
      </div>
      <div class="flex flex-col gap-6 p-5">
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-semibold text-center">
            Please insert your password to delete the group
          </h1>
          <input
            type="password"
            v-model="password"
            class="border-[1px] border-black p-2 rounded-sm"
          />
        </div>
        <button class="p-2 text-white bg-blue-600" @click.prevent="confirmDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useGroupStore } from '@/stores/group'

const emit = defineEmits(['closeModal'])
const props = defineProps({
  groupId: Number
})

const { currentUser } = useAuthStore()
const { removeGroup } = useGroupStore()

const password = ref('')

const closeModal = () => {
  emit('closeModal', false)
}

const confirmDelete = () => {
  if (currentUser?.password === password.value) {
    removeGroup(props.groupId!)
    closeModal()
  }
}
</script>
