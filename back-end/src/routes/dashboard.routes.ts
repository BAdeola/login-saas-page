import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller.js';

const dashboardRoutes = Router();
const dashboardController = new DashboardController();

// 1. TABELA PRINCIPAL: Acionado quando clica no botão "Gerar Análise" do menu lateral
dashboardRoutes.post('/analise/tabela', (req, res) => dashboardController.buscarTabelaGeral(req, res));

// 2. GRÁFICOS: Acionado pelo novo botão "Ver Gráficos" que ficará no topo da tela
dashboardRoutes.post('/analise/grafico', (req, res) => dashboardController.buscarDadosGrafico(req, res));

// 3. DETALHES DA NOTA: Acionado ao clicar em uma linha específica da tabela
// Usa GET aqui e passa o :numsai direto na URL (Padrão RESTful)
dashboardRoutes.get('/analise/:numsai/itens', (req, res) => dashboardController.buscarItens(req, res));

export { dashboardRoutes };