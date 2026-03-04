// Importamos a instância do axios que configuramos com os interceptores
import { api } from './api'; 

export interface FiltrosAnalise {
  loja: string | number;
  dataInicio: string;
  dataFim: string;
}

export const DashboardService = {
  
  // --- AÇÃO 1: Busca os dados da tabela principal ---
  async buscarTabela(filtros: FiltrosAnalise) {
    // O Axios já entende que é um POST e envia o 'filtros' como JSON
    // Se o servidor retornar erro (4xx ou 5xx), o axios joga o erro automaticamente
    const response = await api.post('/analise/tabela', filtros);
    return response.data;
  },

  // --- AÇÃO 2: Busca os dados para o Gráfico (Pizza ou Linha) ---
  async buscarGrafico(filtros: FiltrosAnalise) {
    const response = await api.post('/analise/grafico', filtros);
    return response.data;
  },

  // --- AÇÃO 3: Busca os detalhes/produtos de uma nota específica ---
  async buscarItens(numsai: number) {
    // No Axios, não precisamos de headers extras aqui, 
    // o interceptor já injeta o Token de Autenticação para nós!
    const response = await api.get(`/analise/${numsai}/itens`);
    return response.data;
  }
};