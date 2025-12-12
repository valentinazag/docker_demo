import express from 'express';
import  errorHandler  from './middleware/errorHandler.js';
import { pool } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());


app.get('/empleados', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM empleados');
    res.json(result.rows);
  } catch (error) {
   next(error);
  }
});

app.get('/team-leaders', async (req, res,next) => {
  try {
    const result = await pool.query('SELECT e.id, e.nombre, e.edad, r.nombre AS rol FROM empleados e JOIN roles r ON e.id_roles = r.id WHERE r.nombre = \'Team Leader\'');
    res.json(result.rows);
  } catch (error) {
      next(error);
  }
});

app.post('/trainee', async (req, res, next) => {
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
});


app.put('/rol-change', async (req, res,next) => {
  const {nombre,id_departamento}=req.body;
 if (!nombre ||edad) {
      return res.status(400).json({ error:"faltan los parametros requeridos" });
    }
  try {
    const result = await pool.query("UPDATE empleados SET id_departamento = $1 WHERE nombre = $2 RETURNING *",
      [id_departamento, nombre]);
    
    if(result.rows.length === 0){
      return res.status(404).json({error: "no se encontro el empleado"})
    }
    res.json(result.rows);
  }  catch (error) {
      next(error);
  }
});


app.get('/cant-empleados', async (req, res,next) => {
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
});



app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Servidor corriendo en puerto 3000`)});