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
    // Verifica se o erro NÃO foi na rota de login
    const isLoginRequest = error.config?.url?.includes('/login');

    if ((error.response?.status === 401 || error.response?.status === 403) && !isLoginRequest) {
      // Só desloga se o token expirar ou for inválido, mas NÃO no erro de senha
      //useAuthStore.getState().logout(); 
    }
    return Promise.reject(error);
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