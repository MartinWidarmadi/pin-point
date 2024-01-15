<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div
      class="flex flex-col w-full max-w-[15rem] sm:max-w-[20rem] md:max-w-md gap-2 mx-4 bg-white rounded-sm md:mx-auto"
    >
      <div
        class="flex justify-between items-center md:p-5 sm:p-3 p-2 border-b-black border-b-[1px]"
      >
        <h1 class="font-bold lg:text-2xl md:text-xl sm:text-lg text-md">Add User</h1>
        <font-awesome-icon
          :icon="['fas', 'times']"
          @click.prevent="closeModal"
          class="cursor-pointer lg:text-2xl md:text-xl sm:text-lg text-md"
        />
      </div>
      <div class="flex flex-col gap-2 p-2 md:gap-6 sm:gap-3 md:p-5 sm:p-3">
        <div class="flex flex-col gap-2">
          <h1 class="font-semibold lg:text-2xl md:text-xl sm:text-lg text-md">Email</h1>
          <input
            v-model="email"
            type="text"
            placeholder="xyz@email.com"
            class="border-[1px] border-black md:p-2 p-1 rounded-sm lg:text-lg md:text-md sm:text-sm text-xs"
          />
        </div>
        <div class="flex flex-col gap-2">
          <h1 class="font-semibold lg:text-2xl md:text-xl sm:text-lg text-md">Roles</h1>
          <select
            class="md:p-2 p-1 border-[1px] border-black rounded-sm lg:text-lg md:text-md sm:text-sm text-xs"
            v-model="roles"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button
          class="p-1 text-xs text-white bg-blue-600 md:p-2 lg:text-lg md:text-md sm:text-sm"
          @click.prevent="handleInvite"
        >
          Invite
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useGroupStore } from '@/stores/group'
import { useNotificationStore } from '@/stores/notification'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['closeModal'])
const { userList } = useUserStore()
const { selectedGroup } = storeToRefs(useGroupStore())
const { sendNotification } = useNotificationStore()
const { currentUser } = storeToRefs(useAuthStore())

const email = ref('')
const roles = ref('User')

const closeModal = () => {
  emit('closeModal', false)
}

const inviteUserToGroup = () => {
  const someUser = userList.filter((user) => user.email === email.value)
  const invitedUser = someUser.some((user) => user.group === '')
  const userAlreadyInGroup =
    someUser.some((user) => user.group === selectedGroup?.value) ||
    someUser.some((user) => user.group)

  if (userAlreadyInGroup) {
    console.log('User already in group!')
  } else if (invitedUser) {
    sendNotification(
      someUser[0].id,
      currentUser.value!.username,
      selectedGroup?.value.toString(),
      roles.value,
      new Date().getTime(),
      'HAS INVITE YOU TO JOIN GROUP'
    )
    useToast().success('Invite success')
    closeModal()
  } else {
    console.log('User not found!')
  }
}

const handleInvite = () => {
  inviteUserToGroup()
  closeModal()
}
</script>
