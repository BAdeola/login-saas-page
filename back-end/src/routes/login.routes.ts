import { Router } from 'express';
import { LoginController } from '../controllers/login.controller.js'; // Ajuste o nome conforme seu arquivo

const loginRoutes = Router();
const loginController = new LoginController();

// A rota fica na raiz do arquivo, o prefixo '/api' virá depois
loginRoutes.post('/login', (req, res) => loginController.handle(req, res));

export { loginRoutes };