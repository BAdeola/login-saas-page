import type { Request, Response } from 'express';
import { LoginService } from '../services/login.service.js';
import jwt from 'jsonwebtoken'; // 1. Importe o JWT

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
        // 2. GERAR O TOKEN (Segurança Bem Feita)
        // O secret 'sua_chave_secreta_aqui' deve estar no seu arquivo .env
        const token = jwt.sign(
          { nomusu: usuario.nomusu }, 
          process.env.JWT_SECRET || 'sua_chave_secreta_super_segura', 
          { expiresIn: '8h' } // O token vale por 8 horas
        );

        // 3. RETORNAR O TOKEN NA RESPOSTA
        return res.json({ 
          sucesso: true, 
          usuario, 
          token // Enviando o token que o Front-end está esperando!
        });
      }

      return res.status(401).json({ sucesso: false, erro: 'Usuário ou senha inválidos' });
    } catch (error) {
      return res.status(500).json({ sucesso: false, erro: 'Erro interno' });
    }
  }
}