import { useDashboardStore } from '../../../../../../../store/dashboard/useDashboardStore';

export const useAnaliseSintetica = () => {
  const { dadosSinteticos } = useDashboardStore();

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(valor);
  };

  return {
    dadosSinteticos,
    formatarMoeda
  };
};