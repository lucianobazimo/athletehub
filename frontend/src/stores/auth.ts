import { type Ref, ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated: Ref<boolean> = ref(false);
  const setIsAuthenticated = (value: boolean) => {
    isAuthenticated.value = value;
  };

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    setIsAuthenticated,
  };
});
