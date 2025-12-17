import {empleadoService} from "../../services/empleados.service.js"
import { pool } from "../../repositories/db";


beforeEach(async () => {
 await pool.query(`
    TRUNCATE empleados, roles, departamentos
    RESTART IDENTITY CASCADE
  `);

  await pool.query(`
    INSERT INTO departamentos (nombre) VALUES
      ('hhrr'),
      ('tecnologia'),
      ('ventas'),
      ('diseño')
    `);
    await pool.query(`
    INSERT INTO roles (nombre) VALUES
      ('Manager'),
      ('Team Leader'),
      ('Senior'),
      ('Junior'),
      ('Trainee')
    `);
    
  await pool.query(`
    INSERT INTO empleados (nombre, edad, id_departamento, id_roles) VALUES
    ('juan perez', 30, 1, 1),
    ('ana garcia', 25, 2, 2),
    ('crlos rodríguez', 35, 1, 2),
    ('maria lopez', 28, 3, 1)
    `);
});


afterAll(async () => {
  await pool.end();
});


describe("test service empleados", ()=>{
    test('deberia devolver todos los empleados', async()=>{
    const empleados = await empleadoService.getEmpleados();
    expect(empleados).toHaveLength(4);
    })

    test('deberia de crear un empleado', async () => {
    const nuevoEmpleado = {
      nombre: "marian zag",
      edad: 21,
      id_departamento: 2,
      id_roles: 2,
    };
    const empleado = await empleadoService.createEmpleado(nuevoEmpleado);
    expect(empleado.nombre).toBe("marian zag");
    const empleados =  await empleadoService.getEmpleados();
    expect(empleados).toHaveLength(5);
    });

    test("deberia tirar error si faltan parametros del mepleaod", async () => {
        const empleadoSinParametros ={
            nombre: "pepe rodriguez",
            id_roles:3
        }

    expect (empleadoService.createEmpleado(empleadoSinParametros)).rejects.toThrow("faltan parametros");
    const empleados =  await empleadoService.getEmpleados();
    expect(empleados).toHaveLength(4);
    });

    test("deberia contar empleados por departamento", async () => {
    const count = await empleadoService.countByDepartamento(1);
    expect(count).toBe(2);
  });

    test("deberia tirar error si llega id_departamento", async () => {
     expect(
      empleadoService.countByDepartamento()
    ).rejects.toThrow("faltan parametros");
  });
});



