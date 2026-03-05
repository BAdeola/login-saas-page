import axios from 'axios';
import { useAuthStore } from '../store/auth/useAuthStore';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
});

// 2. Interceptor de Requisição (MUDANÇA AQUI!)
api.interceptors.request.use((config) => {
  return config;
});

// 3. Interceptor de Resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/login');

    if ((error.response?.status === 401 || error.response?.status === 403) && !isLoginRequest) {
      useAuthStore.getState().logout(); 
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const AuthService = {
  async login(apelid: string, senha: string) {
    const { data } = await api.post('/login', { apelid, senha });
    return data;
  },
  
  async logout() {
    await api.post('/logout');
    useAuthStore.getState().logout();
  },

  async getMe() {
    const { data } = await api.get('/me');
    return data;
  }
};