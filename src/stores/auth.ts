import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'

interface User {
  id: number
  email: string
  username: string
  password: string
  roles: string
}

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User>()
  const isLogin = ref(false)
  const userStore = useUserStore()

  const login = (email: string, password: string): void => {
    userStore.authData.forEach((user: any) => {
      if (user.email === email && user.password === password) {
        currentUser.value = user
        isLogin.value = true
      }
    })
  }

  const logout = (): void => {
    currentUser.value = undefined
    isLogin.value = false
  }

  return { currentUser, isLogin, login, logout }
})
