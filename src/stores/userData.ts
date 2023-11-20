import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const authData = [
    {
      username: 'admin',
      password: 'admin',
      roles: 'admin'
    },
    {
      username: 'user',
      password: 'user',
      roles: 'user'
    }
  ]

  const userData: object[] = []

  return { authData, userData }
})
