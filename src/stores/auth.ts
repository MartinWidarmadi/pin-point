import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './userData'

export const useAuthStore = defineStore('auth', () => {
  const username = ref('')
  const role = ref('')
  const isLogin = ref(false)
  const userStore = useUserStore()

  const login = (name: string, password: string): void => {
    userStore.userData.forEach((user) => {
      if (user.username === name && user.password === password) {
        username.value = user.username
        role.value = user.roles
        isLogin.value = true
        console.log(username.value, role.value)
      }
    })
  }

  return { username, role, isLogin, login }
})
