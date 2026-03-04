import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from './interfaces';


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem('@DDCD:user');
        window.location.href = '/dd/'; // Garante limpeza total
      },
    }),
    { name: '@DDCD:user' } // Sincroniza o Zustand com o LocalStorage automaticamente
  )
);