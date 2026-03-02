import type { Request, Response } from 'express';
import { LoginService } from '../services/login.service.js';

export class LoginController {
  async handle(req: Request, res: Response) {
    const { apelid, senha } = req.body;

    if (!apelid || !senha) {
      return res.status(400).json({ sucesso: false, erro: 'Dados incompletos' });
    }

    const loginService = new LoginService();
    
    try {
      const usuario = await loginService.executar(apelid, senha);

      if (usuario) {
        return res.json({ sucesso: true, usuario });
      }

      return res.status(401).json({ sucesso: false, erro: 'Usuário ou senha inválidos' });
    } catch (error) {
      return res.status(500).json({ sucesso: false, erro: 'Erro interno' });
    }
  }
}