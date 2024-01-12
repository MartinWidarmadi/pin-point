<template>
  <div class="flex flex-col w-full gap-3 md:gap-2">
    <h1 class="text-3xl font-bold">Location</h1>
    <div ref="mapDiv" id="map" class="w-full h-64"></div>
  </div>
</template>

<script setup lang="ts">
import { useMapStore } from '@/stores/map'
import { Loader } from '@googlemaps/js-api-loader'
import { onMounted, onUnmounted, ref, defineEmits } from 'vue'

const apiKey = 'AIzaSyC0PgnKrFiFssq9eDD8rHgwMMEAzu6Fr_o' // Replace with your API key

const loader = new Loader({
  apiKey,
  version: 'weekly'
})

const { getLatLngLocation, coords } = useMapStore()

const mapDiv = ref<HTMLDivElement | null>(null)
const map = ref<google.maps.Map | null>(null)
const markers: google.maps.Marker[] = []
const geocoder = ref<google.maps.Geocoder | null>(null)
const clickedAddress = ref<string | null>(null)
const latLngData = ref<google.maps.LatLng | null>(null)
const emits = defineEmits(['latLngData', 'address'])

// Initialize the map
const initializeMap = async () => {
  map.value = await loader.importLibrary('maps').then(
    (maps) =>
      new maps.Map(mapDiv.value!, {
        center: { lat: coords.latitude, lng: coords.longitude },
        zoom: 15
      })
  )
  geocoder.value = new (await loader.importLibrary('geocoding')).Geocoder()
  reverseGeocode(coords.latitude, coords.longitude)
}

// Add a marker
const placeMarker = async (lat: number, lng: number) => {
  markers.forEach((marker) => marker.setMap(null))
  markers.length = 0 // Clear the array

  const newMarker = new (await loader.importLibrary('marker')).Marker({
    map: map.value,
    position: { lat, lng }
  })

  const latLng = new google.maps.LatLng(lat, lng)
  emits('latLngData', latLng)

  markers.push(newMarker)
}

// Add click event
const setupClickEventListener = () => {
  google.maps.event.addListener(map.value!, 'click', (event: any) => {
    const { latLng } = event
    placeMarker(latLng.lat(), latLng.lng())
    reverseGeocode(latLng.lat(), latLng.lng())
    emits('latLngData', latLng)
    emits('address', clickedAddress.value)
  })
}

// lnglat to address with reverse geocode
const reverseGeocode = (lat: number, lng: number) => {
  if (geocoder.value) {
    const latLng = new google.maps.LatLng(lat, lng)

    geocoder.value.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        latLngData.value = latLng
        clickedAddress.value = results[0].formatted_address
        emits('address', clickedAddress.value)
      } else {
        clickedAddress.value = 'Lokasi tidak ditemukan'
      }
    })
  }
}

// Onmounted page
onMounted(async () => {
  await getLatLngLocation()
  await initializeMap()
  placeMarker(coords.latitude, coords.longitude)
  setupClickEventListener()
})

// OnUnmounted page
onUnmounted(() => {
  markers.forEach((marker) => marker.setMap(null))
})
</script>
