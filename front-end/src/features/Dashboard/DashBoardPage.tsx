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
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    showResults, 
    buscarGrafico, 
    showGrafico, 
    setShowGrafico,
    saidaSelecionada 
  } = useDashboardStore();
  
  const [isAnimating, setIsAnimating] = useState(false);

  // Função para alternar entre gráfico e tabela
  const handleToggleGrafico = () => {
    if (!showGrafico) {
      buscarGrafico(); // Busca os dados se for abrir
    } else {
      setShowGrafico(false); // Apenas fecha se já estiver aberto
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-main p-4 md:p-6 flex flex-col items-center overflow-hidden">
      
      <div className="w-full max-w-400 flex flex-col flex-1 min-h-0 relative">
        {/* ÁREA DE BOTÕES DE TOPO INTEIRA ANIMADA */}
        <AnimatePresence>
          {!sidebarOpen && (
            <motion.div
              // Voltamos para a animação original lisinha (sem animar o padding)
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full shrink-0 overflow-hidden"
            >
              
              {/* O TRUQUE: Uma div interna com padding fixo. 
                  O pb-5 (20px) dá o espaço exato para a sombra não cortar 
                  e também já atua como o distanciamento (margin) para a tabela abaixo! */}
              <div className="w-full flex justify-between items-start pt-1 px-1 pb-2">
                
                {/* BOTÃO FLUTUANTE DE ABRIR FILTROS */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                >
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="bg-surface-primary hover:bg-surface-hover backdrop-blur-xl border border-system-border-default text-system-text-primary px-5 py-3 rounded-2xl shadow-md transition-all flex items-center gap-3 group"
                  >
                    <svg className="w-6 h-6 group-hover:rotate-12 transition-transform text-system-text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                    <span className="font-bold tracking-wide hidden md:block">Filtros</span>
                  </button>
                </motion.div>

                {/* BOTÃO DE GERAR GRÁFICOS (CANTO SUPERIOR DIREITO) */}
                <AnimatePresence>
                  {showResults && !saidaSelecionada && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      className="ml-auto"
                    >
                      <button
                        onClick={handleToggleGrafico}
                        title={showGrafico ? 'Ver Tabela' : 'Visualizar Gráficos'}
                        className={`backdrop-blur-xl border border-system-border-default shadow-md transition-all flex items-center justify-center gap-3 group 
                          p-3 md:px-5 md:py-3 rounded-xl md:rounded-2xl
                          ${showGrafico 
                            ? 'bg-brand text-white border-brand' 
                            : 'bg-surface-primary hover:bg-surface-hover text-system-text-primary'
                          }`}
                      >
                        <span className="font-bold tracking-wide hidden md:block">
                          {showGrafico ? 'Ver Tabela' : 'Visualizar Gráficos'}
                        </span>

                        <svg className={`w-6 h-6 transition-transform group-hover:scale-110 ${showGrafico ? 'text-white' : 'text-system-text-accent'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {showGrafico ? (
                            /* ÍCONE DE LISTA (Aparece quando o GRÁFICO está aberto, para voltar para a tabela) */
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h11" />
                          ) : (
                            /* ÍCONE DE PIZZA (Aparece quando a TABELA está aberta, para ir para o gráfico) */
                            <>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </>
                          )}
                        </svg>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 flex min-h-0 relative w-full flex-nowrap overflow-hidden">
          
          {/* VÉU ESCURO PARA MOBILE */}
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