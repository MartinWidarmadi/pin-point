import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore, type UserList } from './user'
import { useGroupStore } from './group'

export const useAuthStore = defineStore('auth', () => {
  const groupStore = useGroupStore()
  const currentUser = ref<UserList>()
  const isLogin = ref(false)
  const userStore = useUserStore()

  const login = (email: string, password: string): void => {
    userStore.userList.forEach((user: any) => {
      if (user.email === email && user.password === password) {
        currentUser.value = user
        isLogin.value = true
        groupStore.selectedGroup = currentUser.value?.group
      }
    })
  }

  const logout = (): void => {
    currentUser.value = undefined
    groupStore.selectedGroup = undefined
    isLogin.value = false
  }

  return { currentUser, isLogin, login, logout }
})
