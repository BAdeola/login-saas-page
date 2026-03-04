import axios from 'axios';
import { useAuthStore } from '../store/auth/useAuthStore';

// 1. Instância centralizada
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 2. Interceptor de Requisição (Já está correto!)
api.interceptors.request.use((config) => {
  const user = useAuthStore.getState().user;
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// 3. Interceptor de Resposta (Já está correto!)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      useAuthStore.getState().logout(); 
    }
    // Melhoria: Retornar uma mensagem de erro amigável do backend
    const message = error.response?.data?.erro || error.message || "Erro na comunicação";
    return Promise.reject(new Error(message));
  }
);

// 4. ADICIONE ISSO: Exportar o serviço de autenticação usando a instância 'api'
export const AuthService = {
  async login(apelid: string, senha: string) {
    // Agora usamos a instância 'api' que já tem as regras acima
    const { data } = await api.post('/login', { apelid, senha });
    return data;
  }
};