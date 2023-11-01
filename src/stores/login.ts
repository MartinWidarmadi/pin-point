import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {
  const username = ref('')
  const role = ref('')
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

  return { username, role, userData }
})
