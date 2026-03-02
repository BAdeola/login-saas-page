import type { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service.js';

export class DashboardController {
  async handle(req: Request, res: Response) {
    const { loja, dataInicio, dataFim, tipoAnalise } = req.body;
    const service = new DashboardService();

    try {
      if (tipoAnalise === 'analitico') {
        const dados = await service.buscarAnalitico(loja, dataInicio, dataFim);
        return res.json({ sucesso: true, dados });
      } else {
        const dadosSinteticos = await service.buscarSintetico(loja, dataInicio, dataFim);
        return res.json({ sucesso: true, ...dadosSinteticos });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ sucesso: false, erro: 'Erro ao processar análise.' });
    }
  }
}