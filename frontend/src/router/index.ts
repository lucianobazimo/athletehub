import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes]
});


router.beforeEach((to, from, next) => {
  const cookies = document.cookie.split(';');
  const isAuthenticated = cookies.find(cookie => cookie.includes("isAuthenticated"));
  
  console.log(isAuthenticated)

  next()
});

export default router;
