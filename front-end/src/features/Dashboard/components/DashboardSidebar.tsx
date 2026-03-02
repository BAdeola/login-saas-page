import React from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '../../../store/useDashboardStore';

interface SidebarProps {
  lojas: any[];
  carregandoLojas: boolean;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({ lojas, carregandoLojas }) => {
  // Puxando apenas o que a Sidebar precisa do Cérebro
  const { filtros, setFiltros, gerarAnalise, error, loading } = useDashboardStore();

  const handleAnalisar = (e: React.FormEvent) => {
    e.preventDefault();
    gerarAnalise();
  };

  return (
    <motion.aside 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full md:w-87.5 lg:w-100 h-full"
    >
      <div className="h-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8 flex flex-col">
        <h2 className="text-2xl font-bold text-emerald-50 mb-8 border-b border-white/5 pb-4">
          Configurações
        </h2>

        <form onSubmit={handleAnalisar} className="flex-1 flex flex-col gap-8">
          <div className="space-y-6">
            
            {/* Campo: Loja */}
            <div className="space-y-2">
              <label className="text-emerald-100/70 text-sm ml-1">Loja de Origem</label>
              <select 
                required 
                value={filtros.loja}
                onChange={(e) => setFiltros({ loja: e.target.value })}
                disabled={carregandoLojas}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-emerald-50 focus:ring-2 focus:ring-emerald-500/30 transition-all appearance-none [&>option]:bg-neutral-900 outline-none"
              >
                <option value="" disabled>{carregandoLojas ? 'Carregando...' : 'Selecione...'}</option>
                <option value="TODAS">TODAS AS LOJAS</option>
                {lojas?.map((loja) => (
                  <option key={loja.id} value={loja.id}>{loja.nome}</option>
                ))}
              </select>
            </div>

            {/* Campo: Período */}
            <div className="space-y-2">
              <label className="text-emerald-100/70 text-sm ml-1">Período</label>
              <div className="flex flex-col gap-2">
                <input 
                  type="date" required 
                  value={filtros.dataInicio}
                  onChange={(e) => setFiltros({ dataInicio: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-emerald-50 text-sm scheme-dark outline-none" 
                />
                <input 
                  type="date" required 
                  value={filtros.dataFim}
                  onChange={(e) => setFiltros({ dataFim: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-emerald-50 text-sm scheme-dark outline-none" 
                />
              </div>
            </div>

            {/* Tipo de Análise */}
            <div className="space-y-2">
              <label className="text-emerald-100/70 text-sm ml-1">Visão dos Dados</label>
              <div className="grid grid-cols-2 bg-black/20 rounded-xl p-1 border border-white/5">
                <button type="button" onClick={() => setFiltros({ tipoAnalise: 'sintetico' })} className={`py-2 text-xs font-bold rounded-lg transition-all ${filtros.tipoAnalise === 'sintetico' ? 'bg-emerald-500/20 text-emerald-50 shadow-inner' : 'text-emerald-100/30'}`}>SINTÉTICO</button>
                <button type="button" onClick={() => setFiltros({ tipoAnalise: 'analitico' })} className={`py-2 text-xs font-bold rounded-lg transition-all ${filtros.tipoAnalise === 'analitico' ? 'bg-emerald-500/20 text-emerald-50 shadow-inner' : 'text-emerald-100/30'}`}>ANALÍTICO</button>
              </div>
            </div>
          </div>

          {/* Botão sempre no final */}
          <div className="mt-auto flex flex-col gap-3">
            
            {/* 2. MENSAGEM DE ERRO VISUAL */}
            {error && (
              <div className="text-red-400 text-sm font-bold text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                ⚠️ {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#f0fdf4' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading} // Desativa o botão enquanto carrega
              className="w-full py-4 bg-emerald-50 text-emerald-950 font-black rounded-2xl shadow-xl transition-all uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? 'Buscando...' : 'Gerar Análise'}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.aside>
  );
};