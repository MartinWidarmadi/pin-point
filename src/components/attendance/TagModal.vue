<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80 overscroll-none"
  >
    <div class="flex flex-col w-full max-w-xl gap-2 mx-4 bg-white rounded-sm md:mx-auto">
      <div class="flex justify-between p-5 shadow-md">
        <h1 class="text-3xl font-bold">New Tag</h1>
        <font-awesome-icon
          :icon="['fas', 'times']"
          class="text-3xl cursor-pointer"
          @click.prevent="showModal"
        />
      </div>
      <div class="flex flex-col gap-6 p-5">
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-semibold">Name</h1>
          <input
            v-model="inputValue"
            type="text"
            placeholder="Rumah"
            class="border-[1px] border-black p-2 rounded-sm"
          />
        </div>
        <button @click.prevent="saveData" class="p-2 text-white bg-blue-600">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { useTagDataStore } from '@/stores/tagData'

const emit = defineEmits(['showModal', 'storeTagData'])

function showModal() {
  emit('showModal', false)
}

const { tagData } = useTagDataStore()
const inputValue = ref('')

const saveData = () => {
  tagData.push({
    id: tagData.length + 1,
    name: inputValue.value
  })
}
</script>
