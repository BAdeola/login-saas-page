import type { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service.js';

export class DashboardController {
  
  // --- 1. BUSCA A TABELA PRINCIPAL (Acionado pelo formulário lateral) ---
  async buscarTabelaGeral(req: Request, res: Response) {
    const { loja, dataInicio, dataFim } = req.body;
    const service = new DashboardService();

    try {
      const dados = await service.buscarSaidas(loja, dataInicio, dataFim);
      return res.json({ sucesso: true, dados });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ sucesso: false, erro: 'Erro ao buscar a tabela de saídas.' });
    }
  }

  // --- 2. GERA OS GRÁFICOS (Acionado pelo botão do topo) ---
  async buscarDadosGrafico(req: Request, res: Response) {
    const { loja, dataInicio, dataFim } = req.body;
    const service = new DashboardService();

    try {
      const dadosGrafico = await service.buscarGrafico(loja, dataInicio, dataFim);
      return res.json({ sucesso: true, ...dadosGrafico });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ sucesso: false, erro: 'Erro ao gerar os dados do gráfico.' });
    }
  }

  // --- 3. BUSCA OS ITENS DA NOTA (Acionado ao clicar em uma linha da tabela) ---
  async buscarItens(req: Request, res: Response) {
    const { numsai } = req.params; 
    const service = new DashboardService();

    try {
      if (!numsai) {
        return res.status(400).json({ sucesso: false, erro: 'Número de saída não fornecido.' });
      }

      const itens = await service.buscarItens(Number(numsai));
      return res.json({ sucesso: true, dados: itens });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ sucesso: false, erro: 'Erro ao buscar os itens da saída.' });
    }
  }
}