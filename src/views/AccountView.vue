<template>
  <section id="account">
    <!-- invite user modal -->
    <AddUserModal v-show="inviteUserModalIsOpened" @closeModal="closeInviteUserModal" />
    <!-- Choose group modal -->
    <GroupModal
      v-show="groupModalIsOpened"
      @closeModal="closeGroupModal"
      @openModal="openCreateNewGroupModal"
      @openDeleteGroupModal="openDeleteGroupModal"
      @openEditGroupModal="openEditGroupModal"
      @setGroupId="setGroupId"
    />
    <!-- Create new group modal -->
    <CreateNewGroupModal
      v-show="createNewGroupModalIsOpened"
      @closeModal="closeCreateNewGroupModal"
    />
    <!-- Delete group modal -->
    <DeleteGroupModal
      v-show="deleteGroupModalIsOpened"
      @closeModal="closeDeleteGroupModal"
      :groupId="groupId"
    />
    <!-- Edit group modal -->
    <EditGroupModal
      v-show="editGroupModalIsOpened"
      @closeModal="closeEditGroupModal"
      :groupId="groupId"
    />

    <!-- Edit User Modal -->
    <EditUserModal
      v-show="editUserModalIsOpened"
      @closeModal="closeEditUserModal"
      :selectedUser="selectedUser"
      :editUserModalIsOpened="editUserModalIsOpened"
    />

    <!-- Remove User Modal -->
    <RemoveUserModal
      v-show="removeUserModalIsOpened"
      @closeModal="closeRemoveUserModal"
      :userId="userId"
    />

    <div
      class="flex flex-col items-start h-[80vh] max-w-lg gap-4 p-5 mx-auto border-2 border-black md:gap-2 -z-50"
    >
      <!-- Navigation section -->
      <div class="flex justify-between w-full">
        <!-- choose group -->
        <div
          class="flex items-center justify-between gap-2 cursor-pointer"
          @click.prevent="
            currentUser?.roles == 'Admin'
              ? (groupModalIsOpened = true)
              : (groupModalIsOpened = false)
          "
        >
          <div class="font-semibold text-blue-700">{{ selectedGroup }}</div>
          <font-awesome-icon :icon="['fas', 'chevron-down']"></font-awesome-icon>
        </div>

        <!-- invite user -->
        <div
          @click.prevent="inviteUserModalIsOpened = true"
          v-show="currentUser?.roles == 'Admin'"
          class="flex items-center justify-between gap-2 cursor-pointer"
        >
          <div class="font-semibold">Invite User</div>
          <font-awesome-icon :icon="['fas', 'user-plus']"></font-awesome-icon>
        </div>
      </div>

      <!-- Search bar section -->
      <div class="flex flex-col items-start w-full">
        <h2 class="font-bold">Member</h2>
        <!-- Search bar -->
        <div class="w-full">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="transition w-full p-2 text-center bg-[center_left_16.5rem] bg-no-repeat border-2 border-gray-400 rounded-sm bg-magnifying-glass focus:bg-none ease-out duration-300 outline-none"
          />
        </div>
      </div>

      <!-- User list section -->
      <div class="flex flex-col w-full gap-6">
        <!-- user list -->
        <div
          v-for="user in filteredUser"
          :key="user.id"
          class="flex items-center justify-between gap-2"
        >
          <!-- user info -->
          <div class="flex items-center gap-2">
            <!-- user name and email -->
            <div class="flex items-center justify-between p-2 shadow-sm min-w-[9rem] shadow-black">
              <div class="flex flex-col">
                <h3 class="font-semibold text-red-700">{{ user.username.toUpperCase() }}</h3>
                <p class="text-sm text-red-700">{{ user.email }}</p>
              </div>
            </div>
            <!-- user roles -->
            <div class="flex items-center p-2 shadow-sm min-w-[9rem] min-h-[3.7rem] shadow-black">
              <p class="font-semibold text-red-700">{{ user.roles }}</p>
            </div>
          </div>
          <!-- edit and remove button -->
          <div class="flex items-center gap-2" v-show="currentUser?.roles == 'Admin'">
            <!-- edit button -->
            <div
              class="flex flex-col items-center justify-center p-2 bg-blue-200 min-w-[4rem] shadow-sm shadow-black cursor-pointer"
              @click.prevent="openEditUserModal(user)"
            >
              <FontAwesomeIcon :icon="['fas', 'pen-to-square']" />
              <p>Edit</p>
            </div>
            <!-- remove button -->
            <div
              class="flex flex-col items-center justify-center p-2 bg-blue-200 min-w-[4rem] shadow-sm shadow-black cursor-pointer"
              @click.prevent="openRemoveUserModal(user.id)"
            >
              <FontAwesomeIcon :icon="['fas', 'user-minus']" />
              <p>Remove</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue'
