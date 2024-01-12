<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div class="flex flex-col w-full max-w-xl gap-2 mx-4 bg-white rounded-sm md:mx-auto">
      <div class="flex justify-between p-5 border-b-black border-b-[1px]">
        <h1 class="text-3xl font-bold">Edit User</h1>
        <font-awesome-icon
          :icon="['fas', 'times']"
          @click.prevent="closeModal"
          class="text-3xl cursor-pointer"
        />
      </div>
      <div class="flex flex-col gap-6 p-5">
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-semibold">Name</h1>
          <input
            type="text"
            v-model="name"
            placeholder="GROUP1"
            class="border-[1px] border-black p-2 rounded-sm"
          />
        </div>
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-semibold">Email</h1>
          <input
            type="text"
            v-model="email"
            placeholder="GROUP1"
            class="border-[1px] border-black p-2 rounded-sm"
          />
        </div>
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-semibold">Role</h1>
          <select v-model="roles" class="p-2 border-[1px] border-black rounded-sm">
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button class="p-2 text-white bg-blue-600" @click.prevent="confirmEdit">Update</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'
import { useUserStore, type UserList } from '@/stores/user'

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
  closeModal()
}
</script>
