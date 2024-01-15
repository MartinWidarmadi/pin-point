<template>
  <div class="flex flex-col w-full gap-3 md:gap-2">
    <h1 class="text-lg font-bold lg:text-3xl md:text-2xl sm:text-xl">Photo</h1>

    <!-- Camera selection dropdown -->
    <Listbox v-model="selectedCamera">
      <ListboxButton
        class="flex justify-between w-full p-2 text-left border-2 border-black rounded-sm"
      >
        <p class="text-md md:text-lg">{{ selectedCamera.name }}</p>
        <p><font-awesome-icon :icon="['fas', 'chevron-down']"></font-awesome-icon></p>
      </ListboxButton>
      <ListboxOptions class="w-full border-2 border-black shadow-lg inset-4">
        <ListboxOption
          v-for="camera in cameras"
          :key="camera.id"
          :value="camera"
          class="cursor-pointer hover:bg-blue-300"
          @input.prevent="console.log(selectedCamera)"
        >
          <p class="p-2">{{ camera.name }}</p>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>

    <!-- Camera preview or icon -->
    <div class="flex items-center justify-center h-auto min-w-full border-2 border-black">
      <p v-if="!cameraIsOn">
        <font-awesome-icon :icon="['fas', 'camera']" class="text-7xl"></font-awesome-icon>
      </p>
      <p v-else-if="capturedImage">
        <img :src="capturedImage" alt="" />
      </p>
      <p v-else>
        <video ref="videoElement" class="w-full h-auto" autoplay></video>
      </p>
    </div>

    <!-- Capture button -->
    <button
      class="min-w-full p-1 text-center text-white bg-blue-800 md:p-2 text-md sm:text-lg md:text-xl"
      @click.prevent="captureImage"
    >
      {{ capturedImage ? 'Retake' : 'Capture' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { onBeforeUnmount, onMounted, ref, watchEffect, defineEmits } from 'vue'

// Constants
const cameras = [
  { id: 1, name: 'FRONT CAMERA', type: 'user' },
  { id: 2, name: 'BACK CAMERA', type: 'environment' }
]

// Reactive variables
const selectedCamera = ref(cameras[0])
const cameraIsOn = ref(false)
const videoElement = ref<HTMLVideoElement | null>(null)
const capturedImage = ref<string | null>(null)
const emit = defineEmits(['storePhotoUrl'])

// Lifecycle hooks
onMounted(() => {
  startCamera()
})
onBeforeUnmount(() => {
  stopCamera()
})

// Functions
const startCamera = async () => {
  cameraIsOn.value = true
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: selectedCamera.value.type }
    })
    if (videoElement.value) {
      videoElement.value.srcObject = stream
    }
  } catch (error) {
    console.error('Error accessing camera:', error)
  }
}

const captureImage = () => {
  if (capturedImage.value) {
    capturedImage.value = null
  }
  if (videoElement.value) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (context) {
      canvas.width = videoElement.value.videoWidth
      canvas.height = videoElement.value.videoHeight
      context.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height)
      capturedImage.value = canvas.toDataURL('image/png')
      emit('storePhotoUrl', capturedImage.value)
    }
  }
}

const stopCamera = () => {
  const stream = videoElement.value?.srcObject as MediaStream | null
  if (stream) {
    const tracks = stream.getTracks()
    tracks.forEach((track) => track.stop())
  }
}

const switchCamera = () => {
  stopCamera()
  startCamera()
}

// Watch for changes in selectedCamera and switch the camera accordingly
watchEffect(switchCamera)
</script>
