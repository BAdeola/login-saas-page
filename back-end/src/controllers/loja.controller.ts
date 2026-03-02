import type { Request, Response } from 'express';
import { LojaService } from '../services/loja.service.js';

export class LojaController {
  async handle(req: Request, res: Response) {
    const service = new LojaService();

    try {
      const lojas = await service.buscarTodas();
      return res.status(200).json({ sucesso: true, lojas });
    } catch (error) {
      console.error('Erro ao buscar lojas:', error);
      return res.status(500).json({ sucesso: false, erro: 'Erro ao buscar lista de lojas.' });
    }
  }
}