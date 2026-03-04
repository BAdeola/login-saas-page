import React from 'react';
import { useTabelaGeral } from './hooks/useTabelaGeral'; // Atualize o import se necessário

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

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="w-full bg-surface-primary border border-system-border-default rounded-3xl p-4 md:p-8 overflow-hidden backdrop-blur-xl flex flex-col">
        
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-system-text-primary text-base md:text-lg font-bold uppercase">Relatório de Saídas</h4>
          <span className="text-system-text-secondary text-xs md:text-sm font-medium bg-surface-secondary px-3 py-1 rounded-lg border border-system-border-subtle">
            Total: {dadosTabela.length} saídas
          </span>
        </div>
        
        <div className="w-full overflow-x-auto custom-scrollbar pb-2 flex-1">
          {/* Ajuste do min-w para permitir que a tabela encolha mais no mobile */}
          <table className="w-full min-w-125 md:min-w-full text-left border-collapse table-fixed">
            <thead>
              {/* Fonte levemente menor no mobile (text-xs) */}
              <tr className="border-b border-system-border-default text-system-text-primary font-bold uppercase tracking-wider text-xs md:text-sm whitespace-nowrap">
                {/* Paddings responsivos: px-2 no mobile, p-3 no desktop */}
                <th className="px-2 py-3 md:p-3 w-[8%] md:w-[5%]"></th> 
                <th className="px-2 py-3 md:p-3 w-[28%] md:w-[25%]">Loja</th>
                <th className="px-2 py-3 md:p-3 w-[22%] md:w-[20%]">Nº Saída</th>
                <th className="px-2 py-3 md:p-3 w-[20%]">Data</th>
                <th className="px-2 py-3 md:p-3 w-[22%] md:w-[30%] text-right">Valor Total</th>
              </tr>
            </thead>
            <tbody className="text-system-text-primary text-xs md:text-sm">
              {dadosPaginados.map((linha, index) => {
                const isExpanded = saidaSelecionada === linha.NumSaida;

                return (
                  <React.Fragment key={index}>
                    {/* LINHA PRINCIPAL (MESTRE) */}
                    <tr 
                      onClick={() => buscarItens(linha.NumSaida)}
                      className={`border-b border-system-border-subtle hover:bg-surface-hover transition-colors whitespace-nowrap cursor-pointer ${isExpanded ? 'bg-surface-secondary' : ''}`}
                    >
                      <td className="px-2 py-3 md:p-3 whitespace-nowrap">
                        <svg className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </td>
                      <td className="px-2 py-3 md:p-3 truncate">{linha.Loja}</td>
                      <td className="px-2 py-3 md:p-3 font-bold">{linha.NumSaida}</td>
                      <td className="px-2 py-3 md:p-3">{new Date(linha.Data).toLocaleDateString('pt-BR')}</td>
                      <td className="px-2 py-3 md:p-3 text-right font-bold text-system-text-accent">{formatarMoeda(linha.ValorTotal)}</td>
                    </tr>

                    {/* SUB-TABELA (DETALHE) */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={5} className="p-0 border-b border-system-border-default">
                          {/* Menos espaçamento interno no celular (p-3 em vez de p-4) */}
                          <div className="bg-surface-tertiary p-3 md:p-6 shadow-inner rounded-b-xl border-x border-system-border-subtle overflow-x-auto custom-scrollbar">
                            
                            {loadingItens ? (
                              <div className="text-center py-6 text-brand font-medium animate-pulse text-sm">
                                Carregando produtos...
                              </div>
                            ) : dadosItens.length === 0 ? (
                              <div className="text-center py-6 text-system-text-muted italic text-sm">
                                Nenhum produto encontrado nesta saída.
                              </div>
                            ) : (
                              <table className="w-full min-w-112.5 md:min-w-full text-left border-collapse bg-surface-primary rounded-lg overflow-hidden">
                                <thead>
                                  <tr className="bg-surface-secondary text-system-text-primary font-bold text-[10px] md:text-xs uppercase tracking-wider">
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
                                        className={`border-t border-system-border-subtle transition-all 
                                          ${isRowSelected 
                                            ? 'bg-brand-fade shadow-inner' 
                                            : 'hover:bg-surface-hover'
                                          }
                                        `}
                                      >
                                        {/* Adicionamos um font-medium no produto quando ele está selecionado */}
                                        <td className={`px-2 py-2 md:p-3 text-xs md:text-sm whitespace-nowrap transition-colors ${isRowSelected ? 'font-bold text-brand' : ''}`}>
                                          {item.Produto} <span className="text-system-text-muted ml-1 font-normal">({item.Unidade})</span>
                                        </td>
                                        
                                        <td className="px-2 py-2 md:p-3 text-xs md:text-sm text-right whitespace-nowrap">{item.Quantidade}</td>
                                        <td className="px-2 py-2 md:p-3 text-xs md:text-sm text-right whitespace-nowrap">{formatarMoeda(item.ValorUnitario)}</td>
                                        <td className="px-2 py-2 md:p-3 text-xs md:text-sm text-right font-medium text-system-text-accent whitespace-nowrap">{formatarMoeda(item.ValorTotal)}</td>
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
          
          {dadosTabela.length === 0 && (
            <div className="text-center py-10 text-system-text-muted italic">
              Nenhuma saída encontrada neste período.
            </div>
          )}
        </div>
      </div>

      {/* PAGINAÇÃO FLUTUANTE */}
      {totalPaginas > 1 && (
        <div className="sticky bottom-4 z-20 w-[95%] md:w-[90%] mx-auto flex items-center justify-center md:justify-between bg-surface-primary border border-brand/30 backdrop-blur-xl rounded-2xl p-3 md:p-4 shadow-2xl">
          <p className="text-sm text-system-text-secondary hidden md:block">
            Mostrando <span className="text-brand font-bold">{startIndex + 1}</span> até <span className="text-brand font-bold">
              {Math.min(startIndex + ITENS_POR_PAGINA, dadosTabela.length)}
            </span> de <span className="font-bold">{dadosTabela.length}</span> registros
          </p>
          <div className="flex items-center justify-between w-full md:w-auto gap-2 md:gap-3">
            <button onClick={handlePrevPage} className="flex-1 md:flex-none px-3 md:px-5 py-2.5 bg-brand-fade hover:bg-brand-hover text-brand rounded-xl font-bold transition-all text-sm md:text-base whitespace-nowrap">
              Anterior
            </button>
            <span className="bg-surface-tertiary text-system-text-primary px-4 py-2.5 rounded-lg font-bold text-sm md:text-base whitespace-nowrap shrink-0">
              {paginaAtual} / {totalPaginas}
            </span>
            <button onClick={handleNextPage} className="flex-1 md:flex-none px-3 md:px-5 py-2.5 bg-brand-fade hover:bg-brand-hover text-brand rounded-xl font-bold transition-all text-sm md:text-base whitespace-nowrap">
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};