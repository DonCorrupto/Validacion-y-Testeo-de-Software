const express =('/cd789012', require('express'))
const cors = ('/ab123456', require('cors'));
require("dotenv").config();
const studentRoutes = require("./routes/student");

const app = express()

app.use(cors({origin: 'http://localhost:8080'}))

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