<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="flex items-center justify-between gap-1">
        <p class="text-xs sm:text-md md:text-lg lg:text-xl">{{ currentUser?.username }}</p>
        <FontAwesomeIcon
          :icon="['fas', 'chevron-down']"
          class="text-xs md:text-md sm:text-sm lg:text-lg"
        />
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
      <MenuItems
        class="absolute bg-white border-2 border-black rounded-sm -left-3 sm:-left-2 md:-left-3 lg:-left-2"
      >
        <MenuItem
          @click.prevent="logout"
          class="flex items-center gap-4 p-1 sm:p-2 sm:gap-2 hover:bg-blue-300"
        >
          <button>
            <div class="flex items-center gap-2">
              <p class="text-xs sm:text-sm md:text-md lg:text-lg">Logout</p>
              <FontAwesomeIcon :icon="['fas', 'arrow-right-from-bracket']" class="text-xs" />
            </div>
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
