<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="flex items-center justify-between gap-1">
        <p class="text-xl">{{ currentUser?.username }}</p>
        <FontAwesomeIcon :icon="['fas', 'chevron-down']" class="text-lg" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems class="absolute bg-white border-2 border-black rounded-sm -left-5">
        <MenuItem @click.prevent="logout" class="flex items-center gap-4 p-2 hover:bg-blue-300">
          <button>
            Logout
            <FontAwesomeIcon :icon="['fas', 'arrow-right-from-bracket']" />
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
const logout = () => {
  useAuthStore().logout()
  router.push('/login')
}

const { currentUser } = useAuthStore()
</script>
