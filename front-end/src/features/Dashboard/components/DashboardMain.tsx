import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '../../../store/useDashboardStore';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';

const CORES_PIZZA = ['#10b981', '#059669', '#047857', '#064e3b', '#34d399', '#6ee7b7'];

export const DashboardMain: React.FC = () => {
  const { showResults, loading, filtros, dadosSinteticos, dadosAnaliticos } = useDashboardStore();

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  return (
    <main className="flex-1 h-full overflow-y-auto pr-2 custom-scrollbar">
      <AnimatePresence mode="wait">
        
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex items-center justify-center text-emerald-50 text-xl font-bold animate-pulse">
            Analisando banco de dados...
          </motion.div>
        )}

        {!showResults && !loading ? (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full backdrop-blur-md bg-white/5 border border-white/5 border-dashed rounded-3xl flex flex-col items-center justify-center p-12 text-center">
            <div className="w-24 h-24 mb-6 rounded-full bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10">
               <svg className="w-12 h-12 text-emerald-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>
            </div>
            <h3 className="text-3xl font-bold text-emerald-50/60 mb-3">Selecione os dados para análise</h3>
          </motion.div>
        ) : showResults && !loading ? (
          
          <motion.div key="charts" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* ==================================================== */}
            {/* VISÃO SINTÉTICA (GRÁFICOS) */}
            {/* ==================================================== */}
            {filtros.tipoAnalise === 'sintetico' && dadosSinteticos && (
              <div className="grid grid-cols-1 gap-6">
                
                {/* Gráfico de Pizza */}
                {dadosSinteticos.tipo === 'PIZZA_GERAL' && (
                  <div className="h-125 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl p-6 flex flex-col items-center">
                    <h4 className="text-emerald-50 text-lg font-bold uppercase mb-4 w-full text-center">Distribuição de Saídas por Loja</h4>
                    <div className="flex-1 w-full mt-4 **:outline-none"> {/* <-- Adicionei o [&_*]:outline-none aqui */}
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={dadosSinteticos.dados}
                            dataKey="ValorTotal"
                            nameKey="Loja"
                            cx="50%"
                            cy="50%"
                            outerRadius={140}
                            stroke="none"
                            style={{ outline: 'none' }} 
                            activeShape={{ stroke: 'none' }} // <-- Tirei o outline daqui para o TS parar de chorar!
                            labelLine={{ stroke: '#6ee7b7', strokeWidth: 1, opacity: 0.5 }}
                            label={(props: any) => {
                              const { x, y, cx, payload, value } = props;
                              return (
                                <text 
                                  x={x} 
                                  y={y} 
                                  fill="#f8fafc"
                                  textAnchor={x > cx ? 'start' : 'end'} 
                                  dominantBaseline="central"
                                  fontSize={12}
                                  fontWeight="500"
                                >
                                  {`${payload.Loja} (${formatarMoeda(value)})`}
                                </text>
                              );
                            }}
                          >
                            {dadosSinteticos.dados.map((_, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={CORES_PIZZA[index % CORES_PIZZA.length]} 
                                stroke="none" 
                                style={{ outline: 'none' }} // <-- MATA O QUADRADO NA CÉLULA
                              />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any) => formatarMoeda(Number(value))} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Gráfico de Linha */}
                {dadosSinteticos.tipo === 'LINHA_LOJA' && (
                  <div className="h-125 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl p-6 flex flex-col">
                    <h4 className="text-emerald-50 text-lg font-bold uppercase mb-4 text-center">Evolução de Saídas no Período</h4>
                    <div className="flex-1 w-full **:outline-none">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dadosSinteticos.dados} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                          <XAxis dataKey="Data" stroke="#a7f3d0" tickFormatter={(tick) => new Date(tick).toLocaleDateString('pt-BR')} />
                          <YAxis stroke="#a7f3d0" tickFormatter={(tick) => formatarMoeda(tick)} width={100} />
                          <Tooltip 
                            formatter={(value: any) => formatarMoeda(Number(value))}
                            labelFormatter={(label) => new Date(label).toLocaleDateString('pt-BR')}
                            contentStyle={{ backgroundColor: '#064e3b', border: 'none', borderRadius: '8px', color: '#fff' }}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="ValorTotal" name="Valor Total de Saída" stroke="#34d399" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8, stroke: 'none'}} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==================================================== */}
            {/* VISÃO ANALÍTICA (TABELA DETALHADA) */}
            {/* ==================================================== */}
            {filtros.tipoAnalise === 'analitico' && (
              <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden">
                <h4 className="text-emerald-50 text-lg font-bold uppercase mb-6">Detalhamento Analítico</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-emerald-100/50 text-sm">
                        <th className="p-3">Loja</th>
                        <th className="p-3">Nº Saída</th>
                        <th className="p-3">Data</th>
                        <th className="p-3">Produto</th>
                        <th className="p-3">Unid.</th>
                        <th className="p-3">Qtd</th>
                        <th className="p-3">Vlr. Unitário</th>
                        <th className="p-3">Vlr. Total</th>
                      </tr>
                    </thead>
                    <tbody className="text-emerald-50 text-sm">
                      {dadosAnaliticos.map((linha, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-3">{linha.Loja}</td>
                          <td className="p-3">{linha.NumSaida}</td>
                          <td className="p-3">{new Date(linha.Data).toLocaleDateString('pt-BR')}</td>
                          <td className="p-3">{linha.Produto}</td>
                          <td className="p-3">{linha.Unidade}</td>
                          <td className="p-3">{linha.Quantidade}</td>
                          <td className="p-3">{formatarMoeda(linha.ValorUnitario)}</td>
                          <td className="p-3 font-bold text-emerald-400">{formatarMoeda(linha.ValorTotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
};