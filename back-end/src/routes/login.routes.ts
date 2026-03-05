import { Router } from 'express';
import { LoginController } from '../controllers/login.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const loginRoutes = Router();
const loginController = new LoginController();

// 1. A rota de Login continua aqui, mas o Controller agora envia Cookie
loginRoutes.post('/login', (req, res) => loginController.handle(req, res));

// 2. NOVA: Rota de Logout (limpa o cookie)
loginRoutes.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ sucesso: true });
});

// 3. NOVA: Rota para o Front-end saber quem está logado
loginRoutes.get('/me', authMiddleware, (req, res) => {
  return res.json({ sucesso: true, usuario: req.user });
});

export { loginRoutes };