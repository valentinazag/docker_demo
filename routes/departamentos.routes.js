import { Router } from 'express';
import { countEmpleadosByDepartamento } from '../controllers/departamentos.controller.js';

const router = Router();

router.get('/empleados/count', countEmpleadosByDepartamento);

export default router;
