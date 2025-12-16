import { pool } from "./db.js";
import { Empleado } from "../domain/Empleado.js";


export const empleadoRepository = {

findAll: async () => {
    const result = await pool.query('SELECT * FROM empleados');
    return result.rows.map(row => new Empleado(row));
  },

  findById: async (id) => {
    const result = await pool.query(
      'SELECT * FROM empleados WHERE id = $1',
      [id]
    ); 
    return result.rows[0] ? new Empleado(result.rows[0]) : null;
  },

  findTeamLeaders: async () => {
    const result = await pool.query(`
      SELECT e.id, e.nombre, e.edad, r.nombre AS rol 
      FROM empleados e 
      JOIN roles r ON e.id_roles = r.id 
      WHERE r.nombre = 'Team Leader'
    `);
    return result.rows.map(row => new Empleado(row));
  },

  createEmpleado: async (empleadoData) => {
    const { nombre, edad, id_departamento, id_roles } = empleadoData;
    const result = await pool.query(
      `INSERT INTO empleados (nombre, edad, id_departamento, id_roles) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [nombre, edad, id_departamento, id_roles]
    );
    return new Empleado(result.rows[0])
  },

  updateEmpleado: async (id, data) => {
    const result = await pool.query(
      'UPDATE empleados SET id_departamento = $1 WHERE id = $2 RETURNING *',
      [data.id_departamento, id]
    );
    return result.rows[0] ? new Empleado(result.rows[0]) : null;
  },

  deleteEmpleado: async (id) => {
    const result = await pool.query(
      'DELETE FROM empleados WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0] ? new Empleado(result.rows[0]) : null;
  },

  countByDepartamento: async (id_departamento) => {
    const result = await pool.query(
      'SELECT COUNT(*) AS cant_empleados FROM empleados WHERE id_departamento = $1',
      [id_departamento]
    );
    return parseInt(result.rows[0].cant_empleados);
  }
};