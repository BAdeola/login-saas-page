const API_URL = import.meta.env.VITE_API_URL;

export interface FiltrosAnalise {
  loja: string;
  dataInicio: string;
  dataFim: string;
  tipoAnalise: 'sintetico' | 'analitico';
}

export const DashboardService = {
  async buscarAnalise(filtros: FiltrosAnalise) {
    const response = await fetch(`${API_URL}/analise`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filtros),
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar dados da análise.");
    }

    const data = await response.json();
    return data;
  }
};