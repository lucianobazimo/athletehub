const routes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: 'AuthLayout',
      isPublic: true,
    },
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: {
      layout: 'AuthLayout',
      isPublic: true,
    },
  },
  {
    name: 'Dashboard',
    path: '/',
    component: () => import('@/views/dashboard/HomeView.vue'),
    meta: {
      layout: 'DashboardLayout',
    },
  },
];

export default routes;
