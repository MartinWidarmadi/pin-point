<template>
  <button
    class="w-32 p-1 text-xs text-white bg-blue-800 rounded-sm sm:text-sm md:py-2 md:px-4 sm:w-40"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  text: String
})
</script>
