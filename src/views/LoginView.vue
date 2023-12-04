<template>
  <!-- login view container -->
  <div class="mt-20">
    <div
      class="flex flex-col items-center max-w-xs gap-4 pt-5 pb-10 mx-auto border-2 border-black border-solid rounded-sm sm:max-w-sm md:max-w-md lg:max-w-lg p"
    >
      <h1 class="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">Pointhub</h1>
      <h3 class="text-lg md:text-2xl sm:text-xl lg:text-3xl">Sign in to your account</h3>
      <div v-if="isVerified == -1" class="text-red-500">Wrong username or password</div>
      <!-- username or email input -->
      <FormField
        :id="'username'"
        :label="'Username Or Email'"
        :type="'text'"
        :placeholder="'Username'"
        v-model="user"
      />
      <!-- password input -->
      <FormField
        :id="'password'"
        :label="'Password'"
        :type="'password'"
        :placeholder="'Password'"
        v-model="password"
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
      <ButtonBlue :text="'Sign In'" class="mt-4 md:mt-8" @click.prevent="login"></ButtonBlue>

      <p class="text-sm lg:text-xl md:text-lg sm:text-md">Or Continue with</p>

      <!-- google sign in button -->
      <ButtonBlue :text="'Sign In With Google'"></ButtonBlue>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormField from '@/components/FormField.vue'
import ButtonBlue from '@/components/ButtonBlue.vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import router from '@/router'

const authStore = useAuthStore()

const user = ref('')
const password = ref('')
const isVerified = ref(0)

const login = (): void => {
  authStore.login(user.value, password.value)
  if (authStore.isLogin == false) {
    isVerified.value = -1
    console.log('Wrong username or password')
  } else {
    isVerified.value = 1
    router.push({ name: 'home' })
  }
}
</script>
