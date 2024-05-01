import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { VueQueryPlugin } from '@tanstack/vue-query';
import i18n from '@/lib/i18n';
import AuthLayout from './layouts/AuthLayout.vue';

const app = createApp(App);

app.component('AuthLayout', AuthLayout);

app.use(createPinia());
app.use(i18n);
app.use(router);

app.use(VueQueryPlugin);

app.mount('#app');
