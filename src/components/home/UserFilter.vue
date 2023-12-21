<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div class="flex flex-col w-full max-w-xl gap-2 mx-4 bg-white rounded-sm md:mx-auto">
      <div
        class="flex items-center justify-between py-2 border-b-[1px] border-black max-w-[35rem] mx-auto w-full"
      >
        <p class="text-2xl font-bold">Person List</p>
        <FontAwesomeIcon
          :icon="['fas', 'times']"
          class="text-2xl cursor-pointer"
          @click.prevent="closeUserFilterModal"
        />
      </div>
      <div class="p-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="transition w-full p-2 text-center bg-[center_left_14rem] bg-no-repeat border-2 border-gray-400 rounded-sm bg-magnifying-glass focus:bg-none ease-out duration-300 outline-none"
        />
      </div>

      <div class="p-2">
        <div>
          <div v-if="isUserRole" class="p-2 bg-blue-200">{{ currentUsername }}</div>
          <div v-else class="flex flex-col gap-2 border-[1px] p-2 border-black">
            <div v-for="user in filteredUsers" :key="user.id">
              <input
                v-model="selectedUserIds"
                type="checkbox"
                :id="`${user.username}-${user.id}`"
                :value="user.id"
              />
              <label :for="`${user.username}-${user.id}`" class="ms-1">{{ user.username }}</label>
            </div>
          </div>
        </div>
      </div>

      <!-- <div>{{ selectedUsers }} {{ selectedUserIds }}</div> -->

      <div class="flex flex-col gap-2 p-2">
        <button @click.prevent="chooseUsers" class="p-2 text-white bg-blue-600 rounded-sm">
          Choose
        </button>
        <button @click.prevent="closeUserFilterModal" class="p-2 text-white bg-gray-400 rounded-sm">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const emit = defineEmits(['showUserFilterModal', 'userIdData'])
const { currentUser } = useAuthStore()
const { authData } = useUserStore()

const searchQuery = ref('')
const selectedUserIds = ref<number[]>([])

const closeUserFilterModal = () => {
  emit('showUserFilterModal', false)
}

const chooseUsers = () => {
  emit('userIdData', selectedUserIds.value)
  closeUserFilterModal()
}

const isUserRole = computed(() => currentUser!.roles === 'user')
const currentUsername = computed(() => currentUser!.username)

const filteredUsers = computed(() => {
  return authData.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>
