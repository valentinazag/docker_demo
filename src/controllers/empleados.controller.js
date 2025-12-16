import { empleadoService } from "../services/empleados.service.js";

export const getEmpleados = async (req, res, next) => {
  try {
    const result = await empleadoService.getEmpleados();
    res.json({result});
  } catch (error) {
   next(error);
  }
};

export const getEmpleadosById = async (req, res, next) => {
    const {id} = req.params;
  try {
    const result = await empleadoService.getEmpleadosById(id); 
    res.json({result});
  } catch (error) {
   next(error);
  }
};

export const getTeamLeaders =  async (req, res,next) => {
  try {
    const result = await empleadoService.getTeamLeaders();
    res.json({result});
  } catch (error) {
      next(error);
  }
};

export const createEmpleado = async (req, res, next) => {
  const {id,name,edad,id_departamento,id_roles} = req.body;
  try {
   const result = await empleadoService.createEmpleado(id,name,edad,id_departamento,id_roles);
       res.status(201).json({result});
  }  catch (error) {
      next(error);
  }
};


export const updateEmpleadoDepartamento =  async (req, res,next) => {
  const {id} = req.params;
  const {id_departamento}=req.body;
  try {
    const result = await empleadoService.updateEmpleadoDepartamento(id, id_departamento);
    res.json({result});
  }  catch (error) {
      next(error);
  }
};

export const deleteEmpleado = async(req,res,next)=>{
  const {id} = req.params;
  try{
    const result = await empleadoService.deleteEmpleado(id);
    res.json({ message: 'empleado eliminado', data: {result} });
  }
  catch(error){
    next(error); 
  };
}

export const countByDepartamento = async(req,res,next)=>{
    const { id_departamento } = req.query;
    try{
    const result = await empleadoService.countByDepartamento(id_departamento);
    res.json({ result });
    }
    catch(error){
      next(error)
    }
}


