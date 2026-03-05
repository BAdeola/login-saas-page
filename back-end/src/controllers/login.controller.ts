import type { Request, Response } from 'express';
import { LoginService } from '../services/login.service.js';
import jwt from 'jsonwebtoken';

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
        // 1. GERAR O TOKEN
        const token = jwt.sign(
          { id: usuario.id, nomusu: usuario.nomusu }, 
          process.env.JWT_SECRET || 'sua_chave_secreta_super_segura', 
          { expiresIn: '8h' }
        );

        // 2. CONFIGURAR O COOKIE (A Mágica da Segurança)
        res.cookie('token', token, {
          httpOnly: true, // Impede que scripts maliciosos (XSS) leiam o token
          secure: process.env.NODE_ENV === 'production', // Só envia via HTTPS em produção
          sameSite: 'lax', // Proteção básica contra CSRF
          maxAge: 8 * 60 * 60 * 1000 // 8 horas em milissegundos
        });

        // 3. RETORNAR SÓ OS DADOS PÚBLICOS
        // Note que NÃO enviamos mais o token no JSON!
        return res.json({ 
          sucesso: true, 
          usuario: {
            nomusu: usuario.nomusu,
            // outros dados que não sejam sensíveis
          }
        });
      }

      return res.status(401).json({ sucesso: false, erro: 'Usuário ou senha inválidos' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ sucesso: false, erro: 'Erro interno' });
    }
  }
}