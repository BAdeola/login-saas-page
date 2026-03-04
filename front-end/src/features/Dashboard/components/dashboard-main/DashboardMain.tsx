import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '../../../../store/dashboard/useDashboardStore';
import { Graficos } from './components/analise-sintetica/Graficos';
import { TabelaGeral } from './components/tabela-geral/TabelaGeral';

interface DashboardMainProps {
  isAnimating: boolean;
}

export const DashboardMain: React.FC<DashboardMainProps> = ({ isAnimating }) => {
  // 1. Trocamos os 'filtros' pelas variáveis de controle do gráfico
  const { showResults, loading, showGrafico, loadingGrafico } = useDashboardStore();
  const scrollRef = useRef<HTMLElement>(null);

  const handleScrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main ref={scrollRef} className="flex-1 h-full overflow-y-auto overflow-x-hidden min-h-0 pr-2 custom-scrollbar relative">
      <AnimatePresence mode="wait">
        
        {/* Loading Principal (Busca da Tabela Inicial) */}
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex items-center justify-center text-emerald-50 text-xl font-bold animate-pulse">
            Buscando notas fiscais...
          </motion.div>
        )}

        {/* Estado Vazio (Antes de pesquisar) */}
        {!showResults && !loading ? (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full backdrop-blur-md bg-white/5 border border-white/5 border-dashed rounded-3xl flex flex-col items-center justify-center p-12 text-center">
            <h3 className="text-3xl font-bold text-emerald-50/60 mb-3">Selecione os dados para análise</h3>
          </motion.div>
        ) : showResults && !loading ? (
          
          /* Tela com Resultados */
          <motion.div key="content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 min-w-0 pb-20">
            
            {/* NOVA LÓGICA: Alterna entre Gráfico e Tabela baseada no botão do topo! */}
            {showGrafico ? (
              // Se showGrafico for true, verificamos se está carregando antes de mostrar o componente
              loadingGrafico ? (
                <div className="flex flex-col items-center justify-center py-32 text-brand font-bold animate-pulse gap-4">
                  <svg className="w-10 h-10 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Gerando inteligência dos dados...
                </div>
              ) : (
                <Graficos isSidebarAnimating={isAnimating} />
              )
            ) : (
              // Padrão: Mostra a tabela de saídas
              <TabelaGeral onPageChange={handleScrollToTop} />
            )}

          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
};