import { create } from 'zustand';
import { DashboardService } from '../../services/DashboardService';

// 1. AS INTERFACES (Ajuste os nomes conforme precisar)
export interface FiltrosAnalise {
  loja: string | number;
  dataInicio: string;
  dataFim: string;
}

export interface ItemTabela {
  Loja: string;
  NumSaida: number;
  Data: string;
  ValorTotal: number;
}

export interface ItemDetalhe {
  Produto: string;
  Unidade: string;
  Quantidade: number;
  ValorUnitario: number;
  ValorTotal: number;
}

interface DashboardState {
  filtros: FiltrosAnalise;
  setFiltros: (novosFiltros: Partial<FiltrosAnalise>) => void;

  // Estados de Carregamento Separados
  loading: boolean;
  loadingGrafico: boolean;
  loadingItens: boolean;
  error: string | null;

  // Controles de Tela
  showResults: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  showGrafico: boolean;
  setShowGrafico: (show: boolean) => void;
  saidaSelecionada: number | null; // Guarda o 'numsai' da linha que está expandida

  // Os Dados
  dadosTabela: ItemTabela[];
  dadosGrafico: { tipo: 'PIZZA_GERAL' | 'LINHA_LOJA'; dados: any[] } | null;
  dadosItens: ItemDetalhe[];

  // As Ações (Chamadas para a API)
  buscarTabela: () => Promise<void>;
  buscarGrafico: () => Promise<void>;
  buscarItens: (numsai: number) => Promise<void>;
  fecharItens: () => void;
  limparDados: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Filtros Iniciais (Removido o tipoAnalise)
  filtros: {
    loja: '',
    dataInicio: '',
    dataFim: ''
  },
  
  loading: false,
  loadingGrafico: false,
  loadingItens: false,
  error: null,
  
  showResults: false,
  sidebarOpen: true,
  showGrafico: false,
  saidaSelecionada: null,

  dadosTabela: [],
  dadosGrafico: null,
  dadosItens: [],

  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
  setShowGrafico: (show) => set({ showGrafico: show }),
  setFiltros: (novosFiltros) => set((state) => ({ 
    filtros: { ...state.filtros, ...novosFiltros } 
  })),

  // --- AÇÃO 1: BUSCAR A TABELA PRINCIPAL ---
  buscarTabela: async () => {
    const { filtros } = get();
    
    if (!filtros.loja || !filtros.dataInicio || !filtros.dataFim) {
      set({ error: "Preencha todos os campos obrigatórios." });
      return;
    }

    // Ao fazer uma nova pesquisa, limpamos as telas secundárias
    set({ loading: true, error: null, showResults: false, saidaSelecionada: null, dadosItens: [], showGrafico: false });

    try {
      const resposta = await DashboardService.buscarTabela(filtros);
      set({ dadosTabela: resposta.dados, showResults: true, sidebarOpen: false });
    } catch (error: any) {
      set({ error: error.message || "Erro ao buscar a tabela." });
    } finally {
      set({ loading: false });
    }
  },

  // --- AÇÃO 2: BUSCAR GRÁFICOS ---
  buscarGrafico: async () => {
    const { filtros } = get();
    set({ loadingGrafico: true, error: null });

    try {
      const resposta = await DashboardService.buscarGrafico(filtros);
      set({ 
        dadosGrafico: { tipo: resposta.tipo, dados: resposta.dados },
        showGrafico: true // Abre a área do gráfico
      });
    } catch (error: any) {
      set({ error: error.message || "Erro ao gerar os gráficos." });
    } finally {
      set({ loadingGrafico: false });
    }
  },

  // --- AÇÃO 3: BUSCAR ITENS DA NOTA (AO CLICAR NA LINHA) ---
  buscarItens: async (numsai: number) => {
    // Se clicar na mesma saída que já está aberta, funciona como um "fechar" (Toggle)
    if (get().saidaSelecionada === numsai) {
      get().fecharItens();
      return;
    }

    // Marca qual nota foi clicada e esconde o gráfico se estiver aberto
    set({ loadingItens: true, error: null, saidaSelecionada: numsai, showGrafico: false });

    try {
      const resposta = await DashboardService.buscarItens(numsai);
      set({ dadosItens: resposta.dados });
    } catch (error: any) {
      set({ error: error.message || "Erro ao buscar os itens da nota." });
      set({ saidaSelecionada: null }); // Reseta se der erro
    } finally {
      set({ loadingItens: false });
    }
  },

  // Fecha a sub-tabela de itens
  fecharItens: () => set({ saidaSelecionada: null, dadosItens: [] }),

  // Reset total do Dashboard
  limparDados: () => set({
    showResults: false,
    showGrafico: false,
    saidaSelecionada: null,
    dadosTabela: [],
    dadosGrafico: null,
    dadosItens: [],
    error: null,
    sidebarOpen: true, 
    filtros: { loja: '', dataInicio: '', dataFim: '' }
  }),
}));