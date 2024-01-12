import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
  const coords = ref({ latitude: 0, longitude: 0 })

  const getLatLngLocation = () => {
    const isSupported = 'navigator' in window && 'geolocation' in navigator

    return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
      if (isSupported) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            coords.value = position.coords
            resolve(position.coords)
          },
          (error) => {
            reject(error)
          }
        )
      } else {
        reject(new Error('Geolocation is not supported by your browser.'))
      }
    })
  }

  return { getLatLngLocation, coords }
})
