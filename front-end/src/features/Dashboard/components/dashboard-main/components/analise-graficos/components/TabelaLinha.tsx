import React from 'react';

interface TabelaLinhaProps {
  dataSelecionada: string;
  dadosDoDia: any[];
  formatarMoeda: (valor: number) => string;
}

export const TabelaLinha: React.FC<TabelaLinhaProps> = ({ dataSelecionada, dadosDoDia, formatarMoeda }) => {
  // Soma o valor total do dia selecionado
  const totalDoDia = dadosDoDia.reduce((acc, curr) => acc + curr.ValorTotal, 0);

  return (
    <div className="mt-6 pt-6 border-t border-system-border-subtle animate-fade-in">
      
      {/* CABEÇALHO COM INFO SINGELA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <h5 className="text-system-text-primary font-bold uppercase text-xs md:text-base">
          Saídas do dia <span className="text-brand">{new Date(dataSelecionada).toLocaleDateString('pt-BR')}</span>
        </h5>
        
        <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-1 w-full md:w-auto">
          <span className="text-[10px] md:text-xs font-medium bg-surface-secondary text-system-text-secondary px-2 py-1 rounded-lg border border-system-border-subtle whitespace-nowrap">
            {dadosDoDia.length} notas
          </span>
          <span className="text-brand font-bold text-xs md:text-sm whitespace-nowrap">
            Total Geral: {formatarMoeda(totalDoDia)}
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto custom-scrollbar pb-2">
        <table className="w-full min-w-full md:min-w-125 text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b border-system-border-default text-system-text-primary font-bold tracking-wider text-[10px] md:text-sm uppercase whitespace-nowrap">
              <th className="px-2 py-3 md:p-3 w-[40%]">Loja</th>
              <th className="px-2 py-3 md:p-3 text-center w-[25%]">Nº Saída</th>
              <th className="px-2 py-3 md:p-3 text-right w-[35%]">Valor Total</th>
            </tr>
          </thead>
          <tbody className="text-system-text-primary text-[11px] md:text-sm">
            {dadosDoDia.map((linha, index) => (
              <tr key={index} className="border-b border-system-border-subtle hover:bg-surface-hover transition-colors">
                <td className="px-2 py-3 md:p-3 truncate">{linha.Loja}</td>
                <td className="px-2 py-3 md:p-3 text-center font-medium">{linha.NumSaida}</td>
                <td className="px-2 py-3 md:p-3 text-right font-bold text-system-text-accent">
                  {formatarMoeda(linha.ValorTotal)}
                </td>
              </tr>
            ))}
            
            {dadosDoDia.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-8 text-system-text-muted italic text-xs md:text-sm">
                  Nenhuma nota detalhada encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};