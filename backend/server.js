import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import medicosRoutes from './routes/medicosRoutes.js';
import pacientesRoutes from './routes/pacientesRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/medicos', medicosRoutes);
app.use('/api/pacientes', pacientesRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API da Clínica Médica' });
});

// Middleware de erro
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});