import { pool } from '../db.js';


export const countEmpleadosByDepartamento = async (req, res,next) => {
  try {
     const { id_departamento } = req.query;
      if (!id_departamento) {
      return res.status(400).json({ error:"faltan los parametros requeridos" });
    }
    const result = await pool.query(`SELECT COUNT(*) AS cant_empleados FROM empleados WHERE id_departamento = $1`,
      [id_departamento]
    );
    res.json(result.rows);
  } catch (error) {
      next(error);
  }
};
