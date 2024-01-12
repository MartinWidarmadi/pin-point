<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div class="flex flex-col w-full max-w-xl gap-2 mx-4 bg-white rounded-sm md:mx-auto">
      <div class="flex justify-between items-center mx-4 py-4 border-b-black border-b-[1px]">
        <h1 class="text-3xl font-bold">Choose Group</h1>
        <font-awesome-icon
          :icon="['fas', 'times']"
          @click.prevent="closeModal"
          class="text-3xl cursor-pointer"
        />
      </div>
      <div class="flex flex-col gap-6 p-5">
        <div class="max-w-xs mx-auto text-center">
          <h3 class="text-xl font-semibold">
            Please choose your group below or
            <span @click.prevent="openModal" class="text-blue-700 cursor-pointer"
              >create a new one</span
            >
          </h3>
        </div>
        <div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="transition w-full p-2 text-center bg-[center_left_14rem] bg-no-repeat border-2 border-gray-400 rounded-sm bg-magnifying-glass focus:bg-none ease-out duration-300 outline-none"
          />
        </div>
        <div class="flex flex-col gap-2">
          <div
            v-for="group in filteredGroupList()"
            :key="group.id"
            class="flex justify-between p-4 shadow-md shadow-gray-400"
          >
            <h3
              class="text-2xl font-bold cursor-pointer"
              @click.prevent="setCurrentGroup(group.name)"
            >
              {{ group.name }}
            </h3>
            <div class="flex gap-4 text-3xl">
              <FontAwesomeIcon
                :icon="['fas', 'pen-to-square']"
                class="cursor-pointer"
                @click.prevent="openEditGroupModal(group.id)"
              />
              <FontAwesomeIcon
                :icon="['fas', 'trash']"
                class="cursor-pointer"
                @click.prevent="openDeleteGroupModal(group.id)"
              />
            </div>
          </div>
        </div>
        <button class="p-2 text-white bg-blue-600" @click.prevent="closeModal">Invite</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { useGroupStore } from '@/stores/group'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { storeToRefs } from 'pinia'

const emit = defineEmits([
  'closeModal',
  'openModal',
  'openDeleteGroupModal',
  'setGroupId',
  'openEditGroupModal'
])

const { groupList } = useGroupStore()
const { selectedGroup } = storeToRefs(useGroupStore())

const searchQuery = ref('')

const closeModal = () => {
  emit('closeModal', false)
}

const openModal = () => {
  emit('openModal', true)
}

const setGroupId = (id: number) => {
  emit('setGroupId', id)
}

const openDeleteGroupModal = (id: number) => {
  setGroupId(id)
  closeModal()
  emit('openDeleteGroupModal', true)
}

const openEditGroupModal = (id: number) => {
  setGroupId(id)
  closeModal()
  emit('openEditGroupModal', true)
}

const setCurrentGroup = (name: string) => {
  selectedGroup.value = name
  closeModal()
}

const filteredGroupList = () => {
  return groupList.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
}
</script>
