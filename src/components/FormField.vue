<template>
  <div class="flex flex-col gap-1">
    <label :for="id" class="lg:text-xl md:text-lg sm:text-md text-sm">{{ label }}</label>
    <div>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        class="border-2 border-slate-400 md:w-64 lg:w-[19rem] px-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  label: String,
  placeholder: String,
  type: String,
  id: String,
  content: String
})
</script>
