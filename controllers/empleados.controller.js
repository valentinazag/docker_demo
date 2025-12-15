import { pool } from '../db.js';

export const getEmpleados = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM empleados');
    res.json(result.rows);
  } catch (error) {
   next(error);
  }
};

export const getTeamLeaders =  async (req, res,next) => {
  try {
    const result = await pool.query('SELECT e.id, e.nombre, e.edad, r.nombre AS rol FROM empleados e JOIN roles r ON e.id_roles = r.id WHERE r.nombre = \'Team Leader\'');
    res.json(result.rows);
  } catch (error) {
      next(error);
  }
};

export const createEmpleado = async (req, res, next) => {
  try {
    const {nombre,edad,id_departamento,id_roles} = req.body;
      if (!nombre ||!edad|| !id_departamento||!id_roles) {
      return res.status(400).json({ error:"faltan los parametros requeridos" });
    }
    const result = await pool.query(
      `INSERT INTO empleados (nombre, edad, id_departamento, id_roles) VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, edad, id_departamento, id_roles]
    );
    res.json(result.rows);
  }  catch (error) {
      next(error);
  }
};


export const updateEmpleadoDepartamento =  async (req, res,next) => {
  const {id} = req.params;
  const {id_departamento}=req.body;
 if (!id ||!id_departamento) {
      return res.status(400).json({ error:"faltan los parametros requeridos" });
    }
  try {
    const result = await pool.query("UPDATE empleados SET id_departamento = $1 WHERE id = $2 RETURNING *",
      [id_departamento, id]);
    
    if(result.rows.length === 0){
      return res.status(404).json({error: "no se encontro el empleado"})
    }
    res.json(result.rows);
  }  catch (error) {
      next(error);
  }
};

export const deleteEmpleado = async(req,res,next)=>{
  const {id} = req.params;
  if(!id){
     return res.status(400).json({ error:"faltan los parametros requeridos" });
  }
  try{
    const result = await pool.query("DELETE FROM empleados WHERE id = $1 RETURNING *", [id]);
    
    if(result.rows.length === 0){
        return res.status(404).json({error: "no se encontro el empleado"})
    }
      res.json(result.rows);
  }
  catch(error){
    next(error); 
  }

};
