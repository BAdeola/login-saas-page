import React from 'react';
import { useTabelaGeral } from './hooks/useTabelaGeral';

interface Props {
  onPageChange: () => void;
}

export const TabelaGeral: React.FC<Props> = ({ onPageChange }) => {
  const {
    dadosTabela,
    dadosPaginados,
    paginaAtual,
    totalPaginas,
    startIndex,
    ITENS_POR_PAGINA,
    handleNextPage,
    handlePrevPage,
    formatarMoeda,
    saidaSelecionada,
    dadosItens,
    loadingItens,
    buscarItens,
    itemSelecionado,
    setItemSelecionado
  } = useTabelaGeral({ onPageChange });

  const valorTotalPeriodo = dadosTabela.length > 0 ? (dadosTabela[0] as any).ValorGeral : 0;

  return (
    <div className="flex flex-col gap-4 relative">
      
      <div className="w-full bg-surface-primary border border-system-border-default rounded-3xl p-4 md:p-8 overflow-hidden backdrop-blur-xl flex flex-col shadow-sm">
        
        {/* CABEÇALHO OTIMIZADO PARA MOBILE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-system-border-subtle pb-4 gap-3">
          <h4 className="text-system-text-primary text-sm md:text-lg font-bold uppercase tracking-tight">
            Relatório Detalhado de Saídas
          </h4>
          
          {/* Container de resumo: Alinhado à esquerda no mobile, direita no desktop */}
          <div className="flex flex-col items-start md:items-end gap-1.5 w-full md:w-auto">
            <span className="text-system-text-secondary text-[10px] md:text-xs font-medium bg-surface-secondary px-2 py-0.5 md:px-3 md:py-1 rounded-lg border border-system-border-subtle">
              Página {paginaAtual} de {totalPaginas}
            </span>
            
            {/* Dados do período com fontes responsivas */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] md:text-xs font-semibold text-system-text-muted">
              <span>{dadosTabela.length} saídas encontradas</span>
              <span className="hidden md:block w-1 h-1 bg-system-text-muted/30 rounded-full"></span>
              <span className="text-brand font-bold text-xs md:text-base">
                Total: {formatarMoeda(valorTotalPeriodo)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="w-full overflow-x-auto custom-scrollbar pb-2 flex-1">
          <table className="w-full min-w-125 md:min-w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-system-border-default text-system-text-primary font-bold uppercase tracking-wider text-[10px] md:text-sm whitespace-nowrap">
                <th className="px-2 py-3 md:p-3 w-[8%] md:w-[5%]"></th> 
                <th className="px-2 py-3 md:p-3 w-[28%] md:w-[25%]">Loja</th>
                <th className="px-2 py-3 md:p-3 w-[22%] md:w-[20%]">Nº Saída</th>
                <th className="px-2 py-3 md:p-3 w-[20%]">Data</th>
                <th className="px-2 py-3 md:p-3 w-[22%] md:w-[30%] text-right">Valor Total</th>
              </tr>
            </thead>
            <tbody className="text-system-text-primary text-[11px] md:text-sm">
              {dadosPaginados.map((linha, index) => {
                const isExpanded = saidaSelecionada === linha.NumSaida;

                return (
                  <React.Fragment key={index}>
                    <tr 
                      onClick={() => buscarItens(linha.NumSaida)}
                      className={`border-b border-system-border-subtle hover:bg-surface-hover transition-colors whitespace-nowrap cursor-pointer ${isExpanded ? 'bg-surface-secondary' : ''}`}
                    >
                      <td className="px-2 py-3 md:p-3">
                        <svg className={`w-3.5 h-3.5 md:w-5 md:h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </td>
                      <td className="px-2 py-3 md:p-3 truncate">{linha.Loja}</td>
                      <td className="px-2 py-3 md:p-3 font-bold">{linha.NumSaida}</td>
                      <td className="px-2 py-3 md:p-3">{new Date(linha.Data).toLocaleDateString('pt-BR')}</td>
                      <td className="px-2 py-3 md:p-3 text-right font-bold text-system-text-accent">{formatarMoeda(linha.ValorTotal)}</td>
                    </tr>

                    {isExpanded && (
                      <tr>
                        <td colSpan={5} className="p-0 border-b border-system-border-default">
                          <div className="bg-surface-tertiary p-3 md:p-6 shadow-inner rounded-b-xl border-x border-system-border-subtle overflow-x-auto custom-scrollbar">
                            {loadingItens ? (
                              <div className="text-center py-6 text-brand font-medium animate-pulse text-xs md:text-sm">Carregando produtos...</div>
                            ) : (
                              <table className="w-full min-w-112.5 md:min-w-full text-left border-collapse bg-surface-primary rounded-lg overflow-hidden">
                                <thead>
                                  <tr className="bg-surface-secondary text-system-text-primary font-bold text-[9px] md:text-xs uppercase tracking-wider">
                                    <th className="px-2 py-2 md:p-3 rounded-tl-lg w-[45%] md:w-[50%]">Produto (Unid.)</th>
                                    <th className="px-2 py-2 md:p-3 text-right w-[15%] md:w-[10%]">Qtd.</th>
                                    <th className="px-2 py-2 md:p-3 text-right w-[20%]">Vlr. Unitário</th>
                                    <th className="px-2 py-2 md:p-3 text-right rounded-tr-lg w-[20%]">Total Item</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {dadosItens.map((item, idx) => {
                                    const isRowSelected = itemSelecionado === idx;
                                    return (
                                      <tr 
                                        key={idx} 
                                        onClick={() => setItemSelecionado(idx)}
                                        className={`border-t border-system-border-subtle transition-all ${isRowSelected ? 'bg-brand-fade shadow-inner font-bold' : 'hover:bg-surface-hover'}`}
                                      >
                                        <td className={`px-2 py-2 md:p-3 text-[10px] md:text-sm whitespace-nowrap ${isRowSelected ? 'text-brand' : ''}`}>
                                          {item.Produto} <span className="text-system-text-muted ml-0.5 font-normal">({item.Unidade})</span>
                                        </td>
                                        <td className="px-2 py-2 md:p-3 text-right">{item.Quantidade}</td>
                                        <td className="px-2 py-2 md:p-3 text-right">{formatarMoeda(item.ValorUnitario)}</td>
                                        <td className="px-2 py-2 md:p-3 text-right text-system-text-accent">{formatarMoeda(item.ValorTotal)}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINAÇÃO */}
      {totalPaginas > 1 && (
        <div className="sticky bottom-4 z-20 w-full md:w-[90%] mx-auto flex items-center justify-center md:justify-between bg-surface-primary border border-brand/30 backdrop-blur-xl rounded-2xl p-2 md:p-4 shadow-2xl">
          <p className="text-xs text-system-text-secondary hidden md:block">
            Mostrando <span className="text-brand font-bold">{startIndex + 1}</span>-
            <span className="text-brand font-bold">{Math.min(startIndex + ITENS_POR_PAGINA, dadosTabela.length)}</span>
          </p>
          <div className="flex items-center justify-between w-full md:w-auto gap-2 md:gap-3">
            <button onClick={handlePrevPage} disabled={paginaAtual === 1} className="flex-1 px-3 md:px-5 py-2 bg-brand-fade hover:bg-brand-hover disabled:opacity-30 text-brand rounded-xl font-bold transition-all text-xs md:text-sm">
              Anterior
            </button>
            <span className="bg-surface-tertiary text-system-text-primary px-3 md:px-4 py-2 rounded-lg font-bold text-xs md:text-sm whitespace-nowrap">
              {paginaAtual} / {totalPaginas}
            </span>
            <button onClick={handleNextPage} disabled={paginaAtual === totalPaginas} className="flex-1 px-3 md:px-5 py-2 bg-brand-fade hover:bg-brand-hover disabled:opacity-30 text-brand rounded-xl font-bold transition-all text-xs md:text-sm">
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};