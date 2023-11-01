<template>
  <button class="bg-blue-800 text-xs sm:text-sm text-white py-2 px-4 w-36 sm:w-40 rounded-sm">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  text: String
})
</script>
