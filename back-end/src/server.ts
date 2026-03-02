import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Importa apenas o arquivo Hub (o Node/TS automaticamente procura o index.ts dentro da pasta)
import { router } from './routes/index.js';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

// Todas as rotas agora ficarão em http://localhost:3333/api/...
app.use('/api', router);

app.listen(port, () => {
  console.log(`🔥 Servidor SOLID rodando em http://localhost:${port}`);
});