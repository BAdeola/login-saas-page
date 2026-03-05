import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from './interfaces';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      
      setUser: (user) => set({ user }),
      
      logout: () => {
        // 1. Limpamos o estado do Zustand
        set({ user: null });
        
        // 3. Redirecionamento
        window.location.href = '/'; 
      },
    }),
    { 
      name: '@DDCD:user', // Nome da chave no LocalStorage
    }
  )
);