const mongoose = require('mongoose');
const {Schema} = mongoose

const studentSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    apellido:{
        type: String,
        required: true,
    },
    cedula:{
        type: String,
        required: true
    },
    carrera:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);