const express = require('express')
const cors = require('cors');
require("dotenv").config();
const studentRoutes = require("./routes/student");

const app = express()
app.use(cors())

//middleware
app.use(express.json())
app.use('/api', studentRoutes);

app.use((req, res)=>{

    res.status(404).send({
        ok: false,
        message: "Endpoint no encontrado.",
    })
})

module.exports = app;