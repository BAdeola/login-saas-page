import React from 'react';

interface TabelaPizzaProps {
  dados: any[];
  formatarMoeda: (valor: number) => string;
}

export const TabelaPizza: React.FC<TabelaPizzaProps> = ({ dados, formatarMoeda }) => {
  return (
    <div className="w-full bg-surface-primary border border-system-border-default rounded-3xl p-4 md:p-8 overflow-hidden backdrop-blur-xl">
      <h4 className="text-system-text-primary text-base md:text-lg font-bold uppercase mb-4 md:mb-6 text-center">
        Resumo de Saídas por Loja
      </h4>
      <div className="w-full overflow-x-auto custom-scrollbar pb-2">
        <table className="w-full min-w-full md:min-w-125 text-left border-collapse">
          <thead>
            <tr className="border-b border-system-border-default text-system-text-primary font-bold uppercase tracking-wider text-xs md:text-sm whitespace-nowrap">
              <th className="px-2 py-3 md:p-3">Loja</th>
              <th className="px-2 py-3 md:p-3 text-center">Nº de Saídas</th>
              <th className="px-2 py-3 md:p-3 text-right">Valor Total</th>
            </tr>
          </thead>
          <tbody className="text-system-text-primary text-xs md:text-sm">
            {dados.map((linha: any, index: number) => (
              <tr key={index} className="border-b border-system-border-subtle hover:bg-surface-hover transition-colors">
                <td className="px-2 py-3 md:p-3 font-medium whitespace-nowrap">{linha.Loja}</td>
                <td className="px-2 py-3 md:p-3 text-center whitespace-nowrap">{linha.NumSaidas}</td>
                <td className="px-2 py-3 md:p-3 text-right font-bold text-system-text-accent whitespace-nowrap">{formatarMoeda(linha.ValorTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};