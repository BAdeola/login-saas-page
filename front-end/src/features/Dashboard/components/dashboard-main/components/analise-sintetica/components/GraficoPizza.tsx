import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CORES_PIZZA = [
  '#10b981', '#3b82f6', '#8b5cf6', '#f97316', '#ec4899', 
  '#eab308', '#06b6d4', '#f43f5e', '#84cc16', '#6366f1'
];
// Mantendo o RADIAN para as labels funcionarem corretamente
const RADIAN = Math.PI / 180;

interface GraficoPizzaProps {
  dados: any[];
  formatarMoeda: (valor: number) => string;
  isMobile: boolean;
  isSidebarAnimating: boolean;
}

export const GraficoPizza: React.FC<GraficoPizzaProps> = ({ dados, formatarMoeda, isMobile, isSidebarAnimating }) => {
  return (
    <div className="bg-surface-primary border border-system-border-default rounded-3xl backdrop-blur-xl p-6 flex flex-col items-center">
      <h4 className="text-system-text-primary text-lg font-bold uppercase mb-4 w-full text-center">
        Distribuição de Saídas por Loja
      </h4>
      <div className="w-full overflow-x-hidden md:overflow-x-auto custom-scrollbar pb-4">
        <div className="w-full min-w-full md:min-w-175 h-125 md:h-130 relative">
          <div className="absolute inset-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <Pie
                  isAnimationActive={!isSidebarAnimating} 
                  data={dados} 
                  dataKey="ValorTotal" 
                  nameKey="Loja" 
                  // AJUSTE: Mudamos de 35% para 48% no Desktop para aproximar da legenda
                  cx={isMobile ? "50%" : "48%"} 
                  cy={isMobile ? "40%" : "50%"} 
                  outerRadius={isMobile ? 100 : 160} 
                  stroke="none" 
                  style={{ outline: 'none' }} 
                  activeShape={{ stroke: 'none' }}
                  labelLine={false}
                  label={(props: any) => {
                    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    const porcentagem = (percent * 100).toFixed(1);
                    if (percent < 0.03) return null;
                    return (
                      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={isMobile ? 12 : 16} fontWeight="bold" style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.5)' }}>
                        {`${porcentagem}%`}
                      </text>
                    );
                  }}
                >
                  {dados.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={CORES_PIZZA[index % CORES_PIZZA.length]} stroke="none" style={{ outline: 'none' }} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => formatarMoeda(Number(value))}
                  contentStyle={{ backgroundColor: 'var(--chart-tooltip-bg)', border: 'none', borderRadius: '12px', color: 'var(--text-primary)' }} 
                />
                <Legend 
                  layout={isMobile ? "horizontal" : "vertical"} 
                  align={isMobile ? "center" : "right"} 
                  verticalAlign={isMobile ? "bottom" : "middle"} 
                  iconSize={10} 
                  iconType="circle"
                  wrapperStyle={{ 
                    paddingTop: isMobile ? '20px' : '0px', 
                    // AJUSTE: Reduzimos de 40px para 15px para "colar" a legenda no gráfico
                    paddingLeft: isMobile ? '0px' : '15px',
                    color: 'var(--text-primary)',
                    width: isMobile ? '100%' : 'auto'
                  }}
                  formatter={(value: string, entry: any) => (
                    <span className="text-xs md:text-sm font-medium">
                      {value} <span className="text-system-text-muted">({formatarMoeda(entry.payload.Value || entry.payload.ValorTotal)})</span>
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};