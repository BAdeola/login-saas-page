import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '../../../../store/dashboard/useDashboardStore';
import { AnaliseSintetica } from './components/analise-sintetica/AnaliseSintetica';
import { AnaliseAnalitica } from './components/analise-analitica/AnaliseAnalitica';

// Adicionamos a prop na interface
interface DashboardMainProps {
  isAnimating: boolean;
}

export const DashboardMain: React.FC<DashboardMainProps> = ({ isAnimating }) => {
  const { showResults, loading, filtros } = useDashboardStore();
  const scrollRef = useRef<HTMLElement>(null);

  const handleScrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main ref={scrollRef} className="flex-1 h-full overflow-y-auto overflow-x-hidden min-h-0 pr-2 custom-scrollbar relative">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex items-center justify-center text-emerald-50 text-xl font-bold animate-pulse">
            Analisando banco de dados...
          </motion.div>
        )}

        {!showResults && !loading ? (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full backdrop-blur-md bg-white/5 border border-white/5 border-dashed rounded-3xl flex flex-col items-center justify-center p-12 text-center">
            {/* ... seu código de boas-vindas ... */}
            <h3 className="text-3xl font-bold text-emerald-50/60 mb-3">Selecione os dados para análise</h3>
          </motion.div>
        ) : showResults && !loading ? (
          <motion.div key="charts" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 min-w-0 pb-20">
            {/* Agora passamos o isAnimating corretamente para o gráfico */}
            {filtros.tipoAnalise === 'sintetico' ? (
              <AnaliseSintetica isSidebarAnimating={isAnimating} />
            ) : (
              <AnaliseAnalitica onPageChange={handleScrollToTop} />
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
};