<template>
  <!-- login view container -->
  <div class="mt-20">
    <div
      class="pt-5 pb-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto flex flex-col gap-4 items-center border-black border-solid border-2 rounded-sm"
    >
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Pointhub</h1>
      <h3 class="md:text-2xl sm:text-xl text-lg lg:text-3xl">Sign in to your account</h3>
      <!-- username or email input -->
      <FormField
        :id="'username'"
        :label="'Username Or Email'"
        :type="'text'"
        :placeholder="'Username'"
        :v-model="user"
      />
      <!-- password input -->
      <FormField
        :id="'password'"
        :label="'Password'"
        :type="'password'"
        :placeholder="'Password'"
      />
      <!-- remember me and forgot password container -->
      <div class="flex justify-between items-center w-52 md:w-64 lg:w-[19rem]">
        <!-- remember me check -->
        <div class="flex items-center gap-1">
          <input type="checkbox" id="remember" />
          <label for="remember" class="text-[0.6rem] sm:text-xs">Remember me</label>
        </div>
        <!-- forgot password text link -->
        <div>
          <a href="#" class="text-blue-800 font-semibold text-[0.6rem] text-xs">Forgot Password?</a>
        </div>
      </div>

      <!-- sign in button -->
      <ButtonBlue :text="'Sign In'" class="mt-4 md:mt-8"></ButtonBlue>

      <p class="lg:text-xl md:text-lg sm:text-md text-sm">Or Continue with</p>

      <!-- google sign in button -->
      <ButtonBlue :text="'Sign In With Google'"></ButtonBlue>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormField from '@/components/FormField.vue'
import ButtonBlue from '@/components/ButtonBlue.vue'
import { useLoginStore } from '@/stores/login'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const loginStore = useLoginStore()

const user = ref('')
const password = ref('')

const { username, role } = storeToRefs(loginStore)
const { userData } = loginStore
</script>
