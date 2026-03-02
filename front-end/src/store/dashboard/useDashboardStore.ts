import { create } from 'zustand';
import { DashboardService, type FiltrosAnalise } from '../../services/DashboardService';
import type { ItemAnalitico } from './interfaces';

// 1. PLANTA BAIXA: A Interface TypeScript
interface DashboardState {
  filtros: FiltrosAnalise;
  setFiltros: (novosFiltros: Partial<FiltrosAnalise>) => void;

  loading: boolean;
  error: string | null;
  showResults: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;

  dadosAnaliticos: ItemAnalitico[];
  dadosSinteticos: { tipo: 'PIZZA_GERAL' | 'LINHA_LOJA'; dados: any[] } | null;

  gerarAnalise: () => Promise<void>;
  limparDados: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // 2. TIJOLOS INICIAIS: Os valores padrão quando o app abre
  filtros: {
    loja: '',
    dataInicio: '',
    dataFim: '',
    tipoAnalise: 'sintetico',
  },
  
  loading: false,
  error: null,
  showResults: false,

  // ======== NOVA VARIÁVEL AQUI ========
  // A sidebar sempre começa aberta
  sidebarOpen: true,
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
  // =====================================

  dadosAnaliticos: [],
  dadosSinteticos: null,

  setFiltros: (novosFiltros) => set((state) => ({ 
    filtros: { ...state.filtros, ...novosFiltros } 
  })),

  gerarAnalise: async () => {
    const { filtros } = get();
    
    if (!filtros.loja || !filtros.dataInicio || !filtros.dataFim) {
      set({ error: "Preencha todos os campos obrigatórios." });
      return;
    }

    set({ loading: true, error: null, showResults: false });

    try {
      const resposta = await DashboardService.buscarAnalise(filtros);

      if (filtros.tipoAnalise === 'analitico') {
        // ======== NOVA VARIÁVEL AQUI ========
        // Fechamos a sidebar ao mostrar o resultado!
        set({ dadosAnaliticos: resposta.dados, showResults: true, sidebarOpen: false });
      } else {
        // ======== NOVA VARIÁVEL AQUI ========
        // Fechamos a sidebar ao mostrar o resultado!
        set({ 
          dadosSinteticos: { tipo: resposta.tipo, dados: resposta.dados }, 
          showResults: true,
          sidebarOpen: false 
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
    dadosSinteticos: null,
    dadosAnaliticos: [],
    error: null,
    // ======== NOVA VARIÁVEL AQUI ========
    // Ao limpar a tela (quando o usuário sai/volta), a sidebar abre de novo
    sidebarOpen: true, 
    // =====================================
    filtros: {
      loja: '',
      dataInicio: '',
      dataFim: '',
      tipoAnalise: 'sintetico'
    }
  }),
}));