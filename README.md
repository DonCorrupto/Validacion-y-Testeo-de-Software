### Instrucciones para la ejecución de las pruebas
#### Componentes necesarios 
- node.js
- jest, este lo instalamos con el comando npm install --save-dev jest.
- Aconsejamos usar la extensión request.http, es una herramienta que se integra y permite hacer llamados a la base de datos.
- Visual studio code, para efectos prácticos de nuestra entrega y facilidades con las extensiones.

#### Pasos para la ejecución de las pruebas 
- Crear un archivo con la extensión intermedia test. Ejemplo index.jes => index.test.js
- Abrir una terminal y ejecutar npm test

#### Cobertura del código 
En las pruebas tenemos cobertura de todos los métodos del CRUD, también en la conexión con la base de datos, observamos un tiempo de ejecución mayor en la primera prueba debido a que debe hacer la conexión, las siguientes pruebas tardan aproximadamente 1.5 segundos.

Al ejecutar el test, estos son nuestros resultados 


PASS  tests/index.test.js
  POST /api/student
    √ crear un nuevo estudiante (552 ms)
  GET /api/student
    √ deberia retornar todos los estudiantes (272 ms)
  PUT /api/student
    √ Obtiene un id para modificar un estudiante (188 ms)
  DELETE /api/student
    √ Borra un estudiante (168 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        4.021 s, estimated 6 s
Ran all test suites.
PS C:\Users\User\Documents\Validacion\Validacion test\Validacion>
