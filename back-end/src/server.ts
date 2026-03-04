import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './routes/index.js';

const app = express(); // 1. Primeiro definimos o app
const port = process.env.PORT || 3333;

// 2. Definimos as origens permitidas baseadas no seu .env
const allowedOrigins = [
  process.env.FRONTEND_URL_HTTPS,
  process.env.FRONTEND_URL_HTTP
];

// 3. Configuramos o CORS antes das rotas
app.use(cors({
  origin: function (origin, callback) {
    // Permite se for uma das nossas URLs ou se não houver origin (ex: ferramentas de teste)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado pelo CORS do OrangeSystems'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

app.use(express.json()); // 4. Essencial para ler o corpo (body) das requisições POST

// 5. Definimos o prefixo das rotas
app.use('/api', router);

app.listen(port, () => {
  console.log(`🔥 Servidor SOLID rodando em http://localhost:${port}`);
});