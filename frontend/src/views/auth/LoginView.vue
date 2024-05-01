<template>
  <div class="flex flex-1 h-full items-center justify-center">
    <div class="max-w-[400px] flex flex-1">
      <LoginForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from '@/entities/user/components/LoginForm.vue';
</script>
