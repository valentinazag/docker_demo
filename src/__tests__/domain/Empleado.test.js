import { describe, test, expect } from '@jest/globals';
import { Empleado } from '../../domain/Empleado.js';

describe('Empleados tests', ()=>{

  test('deberia crear un empleado', ()=>{

     const data = {
      id: 20,
      nombre: 'Valen Zagman',
      edad: 21,
      id_departamento: 2,
      id_roles: 1
    };

    const empleado = new Empleado(data);
    expect(empleado.id).toBe(20);
    expect(empleado.nombre).toBe('Valen Zagman');
    expect(empleado.edad).toBe(21);
    expect(empleado.id_departamento).toBe(2);
    expect(empleado.id_roles).toBe(1);

  });

})