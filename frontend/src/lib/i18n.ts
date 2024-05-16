import { createI18n } from 'vue-i18n';
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  globalInjection: true,
  legacy: false,
  availableLocales: ['fr', 'en'],
  messages: { fr, en },
});

export default i18n;
