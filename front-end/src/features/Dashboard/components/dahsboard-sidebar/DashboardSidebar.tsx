import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardSidebar } from './hooks/useDashboardSidebar';
import { ThemeToggle } from '../../../../components/ThemeTogle/ThemeToggle';

interface SidebarProps {
  lojas: any[];
  carregandoLojas: boolean;
  // Novas props para sincronizar com o congelamento do gráfico
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({ 
  lojas, 
  carregandoLojas,
  onAnimationStart,
  onAnimationComplete 
}) => {
  const {
    filtros,
    setFiltros,
    loading,
    error,
    sidebarOpen,
    setSidebarOpen,
    nomeUsuario,
    handleAnalisar,
    handleLogout
  } = useDashboardSidebar();

  return (
    <AnimatePresence initial={false}>
      {sidebarOpen && (
        <motion.aside 
          // Dispara o congelamento do gráfico ao iniciar o movimento
          onAnimationStart={onAnimationStart}
          // Libera o gráfico para recalcular apenas quando o movimento parar
          onAnimationComplete={onAnimationComplete}
          initial={{ width: 0, opacity: 0, marginRight: 0 }}
          animate={{ width: "auto", opacity: 1, marginRight: 24 }} 
          exit={{ width: 0, opacity: 0, marginRight: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute md:relative z-50 h-full overflow-hidden shrink-0 left-0 top-0"
        >
          <div className="w-[calc(100vw-2rem)] md:w-100 h-full backdrop-blur-2xl bg-surface-primary border border-system-border-default shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col relative">
            
            {/* TOPO: DARK MODE (ESQUERDA) | MINIMIZAR (DIREITA) */}
            <div className="w-full flex justify-between items-center mb-6">
              <ThemeToggle />

              <button 
                onClick={() => setSidebarOpen(false)} 
                title="Minimizar Menu"
                className="p-2 bg-surface-secondary hover:bg-surface-hover border border-system-border-subtle rounded-xl text-system-text-muted hover:text-system-text-primary transition-all flex items-center justify-center group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                </svg>
              </button>
            </div>

            {/* CABEÇALHO COM LOGOUT E NOME */}
            <div className="flex items-center gap-4 mb-8 border-b border-system-border-subtle pb-4">
              <button 
                type="button"
                onClick={handleLogout}
                title="Sair do Sistema"
                className="p-2.5 bg-system-error-bg text-system-error hover:bg-system-error-hover hover:scale-105 active:scale-95 rounded-xl transition-all shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
              </button>

              <h2 className="text-xl md:text-2xl font-bold text-system-text-primary truncate">
                Olá, <span className="text-system-text-accent">{nomeUsuario}</span>
              </h2>
            </div>

            {/* FORMULÁRIO COM PX-6 */}
            <form onSubmit={handleAnalisar} className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar px-6 pr-2">
              <div className="space-y-6">
                
                {/* Campo: Loja */}
                <div className="space-y-2">
                  <label className="text-system-text-secondary text-sm ml-1">Loja de Origem</label>
                  <select 
                    required 
                    value={filtros.loja}
                    onChange={(e) => setFiltros({ loja: e.target.value })}
                    disabled={carregandoLojas}
                    className="w-full bg-surface-secondary border border-system-border-default rounded-xl px-4 py-3 text-system-text-primary focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all appearance-none outline-none"
                  >
                    <option value="" disabled className="bg-surface-tertiary">{carregandoLojas ? 'Carregando...' : 'Selecione...'}</option>
                    <option value="TODAS" className="bg-surface-tertiary">TODAS AS LOJAS</option>
                    {lojas?.map((loja) => (
                      <option key={loja.id} value={loja.id} className="bg-surface-tertiary">{loja.nome}</option>
                    ))}
                  </select>
                </div>

                {/* Campo: Período */}
                <div className="space-y-2">
                  <label className="text-system-text-secondary text-sm ml-1">Período</label>
                  <div className="flex flex-col gap-2">
                    <input 
                      type="date" 
                      required 
                      value={filtros.dataInicio}
                      onChange={(e) => setFiltros({ dataInicio: e.target.value })}
                      className="w-full bg-surface-secondary border border-system-border-default rounded-xl px-4 py-3 text-system-text-primary text-sm outline-none appearance-none" 
                    />
                    <input 
                      type="date" 
                      required 
                      value={filtros.dataFim}
                      onChange={(e) => setFiltros({ dataFim: e.target.value })}
                      className="w-full bg-surface-secondary border border-system-border-default rounded-xl px-4 py-3 text-system-text-primary text-sm outline-none appearance-none" 
                    />
                  </div>
                </div>

                {/* Tipo de Análise */}
                <div className="space-y-2">
                  <label className="text-system-text-secondary text-sm ml-1">Visão dos Dados</label>
                  <div className="grid grid-cols-2 bg-surface-tertiary rounded-xl p-1 border border-system-border-subtle">
                    <button 
                      type="button" 
                      onClick={() => setFiltros({ tipoAnalise: 'sintetico' })} 
                      className={`py-2 text-xs font-bold rounded-lg transition-all ${filtros.tipoAnalise === 'sintetico' ? 'bg-brand-hover text-system-text-primary shadow-inner' : 'text-system-text-muted'}`}
                    >
                      SINTÉTICO
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setFiltros({ tipoAnalise: 'analitico' })} 
                      className={`py-2 text-xs font-bold rounded-lg transition-all ${filtros.tipoAnalise === 'analitico' ? 'bg-brand-hover text-system-text-primary shadow-inner' : 'text-system-text-muted'}`}
                    >
                      ANALÍTICO
                    </button>
                  </div>
                </div>
              </div>

              {/* Botão Gerar Análise */}
              <div className="mt-auto flex flex-col gap-3 pt-6 pb-2 px-1">
                {error && (
                  <div className="text-system-error text-sm font-bold text-center bg-system-error-bg py-2 rounded-lg border border-system-error-hover">
                    ⚠️ {error}
                  </div>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.02, opacity: 0.9 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-brand text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition-all uppercase tracking-widest disabled:opacity-50"
                >
                  {loading ? 'Buscando...' : 'Gerar Análise'}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};