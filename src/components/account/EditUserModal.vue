<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div
      class="flex flex-col w-full max-w-[15rem] sm:max-w-[20rem] md:max-w-lg gap-2 mx-4 bg-white rounded-sm md:mx-auto"
    >
      <div
        class="flex justify-between items-center sm:p-3 p-2 md:p-5 border-b-black border-b-[1px]"
      >
        <h1 class="font-bold text-md sm:text-lg md:text-xl lg:text-2xl">Edit User</h1>
        <font-awesome-icon
          :icon="['fas', 'times']"
          @click.prevent="closeModal"
          class="cursor-pointer text-md sm:text-lg md:text-xl lg:text-2xl"
        />
      </div>
      <div class="flex flex-col gap-2 p-2 md:p-5 sm:p-3 md:gap-6 sm:gap-3">
        <div class="flex flex-col gap-2">
          <h1 class="font-semibold lg:text-2xl md:text-xl sm:text-lg text-md">Name</h1>
          <input
            type="text"
            v-model="name"
            placeholder="GROUP1"
            class="border-[1px] border-black p-1 md:p-2 rounded-sm text-xs sm:text-sm md:text-md lg:text-lg"
          />
        </div>
        <div class="flex flex-col gap-2">
          <h1 class="font-semibold lg:text-2xl md:text-xl sm:text-lg text-md">Email</h1>
          <input
            type="text"
            v-model="email"
            placeholder="GROUP1"
            class="border-[1px] border-black p-1 md:p-2 rounded-sm text-xs sm:text-sm md:text-md lg:text-lg"
          />
        </div>
        <div class="flex flex-col gap-2">
          <h1 class="font-semibold lg:text-2xl md:text-xl sm:text-lg text-md">Role</h1>
          <select
            v-model="roles"
            class="p-1 md:p-2 border-[1px] border-black rounded-sm text-xs sm:text-sm md:text-md lg:text-lg"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button
          class="p-1 text-xs text-white bg-blue-600 md:p-2 sm:text-sm md:text-md lg:text-lg"
          @click.prevent="confirmEdit"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'
import { useUserStore, type UserList } from '@/stores/user'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['closeModal'])
const prop = defineProps({
  selectedUser: Object as () => UserList,
  editUserModalIsOpened: Boolean
})

const { editUserList } = useUserStore()

const name = ref('')
const email = ref('')
const roles = ref('')

watch(
  () => prop.editUserModalIsOpened,
  (isOpened) => {
    if (isOpened) {
      name.value = prop.selectedUser!.username
      email.value = prop.selectedUser!.email
      roles.value = prop.selectedUser!.roles
    }
  }
)

const closeModal = () => {
  emit('closeModal', false)
}

const confirmEdit = () => {
  editUserList(prop.selectedUser!.id, name.value, email.value, roles.value)
  name.value = ''
  email.value = ''
  roles.value = ''
  useToast().success('Edit success')
  closeModal()
}
</script>
