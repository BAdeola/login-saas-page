import { Router } from 'express';
import { loginRoutes } from './login.routes.js';
import { dashboardRoutes } from './dashboard.routes.js';
import { lojaRoutes } from './loja.routes.js'; // <-- Nova importação

const router = Router();

router.use(loginRoutes);
router.use(dashboardRoutes);
router.use(lojaRoutes); // <-- Injetando as rotas de loja no sistema

export { router };