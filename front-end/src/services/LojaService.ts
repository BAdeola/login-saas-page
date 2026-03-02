// Puxando a URL dinamicamente do .env
const API_URL = import.meta.env.VITE_API_URL;

export interface Loja {
  id: string;
  nome: string;
}

export const LojaService = {
  async buscarLojas(): Promise<Loja[]> {
    const response = await fetch(`${API_URL}/lojas`);
    
    if (!response.ok) {
      throw new Error("Erro ao buscar as lojas do servidor.");
    }

    const data = await response.json();
    return data.lojas; 
  }
};