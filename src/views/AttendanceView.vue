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
import { type UserData } from '@/stores/user'
import { type Tag } from '@/stores/tagData'
import '@googlemaps/js-api-loader'

const modalIsOpened = ref(false)
const latLngData: Ref<google.maps.LatLng | null> = ref(null)
const tagData: Ref<Tag | undefined> = ref()
const photoUrl: Ref<string | undefined> = ref()
const userStore = useUserStore()
const { currentUser } = useAuthStore()

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
    description: type === 'success' ? 'Data has been saved' : 'Data has not been saved' //
  }
  toast[type](options)
}

const storePhotoUrl = (url: string) => {
  photoUrl.value = url
}

const showModal = (value: boolean) => {
  modalIsOpened.value = value
}

const storeLatLngData = (latLng: google.maps.LatLng) => {
  latLngData.value = latLng
  emits('latLngData', latLng)
}

const storeTagData = (tag: Tag) => {
  tagData.value = tag
}

const getCurrentDateTime = () => {
  return new Date().getTime()
}

const handleSubmit = () => {
  if (photoUrl.value && latLngData.value && tagData.value) {
    const userData: UserData = {
      id: userStore.userData.length + 1,
      username: currentUser!.username,
      email: currentUser!.email,
      photoUrl: photoUrl.value,
      latLng: latLngData.value,
      tag: tagData.value,
      dateTime: getCurrentDateTime()
    }

    userStore.userData.push(userData)
    showToast('success')

    // Reset values
    latLngData.value = null
    photoUrl.value = undefined
    tagData.value = undefined
  } else {
    showToast('error')
  }
}
</script>
