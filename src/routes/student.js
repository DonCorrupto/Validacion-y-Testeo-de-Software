const express = require("express");
const router = express.Router();
const studentSchema = require("../models/student");

// create user
router.post("/student", async (req, res) => {
  try {
    const student = studentSchema(req.body);
    student
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));

  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error",
      info: error.toString(),
    });
  }
});

//get all users
router.get("/student", (req, res) => {
  try {
    studentSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error",
      info: error.toString(),
    });
  }
});

// get a user
router.get("/student/:id", (req, res) => {
  try {
    const { id } = req.params;
    studentSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error",
      info: error.toString(),
    });
  }
});

//update a user
router.put("/student/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, cedula, carrera } = req.body;
    studentSchema
      .updateOne({ _id: id }, { $set: { nombre, apellido, cedula, carrera } })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error",
      info: error.toString(),
    });
  }
});

//delete a user
router.delete("/student/:id", (req, res) => {
  try {
    const { id } = req.params;
    studentSchema
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error",
      info: error.toString(),
    });
  }
});

module.exports = router;