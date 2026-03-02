import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller.js';

const dashboardRoutes = Router();
const dashboardController = new DashboardController();

dashboardRoutes.post('/analise', (req, res) => dashboardController.handle(req, res));

export { dashboardRoutes };