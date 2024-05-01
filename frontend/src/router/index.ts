import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        layout: 'AuthLayout'
      }
    },
    {
      name: 'Register',
      path: '/register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        layout: 'AuthLayout'
      }
    },
    {
      name: 'Dashboard',
      path: '/',
      component: () => import('@/views/dashboard/HomeView.vue'),
      meta: {
        layout: 'DashboardLayout'
      }
    }
  ]
});

export default router;
