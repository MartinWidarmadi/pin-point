import { defineStore } from 'pinia'
import { type Tag } from './tagData'
import '@googlemaps/js-api-loader'
import { ref, type Ref } from 'vue'
export interface UserData {
  id: number
  userId: number
  username: string
  email: string
  photoUrl?: string | undefined
  latLng: google.maps.LatLng
  tag: Tag
  dateTime: number
  group: string
  address: string
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
  const userList: Ref<UserList[]> = ref([
    {
      id: 1,
      email: 'admin@email.com',
      username: 'Admin',
      password: 'admin',
      roles: 'Admin',
      group: 'Cabang Bandung'
    },
    {
      id: 2,
      email: 'hafiz@email.com',
      username: 'Hafiz',
      password: 'user',
      roles: 'User',
      group: 'Cabang Bandung'
    }
  ])

  const userData: UserData[] = []

  const editUserList = (id: number, username: string, email: string, roles: string) => {
    const index = userList.value.findIndex((user) => user.id === id)
    if (index !== -1) {
      userList.value[index].username = username
      userList.value[index].email = email
      userList.value[index].roles = roles
    }
  }

  const removeUserFromGroup = (id: number) => {
    const index = userList.value.findIndex((user) => user.id === id)
    if (index !== -1) {
      userList.value[index].group = 'none'
    }
  }

  return { userList, userData, editUserList, removeUserFromGroup }
})
