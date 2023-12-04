<template>
  <div class="flex flex-col w-full gap-3 md:gap-2">
    <h1 class="text-lg font-bold lg:text-3xl md:text-2xl sm:text-xl">Tag Location</h1>
    <div class="p-2 border-2 border-black">
      <div
        class="mb-2"
        v-show="tagData.length > 0"
        v-for="data in tagData"
        :key="data.id"
        @change.prevent="storeTagData"
      >
        <div class="flex items-center">
          <input
            :id="data.id"
            type="radio"
            :value="data"
            class="text-sm bg-gray-500 border-[1px] border-black me-1"
            name="address"
            v-model="selectedTag"
          />
          <label :for="data.id" :value="data.name">{{ data.name }}</label>
        </div>
      </div>
      <button
        class="border-black border-[1px] p-1 text-sm rounded-sm bg-gray-400 w-full"
        @click.prevent="showModal"
      >
        New Tag
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { useTagDataStore } from '@/stores/tagData'

defineProps({
  modalIsOpened: Boolean
})

const emit = defineEmits(['showModal', 'storeTagData'])

const { tagData } = useTagDataStore()

const selectedTag = ref('')

const showModal = () => {
  emit('showModal', true)
}

const storeTagData = () => {
  emit('storeTagData', selectedTag.value)
}
</script>
