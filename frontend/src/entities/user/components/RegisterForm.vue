<template>
  <form novalidate @submit.prevent="handleFormSubmit()" class="flex flex-1 flex-col gap-y-3">
    <div>
      <Label>{{ t('login.form.email.label') }}</Label>
      <Input
        v-model="form.email"
        :is-error="formValidation.email.$error"
        :field-errors="formValidation.email.$errors"
        :placeholder="t('login.form.email.placeholder')"
        type="email" />
    </div>

    <div>
      <Label>{{ t('login.form.username.label') }}</Label>
      <Input
        v-model="form.username"
        :is-error="formValidation.username.$error"
        :field-errors="formValidation.username.$errors"
        :placeholder="t('login.form.username.placeholder')"
        type="text" />
    </div>

    <div class="grid grid-cols-2 gap-x-2">
      <div>
        <Label>{{ t('login.form.firsname.label') }}</Label>
        <Input
          v-model="form.firstname"
          :is-error="formValidation.firstname.$error"
          :field-errors="formValidation.firstname.$errors"
          :placeholder="t('login.form.firstname.placeholder')"
          type="text" />
      </div>

      <div>
        <Label>{{ t('login.form.lastname.label') }}</Label>
        <Input
          v-model="form.lastname"
          :is-error="formValidation.lastname.$error"
          :field-errors="formValidation.lastname.$errors"
          :placeholder="t('login.form.lastname.placeholder')"
          type="text" />
      </div>
    </div>

    <div>
      <Label>{{ t('login.form.password.label') }}</Label>
      <Input
        v-model="form.password"
        :is-error="formValidation.password.$error"
        :field-errors="formValidation.password.$errors"
        :placeholder="t('login.form.password.placeholder')"
        type="password" />
    </div>

    <div>
      <Label>{{ t('login.form.passwordRepeat.label') }}</Label>
      <Input
        v-model="form.passwordRepeat"
        :is-error="formValidation.passwordRepeat.$error"
        :field-errors="formValidation.passwordRepeat.$errors"
        :placeholder="t('login.form.passwordRepeat.placeholder')"
        type="password" />
    </div>

    <div class="mt-3 flex flex-1">
      <Button class="flex flex-1" type="submit">{{ $t('register.registerYourself') }}</Button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';
import useFormRules from '@/core/composables/useFormRules';
import { useRegisterUserMutation } from '@/entities/user/hooks';
import { useToast } from '@/core/ui/toast';
import { useRouter } from 'vue-router';
import Input from '@/core/ui/input/Input.vue';
import Label from '@/core/ui/label/Label.vue';
import Button from '@/core/ui/button/Button.vue';

const { t } = useI18n();
const { rules } = useFormRules();
const { isPending, mutateAsync } = useRegisterUserMutation();
const { toast } = useToast();

const form = reactive({
  email: '',
  username: '',
  firstname: '',
  lastname: '',
  password: '',
  passwordRepeat: '',
});

const formRules = computed(() => ({
  email: {
    required: rules.required,
    email: rules.email,
  },
  username: {
    required: rules.required,
    minLength: rules.minLength(4),
  },
  firstname: {
    required: rules.required,
    alpha: rules.alpha,
  },
  lastname: {
    required: rules.required,
    alpha: rules.alpha,
  },
  password: {
    required: rules.required,
    password: rules.password(form.password),
  },
  passwordRepeat: {
    required: rules.required,
    sameAs: rules.sameAs(form.password),
  },
}));

const formValidation = useVuelidate(formRules, form);

const handleFormSubmit = async () => {
  if (isPending.value) return;
  const isFormValid = await formValidation.value.$validate();

  if (!isFormValid) return;

  try {
    await mutateAsync({
      email: form.email,
      username: form.username,
      firstname: form.firstname,
      lastname: form.lastname,
      password: form.password,
    });

    toast({
      title: t('register.success'),
      description: t('register.emailVerification'),
    });
  } catch {
    toast({
      variant: 'destructive',
      title: t('register.impossible'),
      description: t('register.errorDescription'),
    });
  }
};
</script>
