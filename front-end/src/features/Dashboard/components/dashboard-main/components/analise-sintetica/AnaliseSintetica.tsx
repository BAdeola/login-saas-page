import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import { useAnaliseSintetica } from './hooks/useAnaliseSintetica';
import { type AnaliseSinteticaProps } from './interfaces'

const CORES_PIZZA = [
  'var(--brand-primary)',    // Verde principal
  'var(--text-accent)',      // Esmeralda de destaque
  '#059669',                 // Tons de segurança
  '#047857',
  '#064e3b',
  '#34d399'
];

export const AnaliseSintetica: React.FC<AnaliseSinteticaProps> = ({ isSidebarAnimating }) => {
  const { dadosSinteticos, formatarMoeda } = useAnaliseSintetica();

  if (!dadosSinteticos) return null;

  return (
    <div className="grid grid-cols-1 gap-6">
      
      {/* GRÁFICO DE PIZZA E RESUMO */}
      {dadosSinteticos.tipo === 'PIZZA_GERAL' && (
        <>
          <div className="bg-surface-primary border border-system-border-default rounded-3xl backdrop-blur-xl p-6 flex flex-col items-center">
            <h4 className="text-system-text-primary text-lg font-bold uppercase mb-4 w-full text-center">
              Distribuição de Saídas por Loja
            </h4>
            <div className="w-full overflow-hidden pb-4">
              {/* CORREÇÃO: Altura fixa com h-[350px] no mobile e h-[400px] no desktop */}
              <div className="w-full h-87.5 md:h-100 relative">
                {/* O gráfico preenche 100% do espaço relativo estático */}
                <div className="absolute inset-0">
                  <ResponsiveContainer width="100%" height="100%" debounce={50}>
                    <PieChart>
                      <Pie
                        isAnimationActive={!isSidebarAnimating} 
                        data={dadosSinteticos.dados} 
                        dataKey="ValorTotal" 
                        nameKey="Loja" 
                        cx="50%" cy="50%" 
                        outerRadius={120}
                        stroke="none" 
                        style={{ outline: 'none' }} 
                        activeShape={{ stroke: 'none' }}
                        labelLine={{ stroke: 'var(--chart-line)', strokeWidth: 1, opacity: 0.5 }}
                        label={(props: any) => {
                          const { x, y, cx, payload, value } = props;
                          return (
                            <text 
                              x={x} y={y} 
                              fill="var(--text-primary)" 
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
                            style={{ outline: 'none' }} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => formatarMoeda(Number(value))}
                        contentStyle={{ 
                          backgroundColor: 'var(--chart-tooltip-bg)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: 'var(--text-primary)' 
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-surface-primary border border-system-border-default rounded-3xl p-6 md:p-8 overflow-hidden backdrop-blur-xl">
            <h4 className="text-system-text-primary text-lg font-bold uppercase mb-6 text-center">
              Resumo de Saídas por Loja
            </h4>
            <div className="w-full overflow-x-auto custom-scrollbar pb-2">
              <table className="w-full min-w-125 text-left border-collapse">
                <thead>
                  <tr className="border-b border-system-border-default text-system-text-secondary text-sm">
                    <th className="p-3">Loja</th>
                    <th className="p-3 text-center">Nº de Saídas</th>
                    <th className="p-3 text-right">Valor Total</th>
                  </tr>
                </thead>
                <tbody className="text-system-text-primary text-sm">
                  {dadosSinteticos.dados.map((linha: any, index: number) => (
                    <tr key={index} className="border-b border-system-border-subtle hover:bg-surface-hover transition-colors">
                      <td className="p-3 font-medium whitespace-nowrap">{linha.Loja}</td>
                      <td className="p-3 text-center">{linha.NumSaidas}</td>
                      <td className="p-3 text-right font-bold text-system-text-accent whitespace-nowrap">
                        {formatarMoeda(linha.ValorTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* GRÁFICO DE LINHA */}
      {dadosSinteticos.tipo === 'LINHA_LOJA' && (
        <div className="bg-surface-primary border border-system-border-default rounded-3xl p-6 shadow-xl overflow-hidden">
          <h4 className="text-system-text-primary text-lg font-bold uppercase mb-4 w-full text-center">
            Evolução de Saídas no Período
          </h4>
          
          {/* CORREÇÃO: Altura rígida h-[350px] e md:h-[450px] garante que o gráfico não encolha/estique */}
          <div className="w-full h-87.5 md:h-112.5 relative">
            <div className="absolute inset-0">
              <ResponsiveContainer width="100%" height="100%" debounce={50}>
                {/* Ajuste de margem para evitar cortes */}
                <LineChart data={dadosSinteticos.dados} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="var(--chart-grid)" 
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="Data" 
                    stroke="var(--chart-axis)" 
                    tickFormatter={(tick) => new Date(tick).toLocaleDateString('pt-BR')} 
                  />
                  <YAxis 
                    stroke="var(--chart-axis)" 
                    tickFormatter={(tick) => formatarMoeda(tick)} 
                    width={90} 
                  />
                  <Tooltip 
                    formatter={(value: any) => formatarMoeda(Number(value))}
                    labelFormatter={(label) => new Date(label).toLocaleDateString('pt-BR')}
                    contentStyle={{ 
                      backgroundColor: 'var(--chart-tooltip-bg)', 
                      border: 'none', 
                      borderRadius: '8px', 
                      color: 'var(--text-primary)' 
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line
                    isAnimationActive={!isSidebarAnimating}
                    type="monotone" 
                    dataKey="ValorTotal" 
                    name="Valor Total de Saída" 
                    stroke="var(--chart-line)" 
                    strokeWidth={3} 
                    dot={{ r: 6, fill: "var(--chart-line)", strokeWidth: 0 }} 
                    activeDot={{ r: 8, stroke: "none"}} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};