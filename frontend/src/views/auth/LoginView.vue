<template>
  <div class="flex flex-1 h-full items-center justify-center">
    <div class="max-w-[400px] border px-5 py-8 rounded-md gap-y-4 flex flex-col flex-1">
      <div class="text-center text-lg font-bold">{{ $t('login.login') }}</div>

      <LoginForm />

      <Separator />

      <div class="flex flex-1 gap-x-2">
        <Button variant="outline" class="flex flex-1">{{ $t('login.google') }}</Button>
        <Button variant="outline" class="flex flex-1"
          ><Linkedin class="w-4 h-4 mr-2" />{{ $t('login.linkedin') }}</Button
        >
      </div>

      <Separator />

      <div>
        {{ $t('login.noAccount.description') }}
        <span class="text-blue-600 underline"
          ><router-link :to="{ name: 'Register' }">{{
            $t('login.noAccount.register')
          }}</router-link></span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Separator from '@/core/ui/separator/Separator.vue';
import LoginForm from '@/entities/user/components/LoginForm.vue';
import Button from '@/core/ui/button/Button.vue';
import { Linkedin } from 'lucide-vue-next';
</script>
