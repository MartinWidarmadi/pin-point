<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div class="flex flex-col w-full max-w-xl gap-2 mx-4 bg-white rounded-sm md:mx-auto">
      <div class="flex justify-between p-5 border-b-black border-b-[1px]">
        <h1 class="text-3xl font-bold">Create Group</h1>
        <font-awesome-icon
          :icon="['fas', 'times']"
          @click.prevent="closeModal"
          class="text-3xl cursor-pointer"
        />
      </div>
      <div class="flex flex-col gap-6 p-5">
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-semibold">Name</h1>
          <input
            type="text"
            v-model="groupName"
            placeholder="GROUP1"
            class="border-[1px] border-black p-2 rounded-sm"
          />
        </div>
        <button class="p-2 text-white bg-blue-600" @click.prevent="closeModal">Invite</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { useGroupStore } from '@/stores/group'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['closeModal'])

const { groupList, addGroup } = useGroupStore()
const groupName = ref('')

const closeModal = () => {
  addGroup({ id: groupList.length + 1, name: groupName.value })
  groupName.value = ''
  useToast().success('Create group success')
  emit('closeModal', false)
}
</script>
