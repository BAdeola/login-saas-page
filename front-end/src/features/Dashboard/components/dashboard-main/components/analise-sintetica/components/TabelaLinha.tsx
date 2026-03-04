import React from 'react';

interface TabelaLinhaProps {
  dataSelecionada: string;
  dadosDoDia: any[];
  formatarMoeda: (valor: number) => string;
}

export const TabelaLinha: React.FC<TabelaLinhaProps> = ({ dataSelecionada, dadosDoDia, formatarMoeda }) => {
  return (
    <div className="mt-6 pt-6 border-t border-system-border-subtle animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-system-text-primary font-bold uppercase text-sm md:text-base">
          Saídas do dia <span className="text-brand">{new Date(dataSelecionada).toLocaleDateString('pt-BR')}</span>
        </h5>
        <span className="text-xs md:text-sm font-medium bg-surface-secondary text-system-text-secondary px-3 py-1 rounded-lg border border-system-border-subtle">
          {dadosDoDia.length} notas
        </span>
      </div>
      <div className="w-full overflow-x-auto custom-scrollbar pb-2">
        <table className="w-full min-w-full md:min-w-125 text-left border-collapse">
          <thead>
            <tr className="border-b border-system-border-default text-system-text-primary font-bold tracking-wider text-xs md:text-sm whitespace-nowrap">
              <th className="px-2 py-3 md:p-3">Loja</th>
              <th className="px-2 py-3 md:p-3 text-center">Nº Saída</th>
              <th className="px-2 py-3 md:p-3 text-right">Valor Total</th>
            </tr>
          </thead>
          <tbody className="text-system-text-primary text-xs md:text-sm">
            {dadosDoDia.map((linha: any, index: number) => (
              <tr key={index} className="border-b border-system-border-subtle hover:bg-surface-hover transition-colors">
                <td className="px-2 py-3 md:p-3 whitespace-nowrap">{linha.Loja}</td>
                <td className="px-2 py-3 md:p-3 text-center whitespace-nowrap">{linha.NumSaida}</td>
                <td className="px-2 py-3 md:p-3 text-right font-bold text-system-text-accent whitespace-nowrap">
                  {formatarMoeda(linha.ValorTotal)}
                </td>
              </tr>
            ))}
            
            {dadosDoDia.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-system-text-muted italic text-sm">
                  Nenhuma nota detalhada encontrada para este dia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};