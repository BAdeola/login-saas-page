import { create } from 'zustand';
import { DashboardService, type FiltrosAnalise } from '../services/DashboardService';

// Tipagens do que vem do seu SQL Server
export interface ItemAnalitico {
  Loja: string;
  NumSaida: string;
  Data: string;
  Produto: string;
  Unidade: string;
  Quantidade: number;
  ValorUnitario: number;
  ValorTotal: number;
}

interface DashboardState {
  // O que o usuário seleciona na tela
  filtros: FiltrosAnalise;
  setFiltros: (novosFiltros: Partial<FiltrosAnalise>) => void;

  // Controle de tela
  loading: boolean;
  error: string | null;
  showResults: boolean;

  // Os dados que chegam do banco
  dadosAnaliticos: ItemAnalitico[];
  dadosSinteticos: { tipo: 'PIZZA_GERAL' | 'LINHA_LOJA'; dados: any[] } | null;

  // Ações
  gerarAnalise: () => Promise<void>;
  limparDados: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  filtros: {
    loja: '',
    dataInicio: '',
    dataFim: '',
    tipoAnalise: 'sintetico',
  },
  
  loading: false,
  error: null,
  showResults: false,
  dadosAnaliticos: [],
  dadosSinteticos: null,

  setFiltros: (novosFiltros) => set((state) => ({ 
    filtros: { ...state.filtros, ...novosFiltros } 
  })),

  gerarAnalise: async () => {
    const { filtros } = get();
    
    // Validação básica
    if (!filtros.loja || !filtros.dataInicio || !filtros.dataFim) {
      set({ error: "Preencha todos os campos obrigatórios." });
      return;
    }

    set({ loading: true, error: null, showResults: false });

    try {
      const resposta = await DashboardService.buscarAnalise(filtros);

      if (filtros.tipoAnalise === 'analitico') {
        set({ dadosAnaliticos: resposta.dados, showResults: true });
      } else {
        set({ 
          dadosSinteticos: { tipo: resposta.tipo, dados: resposta.dados }, 
          showResults: true 
        });
      }
    } catch (error: any) {
      set({ error: error.message || "Erro de conexão." });
    } finally {
      set({ loading: false });
    }
  },

  limparDados: () => set({ 
    showResults: false, 
    dadosAnaliticos: [], 
    dadosSinteticos: null,
    filtros: { ...get().filtros, loja: '', dataInicio: '', dataFim: '' } // Opcional: limpar os inputs também
  }),
}));