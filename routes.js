import { Router } from 'express';
import * as empleadoController from './src/controllers/empleados.controller.js';


const router = Router();
router.get('/empleados', empleadoController.getEmpleados);
router.get('/empleados/team-leaders', empleadoController.getTeamLeaders);
router.get('/empleados/:id', empleadoController.getEmpleadosById);
router.post('/empleados', empleadoController.createEmpleado);
router.put('/empleados/:id',empleadoController. updateEmpleadoDepartamento);
router.delete('/empleados/:id', empleadoController.deleteEmpleado);
router.get('/departamentos/empleados/count', empleadoController.countByDepartamento);

export default router;





