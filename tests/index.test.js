const app = require("../src/app");
const request = require("supertest")
const mongoose = require('mongoose');
const Student = require('../src/models/student');


describe("GET /api/student ", () => {

   beforeEach(async () => {
      // Conecta a una base de datos de prueba
      await mongoose.connect('mongodb+srv://Students:Proyectox10@students.jgzsh81.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
  
    afterEach(async () => {
      // Limpia la base de datos después de cada prueba
      await Student.deleteMany({});
      await mongoose.connection.close();
    });

   const student = new Student({ nombre: 'Simon', apellido: 'Londoño', cedula:"123456789", carrera:"Ingenieria de Sistemas" });

   test("deberia retornar todos los estudiantes", async () => {
      await student.save();

      const response = await request(app).get("/api/student")

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body[0].nombre).toEqual(student.nombre);
      expect(response.body[0].apellido).toEqual(student.apellido);
      expect(response.body[0].cedula).toEqual(student.cedula);
      expect(response.body[0].carrera).toEqual(student.carrera);
      expect(response.ok).toBe(true);

      
   })
})


describe("POST /api/student", () => {

   beforeEach(async () => {
      jest.setTimeout(30000)
      // Conecta a una base de datos de prueba
      await mongoose.connect('mongodb+srv://Students:Proyectox10@students.jgzsh81.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
  
    afterEach(async () => {
      // Limpia la base de datos después de cada prueba
      await Student.deleteMany({});
      await mongoose.connection.close();
    });

    const newStudent = { nombre: 'Simon', apellido: 'Londoño', cedula:"123456789", carrera:"Ingenieria de Sistemas" };

   test("crear un nuevo estudiante", async () => {
      const response = await request(app).post("/api/student").send(newStudent)

      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
      expect(response.body.nombre).toEqual(newStudent.nombre);
      expect(response.body.apellido).toEqual(newStudent.apellido);
      expect(response.body.cedula).toEqual(newStudent.cedula);
      expect(response.body.carrera).toEqual(newStudent.carrera);
      expect(response.ok).toBe(true);
   })
})


describe ("PUT /api/student", () => {

   beforeEach(async () => {
      jest.setTimeout(30000)
      // Conecta a una base de datos de prueba
      await mongoose.connect('mongodb+srv://Students:Proyectox10@students.jgzsh81.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
  
    afterEach(async () => {
      // Limpia la base de datos después de cada prueba
      await Student.deleteMany({});
      await mongoose.connection.close();
    });

   const student = new Student({ nombre: 'Simon', apellido: 'Londoño', cedula:"123456789", carrera:"Ingenieria Industrial" });

   test("Obtiene un id para modificar un estudiante", async () => {
      await student.save();
      const id = student._id.toString()

      const updateStudent = {
         nombre: "Simon",
         apellido: "Londoño",
         cedula: "123456789",
         carrera: "Ingenieria de Sistemas"
      }

      const response = await request(app).put(`/api/student/${id}`).send(updateStudent)
      
      expect(response.statusCode).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body.acknowledged).toEqual(true);
      expect(response.body.modifiedCount).toEqual(1);
   })
})


describe ("DELETE /api/student", () => {

   beforeEach(async () => {
      jest.setTimeout(30000)
      // Conecta a una base de datos de prueba
      await mongoose.connect('mongodb+srv://Students:Proyectox10@students.jgzsh81.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
  
    afterEach(async () => {
      // Limpia la base de datos después de cada prueba
      await Student.deleteMany({});
      await mongoose.connection.close();
    });

   const student = new Student({ nombre: 'Simon', apellido: 'Londoño', cedula:"123456789", carrera:"Ingenieria Industrial" });

   test("Borra un estudiante", async () => {
      await student.save();
      const id = student._id.toString()

      const response = await request(app).delete(`/api/student/${id}`)
      expect(response.statusCode).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body.acknowledged).toEqual(true);
      expect(response.body.deletedCount).toEqual(1);
   })
})