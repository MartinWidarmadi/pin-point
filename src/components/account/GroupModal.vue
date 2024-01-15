<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div class="flex flex-col w-full max-w-[15rem] md:max-w-lg mx-4 bg-white rounded-sm md:mx-auto">
      <div
        class="flex justify-between items-center mx-2 md:mx-4 py-1 sm:py-2 md:py-4 border-b-black border-b-[1px]"
      >
        <h1 class="text-sm font-bold sm:text-md md:text-lg lg:text-xl">Choose Group</h1>
        <font-awesome-icon
          :icon="['fas', 'times']"
          @click.prevent="closeModal"
          class="text-xl cursor-pointer sm:text-2xl md:text-3xl"
        />
      </div>
      <div class="flex flex-col gap-2 p-1 sm:gap-3 md:gap-6 sm:p-3 md:p-5">
        <div class="max-w-xs mx-auto text-center">
          <h3 class="text-xs font-semibold md:text-md lg:text-lg sm:text-sm">
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
            class="transition w-full p-1 md:p-2 text-center bg-[center_left_9rem] md:bg-[center_left_17rem] text-xs sm:text-sm md:text-md lg:text-lg bg-no-repeat border-[1px] md:border-2 border-gray-400 rounded-sm bg-magnifying-glass focus:bg-none ease-out duration-300 outline-none"
          />
        </div>
        <div class="flex flex-col gap-1 md:gap-2">
          <div
            v-for="group in filteredGroupList()"
            :key="group.id"
            class="flex items-center justify-between p-1 shadow-md sm:p-2 md:p-4 shadow-gray-400"
          >
            <h3
              class="font-bold cursor-pointer text-md sm:text-lg lg:text-2xl md:text-xl"
              @click.prevent="setCurrentGroup(group.name)"
            >
              {{ group.name }}
            </h3>
            <div class="flex gap-1 text-3xl sm:gap-2 md:gap-4">
              <FontAwesomeIcon
                :icon="['fas', 'pen-to-square']"
                class="text-lg cursor-pointer sm:text-xl md:text-2xl"
                @click.prevent="openEditGroupModal(group.id)"
              />
              <FontAwesomeIcon
                :icon="['fas', 'trash']"
                class="text-lg cursor-pointer sm:text-xl md:text-2xl"
                @click.prevent="openDeleteGroupModal(group.id)"
              />
            </div>
          </div>
        </div>
        <button
          class="p-1 text-xs text-white bg-blue-600 sm:text-sm md:text-md lg:text-lg md:p-2"
          @click.prevent="closeModal"
        >
          Invite
        </button>
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
