import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface GraficoLinhaProps {
  dados: any[];
  formatarMoeda: (valor: number) => string;
  isSidebarAnimating: boolean;
  handleDotClick: (data: string) => void;
}

export const GraficoLinha: React.FC<GraficoLinhaProps> = ({ dados, formatarMoeda, isSidebarAnimating, handleDotClick }) => {
  return (
    <>
      <h4 className="text-system-text-primary text-base md:text-lg font-bold uppercase mb-4 w-full text-center">
        Evolução de Saídas no Período
      </h4>
      <div className="w-full overflow-x-auto custom-scrollbar pb-2">
        <div className="min-w-150 md:min-w-175 w-full h-70 md:h-112.5 relative">
          <div className="absolute inset-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <LineChart 
                data={dados} 
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                style={{ cursor: 'pointer' }}
                onClick={(state: any) => {
                  if (state && state.activeLabel) {
                    handleDotClick(state.activeLabel);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="Data" stroke="var(--chart-axis)" tick={{ fontSize: 12 }} tickFormatter={(tick) => new Date(tick).toLocaleDateString('pt-BR')} />
                <YAxis stroke="var(--chart-axis)" tick={{ fontSize: 12 }} tickFormatter={(tick) => formatarMoeda(tick)} width={85} />
                <Tooltip 
                  formatter={(value: any) => formatarMoeda(Number(value))}
                  labelFormatter={(label) => new Date(label).toLocaleDateString('pt-BR')}
                  contentStyle={{ backgroundColor: 'var(--chart-tooltip-bg)', border: 'none', borderRadius: '8px', color: 'var(--text-primary)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line
                  isAnimationActive={!isSidebarAnimating}
                  type="monotone" 
                  dataKey="ValorTotal" 
                  name="Valor Total de Saída" 
                  stroke="var(--chart-line)" 
                  strokeWidth={3}
                  dot={{ r: 5, fill: "var(--chart-line)", strokeWidth: 0 }} 
                  activeDot={{ r: 8, stroke: "var(--brand-primary)", strokeWidth: 2 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};