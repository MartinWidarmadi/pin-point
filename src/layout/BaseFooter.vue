<template>
  <footer
    class="sticky bottom-0 z-40 max-w-md md:max-w-lg mx-auto shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)] shadow-black bg-white"
  >
    <div
      class="relative flex items-center justify-between px-4 py-2 sm:py-3 lg:px-8 lg:py-4 sm:px-6"
    >
      <router-link
        to="/"
        class="text-center"
        :class="{ 'text-green-400': $router.currentRoute.value.path === '/' }"
      >
        <font-awesome-icon
          :icon="['fas', 'house']"
          class="text-lg sm:text-xl md:text-2xl lg:text-3xl"
        />
        <p class="text-xs">Home</p>
      </router-link>
      <router-link
        to="/attendance"
        class="text-center"
        :class="{ 'text-green-400': $router.currentRoute.value.path === '/attendance' }"
      >
        <font-awesome-icon
          :icon="['fas', 'location-dot']"
          class="text-lg sm:text-xl md:text-2xl lg:text-3xl"
        />
        <p class="text-xs">Attendance</p>
      </router-link>
      <router-link
        to="/account"
        class="text-center"
        :class="{ 'text-green-400': $router.currentRoute.value.path === '/account' }"
      >
        <font-awesome-icon
          :icon="['fas', 'user']"
          class="text-lg sm:text-xl md:text-2xl lg:text-3xl"
        />
        <p class="text-xs">Account</p>
      </router-link>
    </div>
  </footer>
</template>
