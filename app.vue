<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Basic Tracker',
  titleTemplate: '%s - Basic Tracker',
  meta: [{
    name: 'description',
    content: 'A basic tracker'
  }]
})
</script>