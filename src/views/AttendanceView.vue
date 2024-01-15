<template>
  <section id="attendance">
    <TagModal v-show="modalIsOpened" @showModal="showModal" />
    <div
      class="flex flex-col items-start max-w-md gap-3 p-5 mx-auto border-2 border-black md:max-w-lg md:gap-2 -z-50"
    >
      <!-- photo section -->
      <PhotoSection @storePhotoUrl="storePhotoUrl" />

      <!-- location pin map -->
      <LocationSection @latLngData="storeLatLngData" @address="storeAddress" />

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
import { useToast } from 'vue-toastification'
import { type UserData } from '@/stores/user'
import { type Tag } from '@/stores/tagData'
import '@googlemaps/js-api-loader'
import router from '@/router'

const modalIsOpened = ref(false)
const latLngData: Ref<google.maps.LatLng | null> = ref(null)
const tagData: Ref<Tag | undefined> = ref()
const photoUrl: Ref<string | undefined> = ref()
const addressData: Ref<string | undefined> = ref()
const userStore = useUserStore()
const { currentUser } = useAuthStore()

const toast = useToast()
const emits = defineEmits(['latLngData'])

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

const storeAddress = (address: string) => {
  addressData.value = address
}

const getCurrentDateTime = () => {
  return new Date().getTime()
}

const errorHandler = () => {
  if (!photoUrl.value) {
    return 'Please upload a photo'
  } else if (!latLngData.value) {
    return 'Please select a location'
  }
  return 'Please select a tag'
}

const handleSubmit = () => {
  if (photoUrl.value && latLngData.value && tagData.value) {
    const userData: UserData = {
      id: userStore.userData.length + 1,
      userId: currentUser!.id,
      username: currentUser!.username,
      email: currentUser!.email,
      group: currentUser!.group,
      photoUrl: photoUrl.value,
      latLng: latLngData.value,
      tag: tagData.value,
      dateTime: getCurrentDateTime(),
      address: addressData.value!
    }

    userStore.userData.push(userData)
    toast.success('Create Success')
    router.push({ name: 'home' })

    // Reset values
    latLngData.value = null
    photoUrl.value = undefined
    tagData.value = undefined
  } else {
    toast.error(errorHandler())
  }
}
</script>
