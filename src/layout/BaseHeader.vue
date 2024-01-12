<template>
  <header class="sticky top-0 z-40 max-w-md mx-auto bg-white shadow-sm md:max-w-lg shadow-black">
    <div
      class="relative flex items-center justify-between px-4 py-2 sm:py-3 lg:px-8 lg:py-4 sm:px-6"
    >
      <h1 class="text-lg font-semibold md: lg:text-3xl md:text-2xl sm:text-xl">Logo</h1>
      <div class="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
        <router-link to="/">
          <font-awesome-icon
            :icon="['fas', 'bell']"
            class="text-lg sm:text-xl md:text-2xl lg:text-3xl"
          />
        </router-link>
        <router-link v-show="$router.currentRoute.value.path === '/'" to="report">
          <font-awesome-icon
            :icon="['fas', 'file-lines']"
            class="text-lg sm:text-xl md:text-2xl lg:text-3xl"
          />
        </router-link>

        <AccountOptions />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import AccountOptions from '@/components/home/AccountOptions.vue'
</script>

<style scoped>
.bg-chevron-down {
  background-image: url('../assets/svg/chevron-down-solid.svg');
  background-repeat: no-repeat;
  background-position: right;
  background-size: 0.5rem;
}

@media only screen and (min-width: 640px) {
  .bg-chevron-down {
    background-size: 0.6rem;
  }
}

@media only screen and (min-width: 768px) {
  .bg-chevron-down {
    background-size: 0.8rem;
  }
}

@media only screen and (min-width: 1024px) {
  .bg-chevron-down {
    background-size: 1rem;
  }
}
</style>
