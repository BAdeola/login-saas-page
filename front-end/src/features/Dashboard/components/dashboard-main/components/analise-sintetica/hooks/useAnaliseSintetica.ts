import { useState } from 'react';
import { useDashboardStore } from '../../../../../../../store/dashboard/useDashboardStore';

export const useAnaliseSintetica = () => {
  // 1. Puxamos o dadosTabela que já tem todas as notas carregadas na memória
  const { dadosGrafico, dadosTabela } = useDashboardStore();
  
  // 2. Estado para guardar o dia que o usuário clicou no gráfico
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(valor);
  };

  const totalValorTabela = dadosGrafico && dadosGrafico.tipo === 'PIZZA_GERAL'
    ? dadosGrafico.dados.reduce((soma: number, item: any) => soma + item.ValorTotal, 0)
    : 0;

  // 3. Função ativada ao clicar na bolinha (ActiveDot) do gráfico
  const handleDotClick = (dataClicada: string) => {
    setDataSelecionada(prev => prev === dataClicada ? null : dataClicada);
  };

  // 4. Filtra a tabela geral para mostrar apenas as saídas daquele dia exato
  const dadosDoDia = dataSelecionada
    ? dadosTabela.filter((item) => {
        const dataItem = new Date(item.Data).toLocaleDateString('pt-BR');
        const dataFiltro = new Date(dataSelecionada).toLocaleDateString('pt-BR');
        return dataItem === dataFiltro;
      })
    : [];

  return {
    dadosGrafico,
    formatarMoeda,
    totalValorTabela,
    dataSelecionada,
    dadosDoDia,
    handleDotClick
  };
};