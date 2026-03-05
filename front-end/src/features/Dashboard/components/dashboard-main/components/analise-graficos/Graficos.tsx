import React, { useState, useEffect } from 'react';
import { useAnaliseSintetica } from './hooks/useAnaliseGraficos';
import { type GraficosProps } from './interfaces';

// Importando os componentes refatorados
import { GraficoPizza } from './components/GraficoPizza';
import { TabelaPizza } from './components/TabelaPizza';
import { GraficoLinha } from './components/GraficoLinha';
import { TabelaLinha } from './components/TabelaLinha';

export const Graficos: React.FC<GraficosProps> = ({ isSidebarAnimating }) => {
  const { 
    dadosGrafico, 
    formatarMoeda,
    dataSelecionada,
    dadosDoDia,
    handleDotClick
  } = useAnaliseSintetica();

  // Sensor para detectar se a tela é Mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Confere o tamanho inicial ao abrir
    setIsMobile(window.innerWidth < 768);

    // Fica escutando se a tela for redimensionada ou o celular deitar
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!dadosGrafico || !dadosGrafico.dados) return null;

  return (
    <div className="grid grid-cols-1 gap-6">
      
      {/* =========================================
          GRÁFICO 1: PIZZA E RESUMO (TODAS AS LOJAS) 
          ========================================= */}
      {dadosGrafico.tipo === 'PIZZA_GERAL' && (
        <>
          <GraficoPizza 
            dados={dadosGrafico.dados} 
            formatarMoeda={formatarMoeda} 
            isMobile={isMobile} 
            isSidebarAnimating={isSidebarAnimating} 
          />
          <TabelaPizza 
            dados={dadosGrafico.dados} 
            formatarMoeda={formatarMoeda} 
          />
        </>
      )}

      {/* =========================================
          GRÁFICO 2: LINHA (APENAS 1 LOJA SELECIONADA)
          ========================================= */}
      {dadosGrafico.tipo === 'LINHA_LOJA' && (
        <div className="bg-surface-primary border border-system-border-default rounded-3xl p-4 md:p-6 shadow-xl overflow-hidden flex flex-col transition-all">
          
          <GraficoLinha 
            dados={dadosGrafico.dados} 
            formatarMoeda={formatarMoeda} 
            isSidebarAnimating={isSidebarAnimating} 
            handleDotClick={handleDotClick} 
          />

          {dataSelecionada && (
            <TabelaLinha 
              dataSelecionada={dataSelecionada} 
              dadosDoDia={dadosDoDia} 
              formatarMoeda={formatarMoeda} 
            />
          )}
        </div>
      )}
    </div>
  );
};