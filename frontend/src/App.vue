<template>
  <Toaster />
  <component :is="currentLayout">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </router-view>
  </component>
</template>

<script lang="ts" setup>
import Toaster from '@/core/ui/toast/Toaster.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentLayout = computed(() => route.meta?.layout);
</script>
