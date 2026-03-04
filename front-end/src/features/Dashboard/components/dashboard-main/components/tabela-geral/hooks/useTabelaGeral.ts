import { useState, useEffect } from 'react';
import { useDashboardStore } from '../../../../../../../store/dashboard/useDashboardStore';

interface UseTabelaGeralProps {
  onPageChange: () => void;
}

export const useTabelaGeral = ({ onPageChange }: UseTabelaGeralProps) => {
  const { 
    dadosTabela, 
    saidaSelecionada, 
    dadosItens, 
    loadingItens, 
    buscarItens 
  } = useDashboardStore();

  const [paginaAtual, setPaginaAtual] = useState(1);
  const ITENS_POR_PAGINA = 50;
  
  // === NOVO ESTADO: Guarda o índice da linha de produto selecionada ===
  const [itemSelecionado, setItemSelecionado] = useState<number | null>(null);

  useEffect(() => {
    setPaginaAtual(1);
  }, [dadosTabela]);

  // === NOVA LÓGICA: Reseta a linha selecionada se trocar de Saída ===
  useEffect(() => {
    setItemSelecionado(null);
  }, [saidaSelecionada]);

  const totalPaginas = Math.ceil(dadosTabela.length / ITENS_POR_PAGINA);
  const startIndex = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const dadosPaginados = dadosTabela.slice(startIndex, startIndex + ITENS_POR_PAGINA);

  const handleNextPage = () => {
    setPaginaAtual(prev => Math.min(prev + 1, totalPaginas));
    onPageChange();
  };

  const handlePrevPage = () => {
    setPaginaAtual(prev => Math.max(prev - 1, 1));
    onPageChange();
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  return {
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

    // === EXPORTANDO AS NOVAS VARIÁVEIS ===
    itemSelecionado,
    setItemSelecionado
  };
};