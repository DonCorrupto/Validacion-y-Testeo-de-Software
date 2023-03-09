const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const studentRoutes = require("./routes/student");

const app = express()
const port = process.env.PORT || 3001;
app.use(cors())

//middleware
app.use(express.json())
app.use('/api', studentRoutes);

app.use((req, res)=>{
    res.status(404).send({
        ok: false,
        message: "Endpoint no encontrado.",
        info:null
    })
})

//moongodb connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected to MongoDB Atlas")).catch((error) => console.log(error));

app.listen(port, () => console.log("server listening on port", port));