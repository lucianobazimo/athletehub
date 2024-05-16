import { alpha, email, helpers, minLength, required, sameAs } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';

const useFormRules = () => {
  const { t } = useI18n();

  const rules = {
    required: helpers.withMessage(t('form.validation.required'), required),
    email: helpers.withMessage(t('form.validation.email'), email),
    minLength: (length: number) =>
      helpers.withMessage(t('form.validation.minLength', { length }), minLength(length)),
    sameAs: (field: any) => helpers.withMessage(t('form.validation.sameAs'), sameAs(field)),
    alpha: helpers.withMessage(t('form.validation.alpha'), alpha),
    password: (value: string) =>
      helpers.withMessage(t('form.validation.password'), (value: string) =>
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value),
      ),
  };

  return { rules };
};

export default useFormRules;
