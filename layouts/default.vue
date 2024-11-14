<template>
  <div>
    <UContainer>
      <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
      <UPage>
        <UHeader>{{ pageTitle }}</UHeader>
        <slot></slot>
      </UPage>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
const links = [{
  label: 'Crumbs',
  icon: 'i-heroicons-puzzle-piece',
  to: '/'
}, {
  label: 'Settings',
  icon: 'i-heroicons-cog',
  to: '/settings'
}, {
  label: 'Notifications',
  icon: 'i-heroicons-bell',
  to: '/notifications',
  badge: 5
}]

import { useRoute } from 'vue-router'

const route = useRoute()
const pageTitle = computed(() => {
  switch (route.path) {
    case '/':
      return 'Crumbs'
    case '/settings':
      return 'Settings'
    case '/notifications':
      return 'Notifications'
    default:
      return 'Home'
  }
})
</script>

<style></style>