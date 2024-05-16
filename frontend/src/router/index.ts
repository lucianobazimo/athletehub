import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { useAuthStore } from '@/stores/auth';
import { checkTokenStatus } from '@/entities/user/services';
import UniversalCookie from 'universal-cookie';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes],
});

const cookies = new UniversalCookie(null, { path: '/' });

router.beforeEach(async (to, _, next) => {
  const token: string | null = cookies.get('token');

  const { setIsAuthenticated, isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    if (!to.meta.isPublic) {
      next();
    } 
    if (to.meta.isPublic) next('/');
  } else {
    if (token) {
      try {
        await checkTokenStatus();
        setIsAuthenticated(true);

        if (to.meta.isPublic) next('/');
        next();
      } catch {
        setIsAuthenticated(false);
        if (to.meta.isPublic) next();

        next('/login');
      }
    } else {
      if (to.meta.isPublic) next();
      if (!to.meta.isPublic) next('/login');
    }
  }
});

export default router;
