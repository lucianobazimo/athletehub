<template>
  <form novalidate @submit.prevent="handleFormSubmit()" class="flex flex-1 flex-col gap-y-4">
    <div>
      <Label>{{ t('login.form.email.label') }}</Label>
      <Input
        v-model="form.email"
        :is-error="formValidation.email.$error"
        :field-errors="formValidation.email.$errors"
        :placeholder="t('login.form.email.placeholder')"
        type="email"
      />
    </div>

    <div>
      <Label>{{ t('login.form.password.label') }}</Label>
      <Input
        v-model="form.password"
        :is-error="formValidation.password.$error"
        :field-errors="formValidation.password.$errors"
        :placeholder="t('login.form.password.placeholder')"
        type="password"
      />
    </div>

    <Button type="submit">Se connecter</Button>
  </form>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import useFormRules from '@/core/composables/useFormRules';
import { useLoginMutation } from '@/entities/user/hooks';
import { useToast } from '@/core/ui/toast';
import { useRouter } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies';
import Input from '@/core/ui/input/Input.vue';
import Label from '@/core/ui/label/Label.vue';
import Button from '@/core/ui/button/Button.vue';
import { useAuthStore } from '@/stores/auth';

const { t } = useI18n();
const { rules } = useFormRules();
const { isPending, mutateAsync } = useLoginMutation();
const { toast } = useToast();
const cookies = useCookies();
const { setIsAuthenticated } = useAuthStore();
const router = useRouter();

const form = reactive({
  email: '',
  password: '',
});

const formRules = computed(() => ({
  email: {
    required: rules.required,
    email: rules.email,
  },
  password: {
    required: rules.required,
  },
}));

const formValidation = useVuelidate(formRules, form);

const handleFormSubmit = async () => {
  if (isPending.value) return;
  const isFormValid = await formValidation.value.$validate();

  if (!isFormValid) return;

  try {
    const response = await mutateAsync(form);
    cookies.set('token', response.token);
    cookies.set('tokenExpirationDate', response.expiresAt);
    setIsAuthenticated(true);

    router.push({ name: 'Dashboard' });
  } catch {
    toast({
      variant: 'destructive',
      title: 'Connexion impossible',
      description: 'Veuillez vérifier vos identifiants',
    });
  }
};
</script>
