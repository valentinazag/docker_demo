import { empleadoRepository } from "../repositories/empleados.repository.js";

export const empleadoService = {

    getEmpleados: async()=>{
        return await empleadoRepository.findAll();
    },

     getEmpleadosById: async (id)=>{
        return await empleadoRepository.findById(id);
    },
    getTeamLeaders: async () =>{
        return await empleadoRepository.findTeamLeaders();
    },
    
    createEmpleado: async (data) =>{
        if (!data.nombre || !data.edad || !data.id_departamento || !data.id_roles) {
      throw new Error('faltan parametros');
    }
      return await empleadoRepository.createEmpleado(data);
    },

    updateEmpleadoDepartamento: async (id, id_departamento) =>{
        if (!id || !id_departamento) {
       throw new Error('faltan parametros');
    }
    const empleado = await empleadoRepository.updateEmpleado(id, id_departamento);
    
    if (!empleado) {
      throw new Error(`no existe el empleado con id: ${id}`);
    }
    return empleado;
    },

    deleteEmpleado: async (id)=>{
    if (!id) {
      throw new Error('faltan parametros');
    }
    const empleado = await empleadoRepository.deleteEmpleado(id);
    if(!empleado){ throw new Error(`no existe el empleado con id: ${id}`);
    }
    return empleado;
    },

    countByDepartamento: async(id_departamento)=>{
        if(!id_departamento){
            throw new Error('faltan parametros');
        }
          return await empleadoRepository.countByDepartamento(id_departamento);
    }
}