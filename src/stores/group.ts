import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
export interface Group {
  id: number
  name: string
}

export const useGroupStore = defineStore('group', () => {
  const selectedGroup = ref()

  const groupList: Ref<Group[]> = ref([
    {
      id: 1,
      name: 'Cabang Bandung'
    },
    {
      id: 2,
      name: 'Cabang Jakarta'
    }
  ])

  const editGroup = (id: number, name: string) => {
    const index = groupList.value.findIndex((group) => group.id === id)
    if (index !== -1) {
      groupList.value[index].name = name
    }
  }

  const addGroup = (group: Group) => groupList.value.push(group)

  const removeGroup = (id: number) => {
    const index = groupList.value.findIndex((group) => group.id === id)
    if (index !== -1) {
      groupList.value.splice(index, 1)
    }
  }

  return { selectedGroup, groupList, addGroup, removeGroup, editGroup }
})