import AddUserModal from '@/components/account/AddUserModal.vue'
import GroupModal from '@/components/account/GroupModal.vue'
import CreateNewGroupModal from '@/components/account/CreateNewGroupModal.vue'
import DeleteGroupModal from '@/components/account/DeleteGroupModal.vue'
import EditGroupModal from '@/components/account/EditGroupModal.vue'
import EditUserModal from '@/components/account/EditUserModal.vue'
import RemoveUserModal from '@/components/account/RemoveUserModal.vue'
import { useUserStore, type UserList } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { useGroupStore } from '@/stores/group'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { storeToRefs } from 'pinia'

const { userList } = storeToRefs(useUserStore())
const { currentUser } = useAuthStore()
const { selectedGroup } = storeToRefs(useGroupStore())
const inviteUserModalIsOpened = ref(false)
const groupModalIsOpened = ref(false)
const createNewGroupModalIsOpened = ref(false)
const deleteGroupModalIsOpened = ref(false)
const editGroupModalIsOpened = ref(false)
const editUserModalIsOpened = ref(false)
const removeUserModalIsOpened = ref(false)
const groupId = ref(-1)
const userId = ref(-1)
const selectedUser: Ref<UserList | undefined> = ref(undefined)
const searchQuery = ref('')

const closeInviteUserModal = (value: boolean) => {
  inviteUserModalIsOpened.value = value
}

const closeGroupModal = (value: boolean) => {
  groupModalIsOpened.value = value
}

const openCreateNewGroupModal = (value: boolean) => {
  createNewGroupModalIsOpened.value = value
  groupModalIsOpened.value = false
}

const closeCreateNewGroupModal = (value: boolean) => {
  createNewGroupModalIsOpened.value = value
}

const openDeleteGroupModal = (value: boolean) => {
  deleteGroupModalIsOpened.value = value
}

const openEditGroupModal = (value: boolean) => {
  editGroupModalIsOpened.value = value
}

const setGroupId = (value: number) => {
  groupId.value = value
}

const closeDeleteGroupModal = (value: boolean) => {
  deleteGroupModalIsOpened.value = value
}

const closeEditGroupModal = (value: boolean) => {
  editGroupModalIsOpened.value = value
}

const closeEditUserModal = (value: boolean) => {
  editUserModalIsOpened.value = value
}

const openEditUserModal = (user: UserList) => {
  selectedUser.value = user
  if (selectedUser.value) {
    editUserModalIsOpened.value = true
  }
}

const openRemoveUserModal = (id: number) => {
  removeUserModalIsOpened.value = true
  userId.value = id
}

const closeRemoveUserModal = (value: boolean) => {
  removeUserModalIsOpened.value = value
}

const filteredUser = computed(() => {
  return userList.value.filter(
    (user) =>
      user?.group == selectedGroup.value &&
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

watch(
  () => userList.value,
  () => {
    // Update filteredUser when either selectedGroup or userList changes
    filteredUser.value
  }
)
</script>
