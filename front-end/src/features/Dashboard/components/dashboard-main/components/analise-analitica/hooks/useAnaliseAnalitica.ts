import { useState, useEffect } from 'react';
import { useDashboardStore } from '../../../../../../../store/dashboard/useDashboardStore';

interface UseAnaliseAnaliticaProps {
  onPageChange: () => void;
}

export const useAnaliseAnalitica = ({ onPageChange }: UseAnaliseAnaliticaProps) => {
  const { dadosAnaliticos } = useDashboardStore();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const ITENS_POR_PAGINA = 50;

  // Reseta para a primeira página sempre que novos dados chegam
  useEffect(() => {
    setPaginaAtual(1);
  }, [dadosAnaliticos]);

  const totalPaginas = Math.ceil(dadosAnaliticos.length / ITENS_POR_PAGINA);
  const startIndex = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const dadosPaginados = dadosAnaliticos.slice(startIndex, startIndex + ITENS_POR_PAGINA);

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
    dadosAnaliticos,
    dadosPaginados,
    paginaAtual,
    totalPaginas,
    startIndex,
    ITENS_POR_PAGINA,
    handleNextPage,
    handlePrevPage,
    formatarMoeda
  };
};