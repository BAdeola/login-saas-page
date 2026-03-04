// Importamos a instância centralizada que já possui a Base URL e Interceptors
import { api } from './api'; 

export interface Loja {
  id: string;
  nome: string;
}

export const LojaService = {
  async buscarLojas(): Promise<Loja[]> {
    // O Axios simplifica: não precisa de .json() nem de checar response.ok
    // Se houver erro de rede ou status 4xx/5xx, o Axios lança a exceção sozinho
    const response = await api.get('/lojas');
    
    // Os dados retornados pelo servidor ficam sempre dentro de .data
    return response.data.lojas; 
  }
};