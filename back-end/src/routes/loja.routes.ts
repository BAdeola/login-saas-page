import { Router } from 'express';
import { LojaController } from '../controllers/loja.controller.js';

const lojaRoutes = Router();
const lojaController = new LojaController();

// A rota ficará acessível em GET /api/lojas
lojaRoutes.get('/lojas', (req, res) => lojaController.handle(req, res));

export { lojaRoutes };