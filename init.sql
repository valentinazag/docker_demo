CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS departamentos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS empleados (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  edad INT NOT NULL,
  id_departamento INT REFERENCES departamentos(id),
  id_roles INT REFERENCES roles(id)
);


INSERT INTO roles (nombre) VALUES 
('Manager'),
('Team Leader'),
('Senior'),
('Junior'),
('Trainee')
ON CONFLICT DO NOTHING;


INSERT INTO departamentos (nombre) VALUES 
  ('hhrr'),
  ('tecnologia'),
  ('ventas'),
  ('diseño')
ON CONFLICT DO NOTHING;


INSERT INTO empleados (nombre, edad, id_departamento, id_roles) VALUES 
  ('juan perez', 30, 1, 1),
  ('ana garcia', 25, 2, 2),
  ('crlos rodríguez', 35, 1, 2),
  ('maria lopez', 28, 3, 1)
ON CONFLICT DO NOTHING;