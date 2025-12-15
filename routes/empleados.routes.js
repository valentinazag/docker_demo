import { Router } from 'express';
import {
  getEmpleados,
  getTeamLeaders,
  createEmpleado,
  updateEmpleadoDepartamento,
  deleteEmpleado
} from '../controllers/empleados.controller.js';

const router = Router();

router.get('/', getEmpleados);
router.get('/team-leaders', getTeamLeaders);
router.post('/', createEmpleado);
router.put('/:id', updateEmpleadoDepartamento);
router.delete('/:id', deleteEmpleado);

export default router;