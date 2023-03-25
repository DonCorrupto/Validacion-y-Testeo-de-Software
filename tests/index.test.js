const app = require("../src/app");
const request = require("supertest")
const mongoose = require('mongoose');
const Student = require('../src/models/student');

beforeAll(async () => {

   await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   });
});

afterAll(async () => {

   //await Student.deleteMany();
   await mongoose.disconnect();
});




describe("POST /api/student", () => {

   const newStudent = { nombre: 'Simon', apellido: 'Londoño', cedula: "123456789", carrera: "Ingenieria de Sistemas" };

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

   test("Error al mandar un post", async () => {

      const newEstudiante = { nombre: 'Simon', cedula: "123456789", carrera: "Ingenieria de Sistemas" };

      const response = await request(app).post("/api/student").send(newEstudiante);

      //console.log(response.body.message.errors);
      
      expect(response.body.message._message).toBe("Student validation failed");
      expect(response.body.message.name).toBe("ValidationError");
      
   })

})


describe("GET /api/student ", () => {

   const student = new Student({ nombre: 'Simon', apellido: 'Londoño', cedula: "123456789", carrera: "Ingenieria de Sistemas" });

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


describe("GET by ID /api/student ", () => {

   const student = new Student({ nombre: 'Simon', apellido: 'Londoño', cedula: "123456789", carrera: "Ingenieria de Sistemas" });

   test("deberia retornar un estudiante", async () => {

      await student.save();
      const id = student._id.toString();
      const response = await request(app).get(`/api/student/${id}`)

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body._id).toEqual(student._id.toString());
      expect(response.body.nombre).toEqual(student.nombre);
      expect(response.body.apellido).toEqual(student.apellido);
      expect(response.body.cedula).toEqual(student.cedula);
      expect(response.body.carrera).toEqual(student.carrera);
      expect(response.ok).toBe(true);

   })

   test("Error al obtener un estudiante", async () => {
      const id = "641e12b5fb566f133568b000";
      const response = await request(app).get(`/api/student/${id}`)

      expect(response.body).toBe(null);
   })
   
})




describe("PUT /api/student", () => {

   const student = new Student({ nombre: 'Simon', apellido: 'Londoño', cedula: "123456789", carrera: "Ingenieria Industrial" });

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


   test("Error al mandar un put", async () => {
      await student.save();
      const id = student._id.toString()

      const updateEstudiantes = {
         nombre: "Simon",
         cedula: "123456789",
         carrera: "Ingenieria de Sistemas"
      }

      const response = await request(app).put(`/api/student/${id}`).send(updateEstudiantes)


      expect(response.body.modifiedCount).toBe(0);
      expect(response.body.upsertedId).toBe(null);
   })
})


describe("DELETE /api/student", () => {

   const student = new Student({ nombre: 'Simon', apellido: 'Londoño', cedula: "123456789", carrera: "Ingenieria Industrial" });

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
