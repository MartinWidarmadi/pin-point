import { onUnmounted, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
  const useGeolocation = () => {
    const coords = ref({ latitude: 0, longitude: 0 })
    const isSupported = 'navigator' in window && 'geolocation' in navigator

    let watcher: number | null = null
    onMounted(() => {
      if (isSupported) {
        watcher = navigator.geolocation.watchPosition((position) => {
          coords.value = position.coords
        })
      }
    })

    onUnmounted(() => {
      if (watcher) {
        navigator.geolocation.clearWatch(watcher)
      }
    })

    return { coords, isSupported }
  }

  return { useGeolocation }
})
