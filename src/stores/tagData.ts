import { defineStore } from 'pinia'

export interface Tag {
  id: number
  name: string
}

export const useTagDataStore = defineStore('tagData', () => {
  const tagData: Tag[] = []

  return { tagData }
})
