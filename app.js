import express from 'express';
import empleadosRoutes from './routes/empleados.routes.js';
import departamentosRoutes from './routes/departamentos.routes.js';
import errorHandler from './middleware/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/empleados', empleadosRoutes);
app.use('/departamentos', departamentosRoutes);

app.use(errorHandler);

export default app;
