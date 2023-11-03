import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userData = [
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

  return { userData }
})
