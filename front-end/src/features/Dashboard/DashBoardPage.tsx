import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardSidebar } from './components/dahsboard-sidebar/DashboardSidebar';
import { DashboardMain } from './components/dashboard-main/DashboardMain';
import { useDashboardStore } from '../../store/dashboard/useDashboardStore';

interface DashboardPageProps {
  lojas: any[];
  carregandoLojas: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ lojas, carregandoLojas }) => {
  const { sidebarOpen, setSidebarOpen } = useDashboardStore();
  
  // CORREÇÃO: O estado deve ficar dentro do componente
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="h-screen w-full bg-gradient-main p-4 md:p-6 flex flex-col items-center overflow-hidden">
      
      <div className="w-full max-w-400 flex flex-col flex-1 min-h-0 relative">
        
        {/* BOTÃO FLUTUANTE DE ABRIR FILTROS */}
        <AnimatePresence>
          {!sidebarOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: 16 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="w-full flex shrink-0"
            >
              <button
                onClick={() => setSidebarOpen(true)}
                className="bg-surface-primary hover:bg-surface-hover backdrop-blur-xl border border-system-border-default text-system-text-primary px-5 py-3 rounded-2xl shadow-xl transition-all flex items-center gap-3 group"
              >
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform text-system-text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                <span className="font-bold tracking-wide">Filtros da Análise</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 flex min-h-0 relative w-full flex-nowrap overflow-hidden">
          
          {/* =========================================================
              INÍCIO DA NOVA ADIÇÃO: VÉU ESCURO PARA MOBILE
              ========================================================= */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSidebarOpen(false)} 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              />
            )}
          </AnimatePresence>
          {/* =========================================================
              FIM DA NOVA ADIÇÃO
              ========================================================= */}

          <DashboardSidebar 
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
            lojas={lojas} 
            carregandoLojas={carregandoLojas} 
          />
          
          <div className="flex-1 min-w-0 relative h-full overflow-hidden">
              <DashboardMain isAnimating={isAnimating} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;