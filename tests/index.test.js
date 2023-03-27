const app = require("../src/app");
//const request = require("supertest")
//const mongoose = require('mongoose');
const Student = require('../src/models/student');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require("chai-http");


chai.use(chaiHttp);



describe("POST /api/student", () => {

   const newStudent = new Student({ id:"987654", nombre: 'Simon', apellido: 'Londoño', cedula: "123456789", carrera: "Ingenieria de Sistemas" });

   test("crear un nuevo estudiante", async () => {
      const stub = sinon.stub(Student.prototype, "save").resolves({
         newStudent
      });
      const response = await chai.request(app).post("/api/student").send(newStudent)
      expect(response.statusCode).toBe(200);
      expect(response.body.newStudent).toBeInstanceOf(Object)
      expect(response.body.newStudent.cedula).toEqual(newStudent.cedula);
      expect(response.ok).toBe(true);
      stub.restore();
   })

})


describe("GET /api/student ", () => {

   const student = new Student({ id:"987654", nombre: 'Simon', apellido: 'Londoño', cedula: "123456789", carrera: "Ingenieria de Sistemas" });

   test("deberia retornar todos los estudiantes", async () => {

      const stub = sinon.stub(Student, "find").resolves(student);

      const response = await chai.request(app).get("/api/student")
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.cedula).toEqual(student.cedula);
      expect(response.ok).toBe(true);
      stub.restore();
   })
})


describe("GET by ID /api/student ", () => {

   const student = new Student({ id:"987654", nombre: 'Simon', apellido: 'Londoño', cedula: "123456789", carrera: "Ingenieria de Sistemas" });

   test("deberia retornar un estudiante", async () => {

      const stub = sinon.stub(Student, "findById").resolves(student);

      const response = await chai.request(app).get(`/api/student/$${student.id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toEqual(student.id);
      expect(response.ok).toBe(true);
      stub.restore();

   })

})


describe("PUT /api/student", () => {

   test("Obtiene un id para modificar un estudiante", async () => {

      const student = new Student({id:"987654", nombre: "Simon", apellido: "Londoño", cedula: "123456789", carrera: "Ingenieria Industrial" });

      const stub = sinon.stub(Student, "findByIdAndUpdate").resolves({
         id:student.id, nombre: student.nombre, apellido: student.apellido, cedula: student.cedula, carrera: "Ingenieria Industrial",
      });
      const response = await chai.request(app).put(`/api/student/${student.id}`).send({ carrera: "Ingenieria Industrial" });

      expect(response.statusCode).toBe(200);
      expect(response.ok).toBe(true);
      stub.resolves();
   });

})





describe("DELETE /api/student", () => {

   const student = new Student({ id:"987654", nombre: 'Simon', apellido: 'Londoño', cedula: "123456789", carrera: "Ingenieria Industrial" });

   test("Borra un estudiante", async () => {

      const saveStub = sinon.stub(student, "save").resolves(student);
      const deleteStub = sinon.stub(Student, "findByIdAndDelete").resolves(student);

      const response = await chai.request(app).delete(`/api/student/${student.id}`)

      expect(response.statusCode).toBe(200);
      expect(response.ok).toBe(true);
      saveStub.resolves();
      deleteStub.resolves();
   })
})
