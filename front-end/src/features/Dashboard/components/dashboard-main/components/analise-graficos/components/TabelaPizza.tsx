import React from 'react';

interface TabelaPizzaProps {
  dados: any[];
  formatarMoeda: (valor: number) => string;
}

export const TabelaPizza: React.FC<TabelaPizzaProps> = ({ dados, formatarMoeda }) => {
  // Cálculo do resumo total para a legenda singela
  const totalGeral = dados.reduce((acc, curr) => acc + curr.ValorTotal, 0);
  const totalNotas = dados.reduce((acc, curr) => acc + curr.NumSaidas, 0);

  return (
    <div className="w-full bg-surface-primary border border-system-border-default rounded-3xl p-4 md:p-8 overflow-hidden backdrop-blur-xl shadow-sm">
      
      {/* CABEÇALHO OTIMIZADO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-system-border-subtle pb-4 gap-2">
        <h4 className="text-system-text-primary text-sm md:text-xl font-bold uppercase tracking-tight">
          Resumo de Saídas por Loja
        </h4>
        
        <div className="flex flex-col items-start md:items-end gap-0.5">
          {/* Ajustamos aqui: text-xs no mobile para ficar 'singelo' e md:text-base para crescer no desktop */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-system-text-muted">
            <span>{totalNotas} notas no total</span>
            <span className="hidden md:block w-1 h-1 bg-system-text-muted/30 rounded-full"></span>
            
            {/* O Valor Geral ganha um destaque extra no Desktop com md:text-xl */}
            <span className="text-brand font-bold md:sm transition-all">
              Total Geral: {formatarMoeda(totalGeral)}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto custom-scrollbar pb-2">
        <table className="w-full min-w-full md:min-w-125 text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b border-system-border-default text-system-text-primary font-bold uppercase tracking-wider text-[10px] md:text-sm whitespace-nowrap">
              <th className="px-2 py-3 md:p-3 w-[40%]">Loja</th>
              <th className="px-2 py-3 md:p-3 text-center w-[25%]">Nº Saídas</th>
              <th className="px-2 py-3 md:p-3 text-right w-[35%]">Valor Total</th>
            </tr>
          </thead>
          <tbody className="text-system-text-primary text-[11px] md:text-sm">
            {dados.map((linha, index) => (
              <tr key={index} className="border-b border-system-border-subtle hover:bg-surface-hover transition-colors">
                <td className="px-2 py-3 md:p-3 font-medium truncate">{linha.Loja}</td>
                <td className="px-2 py-3 md:p-3 text-center">{linha.NumSaidas}</td>
                <td className="px-2 py-3 md:p-3 text-right font-bold text-system-text-accent">
                  {formatarMoeda(linha.ValorTotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};