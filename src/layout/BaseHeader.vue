<template>
  <header class="sticky top-0 z-50 max-w-lg mx-auto shadow-sm shadow-black">
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
        <router-link to="/">
          <font-awesome-icon
            :icon="['fas', 'file-lines']"
            class="text-lg sm:text-xl md:text-2xl lg:text-3xl"
          />
        </router-link>
        <select
          class="w-12 appearance-none lg:text-2xl md:text-xl sm:text-lg text-md lg:w-20 md:w-16 sm:w-14 bg-chevron-down focus:outline-none"
        >
          <option value="" class="">Hafiz</option>
        </select>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

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
