import { email, helpers, required } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';

const useFormRules = () => {
  const { t } = useI18n();

  const rules = {
    required: helpers.withMessage(t('form.validation.required'), required),
    email: helpers.withMessage(t('form.validation.email'), email)
  };

  return { rules };
};

export default useFormRules;
