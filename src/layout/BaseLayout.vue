<template>
  <!-- header -->
  <BaseHeader />
  <!-- main content -->
  <RouterView />
  <!-- footer -->
  <BaseFooter />
</template>

<script setup lang="ts">
import BaseHeader from './BaseHeader.vue'
import BaseFooter from './BaseFooter.vue'
</script>
