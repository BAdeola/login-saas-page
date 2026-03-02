import React from 'react';
import { useAnaliseAnalitica } from './hooks/useAnaliseAnalitica';

interface Props {
  onPageChange: () => void;
}

export const AnaliseAnalitica: React.FC<Props> = ({ onPageChange }) => {
  const {
    dadosAnaliticos,
    dadosPaginados,
    paginaAtual,
    totalPaginas,
    startIndex,
    ITENS_POR_PAGINA,
    handleNextPage,
    handlePrevPage,
    formatarMoeda
  } = useAnaliseAnalitica({ onPageChange });

  return (
    <div className="flex flex-col gap-4 relative">
      {/* CONTAINER DA TABELA */}
      <div className="w-full bg-surface-primary border border-system-border-default rounded-3xl p-6 md:p-8 overflow-hidden backdrop-blur-xl flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-system-text-primary text-lg font-bold uppercase">Detalhamento Analítico</h4>
          <span className="text-system-text-secondary text-sm font-medium bg-surface-secondary px-3 py-1 rounded-lg border border-system-border-subtle">
            Total: {dadosAnaliticos.length} registros
          </span>
        </div>
        
        <div className="w-full overflow-x-auto custom-scrollbar pb-2 flex-1">
          <table className="w-full min-w-200 text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-system-border-default text-system-text-secondary text-sm whitespace-nowrap">
                <th className="p-3 w-[15%]">Loja</th>
                <th className="p-3 w-[12%]">Nº Saída</th>
                <th className="p-3 w-[12%]">Data</th>
                <th className="p-3 w-[25%]">Produto</th>
                <th className="p-3 w-[8%]">Unid.</th>
                <th className="p-3 w-[8%]">Qtd</th>
                <th className="p-3 w-[10%]">Vlr. Unitário</th>
                <th className="p-3 w-[10%] text-right">Vlr. Total</th>
              </tr>
            </thead>
            <tbody className="text-system-text-primary text-sm">
              {dadosPaginados.map((linha, index) => (
                <tr key={index} className="border-b border-system-border-subtle hover:bg-surface-hover transition-colors whitespace-nowrap">
                  <td className="p-3 truncate">{linha.Loja}</td>
                  <td className="p-3">{linha.NumSaida}</td>
                  <td className="p-3">{new Date(linha.Data).toLocaleDateString('pt-BR')}</td>
                  <td className="p-3 truncate" title={linha.Produto}>{linha.Produto}</td>
                  <td className="p-3">{linha.Unidade}</td>
                  <td className="p-3">{linha.Quantidade}</td>
                  <td className="p-3">{formatarMoeda(linha.ValorUnitario)}</td>
                  <td className="p-3 text-right font-bold text-system-text-accent">{formatarMoeda(linha.ValorTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {dadosAnaliticos.length === 0 && (
            <div className="text-center py-10 text-system-text-muted italic">
              Nenhum registro encontrado neste período.
            </div>
          )}
        </div>
      </div>

      {/* PAGINAÇÃO FLUTUANTE (ILHA) */}
      {totalPaginas > 1 && (
        <div className="sticky bottom-4 z-20 w-[95%] md:w-[90%] mx-auto flex items-center justify-center md:justify-between bg-surface-primary border border-brand/30 backdrop-blur-xl rounded-2xl p-3 md:p-4 shadow-2xl">
  
          {/* TEXTO: Escondido no Mobile, visível no Desktop */}
          <p className="text-sm text-system-text-secondary hidden md:block">
            Mostrando <span className="text-brand font-bold">{startIndex + 1}</span> até <span className="text-brand font-bold">
              {Math.min(startIndex + ITENS_POR_PAGINA, dadosAnaliticos.length)}
            </span> de <span className="font-bold">{dadosAnaliticos.length}</span> registros
          </p>
          
          {/* CONTROLES: Ajustados para não quebrar no celular */}
          <div className="flex items-center justify-between w-full md:w-auto gap-2 md:gap-3">
            
            <button 
              onClick={handlePrevPage} 
              /* flex-1 no mobile para preencher o espaço, padding menor, texto em linha única */
              className="flex-1 md:flex-none px-3 md:px-5 py-2.5 bg-brand-fade hover:bg-brand-hover text-brand rounded-xl font-bold transition-all text-sm md:text-base whitespace-nowrap"
            >
              Anterior
            </button>
            
            <span className="bg-surface-tertiary text-system-text-primary px-4 py-2.5 rounded-lg font-bold text-sm md:text-base whitespace-nowrap shrink-0">
              {paginaAtual} / {totalPaginas}
            </span>

            <button 
              onClick={handleNextPage} 
              className="flex-1 md:flex-none px-3 md:px-5 py-2.5 bg-brand-fade hover:bg-brand-hover text-brand rounded-xl font-bold transition-all text-sm md:text-base whitespace-nowrap"
            >
              Próxima
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};