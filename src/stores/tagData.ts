import { defineStore } from 'pinia'

export const useTagDataStore = defineStore('tagData', () => {
  const tagData: object[] = []

  return { tagData }
})
