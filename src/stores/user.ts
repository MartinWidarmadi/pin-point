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
  date: string
  time: string
}

export const useUserStore = defineStore('user', () => {
  const authData = [
    {
      id: 1,
      email: 'admin@email.com',
      username: 'Admin',
      password: 'admin',
      roles: 'admin'
    },
    {
      id: 2,
      email: 'hafiz@email.com',
      username: 'Hafiz',
      password: 'user',
      roles: 'user'
    }
  ]

  const userData: UserData[] = []

  return { authData, userData }
})
