import { pool } from "../../repositories/db";
import { empleadoRepository } from "../../repositories/empleados.repository";


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

describe("testing repository de empleados", () => {
  test("tendria que traer todos los empleados", async () => {
    const empleados = await empleadoRepository.findAll();

    expect(empleados).toHaveLength(4);
    expect(empleados[0]).toHaveProperty("id");
    expect(empleados[0]).toHaveProperty("nombre");
    expect(empleados[0].nombre).toBe("juan perez");
  });

   test("tiene q devolver un empleado existente", async () => {
    const empleado = await empleadoRepository.findById(2);

    expect(empleado).not.toBeNull();
    expect(empleado.nombre).toBe("ana garcia");
  });

  test("devuelve null si no existe eñ empleado", async () => {
    const empleado = await empleadoRepository.findById(40);
    expect(empleado).toBeNull();
  });

   test("crea un empleado", async () => {
    const nuevoEmpleado = await empleadoRepository.createEmpleado({
      nombre: "valen zag",
      edad: 21,
      id_departamento: 2,
      id_roles: 2,
    });

    expect(nuevoEmpleado.nombre).toBe("valen zag");

    const empleados = await empleadoRepository.findAll();
    expect(empleados).toHaveLength(5);
  });

   test("eliminar un empleado", async () => {
    const eliminado = await empleadoRepository.deleteEmpleado(1);
    expect(eliminado).not.toBeNull();

    const empleados = await empleadoRepository.findAll();
    expect(empleados).toHaveLength(3);
  });
});



