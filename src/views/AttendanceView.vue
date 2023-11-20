<template>
  <section id="attendance">
    <TagModal v-show="modalIsOpened" @showModal="showModal" />
    <div class="flex flex-col items-start max-w-lg gap-2 p-5 mx-auto border-2 border-black -z-50">
      <!-- photo section -->
      <PhotoSection />

      <!-- location pin map -->
      <LocationSection @latLngData="storeLatLngData" />

      <!-- tag location -->
      <TagLocationSection @showModal="showModal" @storeTagData="storeTagData" />

      <!-- button submit -->
      <button @click.prevent="console.log(latLngData.lat.toString())">Submit</button>
      <div>{{ latLngData.lat }}</div>
      <div>{{ tagData }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PhotoSection from '@/components/attendance/PhotoSection.vue'
import LocationSection from '@/components/attendance/LocationSection.vue'
import TagLocationSection from '@/components/attendance/TagLocationSection.vue'
import TagModal from '@/components/attendance/TagModal.vue'
import { ref } from 'vue'

const modalIsOpened = ref(false)
const latLngData = ref({ lat: 0, lng: 0 })
const tagData = ref('')

const showModal = (value: boolean) => {
  modalIsOpened.value = value
}

const storeLatLngData = (latLng: { lat: () => number; lng: () => number }) => {
  latLngData.value.lat = latLng.lat()
  latLngData.value.lng = latLng.lng()
}

const storeTagData = (tag: string) => {
  tagData.value = tag
}
</script>
