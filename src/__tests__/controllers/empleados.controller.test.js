import request from "supertest";
import app from "../../../app.js";
import { pool } from "../../repositories/db.js";


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

describe("testing de controller empleados end to end", () => {
  test("devuelve empleados", async () => {
    const res = await request(app).get("/empleados");

    expect(res.status).toBe(200);
    expect(res.body.result).toBeInstanceOf(Array);
  });


  test("deberia devolver un empleado por id", async () => {
    const res = await request(app).get("/empleados/1");
    expect(res.status).toBe(200);
    expect(res.body.result).toHaveProperty("id", 1);
    expect(res.body.result.nombre).toBe("juan perez");
  });

  test("deberia devolver null si el empleado no existe", async () => {
  const res = await request(app).get("/empleados/45");

  expect(res.status).toBe(200);
  expect(res.body.result).toBeNull();
});

it("debe crear un empleado", async () => {
    const nuevoEmpleado = {
      nombre: "pepe rodriguez",
      edad: 45,
      id_departamento: 3,
      id_roles: 3
    };

    const res = await request(app).post("/empleados").send(nuevoEmpleado);

    expect(res.status).toBe(201);
    expect(res.body.result).toHaveProperty("id");
    expect(res.body.result.nombre).toBe("pepe rodriguez");
  });

  it("deberia dar error si faltan datos del empleado", async () => {
  const res = await request(app).post("/empleados").send({ nombre: "tomas lopez" });
  expect(res.status).toBe(500);
});


});
