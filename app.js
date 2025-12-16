import express from 'express';
import router from './routes.js';
import errorHandler from './src/middlewares/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandler);

export default app;
