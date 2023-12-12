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
  const userObject = ref<User>()
  const isLogin = ref(false)
  const userStore = useUserStore()

  const login = (email: string, password: string): void => {
    userStore.authData.forEach((user: any) => {
      if (user.email === email && user.password === password) {
        userObject.value = user
        isLogin.value = true
      }
    })
  }

  const logout = (): void => {
    userObject.value = undefined
    isLogin.value = false
  }

  return { userObject, isLogin, login, logout }
})
