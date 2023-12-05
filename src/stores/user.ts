import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const authData = [
    {
      email: 'admin@email.com',
      username: 'Admin',
      password: 'admin',
      roles: 'admin'
    },
    {
      email: 'hafiz@email.com',
      username: 'Hafiz',
      password: 'user',
      roles: 'user'
    }
  ]

  const userData: object[] = []

  return { authData, userData }
})
