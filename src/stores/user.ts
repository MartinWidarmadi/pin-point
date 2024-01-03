import { defineStore } from 'pinia'
import { type Tag } from './tagData'
import '@googlemaps/js-api-loader'
export interface UserData {
  id: number
  username: string
  email: string
  photoUrl?: string | undefined
  latLng: google.maps.LatLng
  tag: Tag
  dateTime: number
}

export interface UserList {
  id: number
  email: string
  username: string
  password: string
  roles: string
  group: string
}

export const useUserStore = defineStore('user', () => {
  const userList: UserList[] = [
    {
      id: 1,
      email: 'admin@email.com',
      username: 'Admin',
      password: 'admin',
      roles: 'Admin',
      group: 'Cabang-Bandung'
    },
    {
      id: 2,
      email: 'hafiz@email.com',
      username: 'Hafiz',
      password: 'user',
      roles: 'User',
      group: 'Cabang-Bandung'
    }
  ]

  const userData: UserData[] = []

  return { userList, userData }
})
