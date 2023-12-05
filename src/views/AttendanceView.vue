<template>
  <section id="attendance">
    <TagModal v-show="modalIsOpened" @showModal="showModal" />
    <div
      class="flex flex-col items-start max-w-lg gap-3 p-5 mx-auto border-2 border-black md:gap-2 -z-50"
    >
      <!-- photo section -->
      <PhotoSection @storePhotoUrl="storePhotoUrl" />

      <!-- location pin map -->
      <LocationSection @latLngData="storeLatLngData" />

      <!-- tag location -->
      <TagLocationSection @showModal="showModal" @storeTagData="storeTagData" />

      <!-- button submit -->
      <button
        @click.prevent="handleSubmit"
        class="w-full p-1 text-center text-white bg-green-600 rounded-sm md:p-2 md:text-xl sm:text-lg text-md"
      >
        Submit
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import PhotoSection from '@/components/attendance/PhotoSection.vue'
import LocationSection from '@/components/attendance/LocationSection.vue'
import TagLocationSection from '@/components/attendance/TagLocationSection.vue'
import TagModal from '@/components/attendance/TagModal.vue'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { ref, type Ref, defineEmits } from 'vue'
import { useToast, POSITION } from 'vue-toastification'

interface LatLng {
  lat: number
  lng: number
}

interface UserData {
  id: number
  photoUrl: string | null
  latLng: LatLng | null
  tag: string | null
  date: string
  time: string
  email: string
  username: string
}

const modalIsOpened = ref(false)
const latLngData: Ref<LatLng | null> = ref(null)
const tagData: Ref<string | null> = ref(null)
const photoUrl: Ref<string | null> = ref(null)
const userStore = useUserStore()
const { emailUser, username } = useAuthStore()

const toast = useToast()
const emits = defineEmits(['latLngData'])

const showToast = (type: 'success' | 'error') => {
  const options = {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    draggable: true,
    draggablePercent: 60,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    title: type === 'success' ? 'Success' : 'Error',
    description: 'Some description' //
  }
  toast[type](options)
}

const storePhotoUrl = (url: string) => {
  photoUrl.value = url
}

const showModal = (value: boolean) => {
  modalIsOpened.value = value
}

const storeLatLngData = (latLng: LatLng) => {
  latLngData.value = latLng
  emits('latLngData', latLng)
}

const storeTagData = (tag: string) => {
  tagData.value = tag
}

const getCurrentDateTime = () => {
  const currentDate = new Date()
  return {
    date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
    time: `${currentDate.getHours()}:${currentDate.getMinutes()}`
  }
}

const handleSubmit = () => {
  if (photoUrl.value && latLngData.value && tagData.value) {
    const { date, time } = getCurrentDateTime()
    const userData: UserData = {
      id: userStore.userData.length + 1,
      photoUrl: photoUrl.value,
      latLng: latLngData.value,
      tag: tagData.value,
      date,
      time,
      email: emailUser,
      username
    }

    userStore.userData.push(userData)
    showToast('success')

    // Reset values
    latLngData.value = null
    photoUrl.value = null
    tagData.value = null
  } else {
    showToast('error')
  }
}
</script>
