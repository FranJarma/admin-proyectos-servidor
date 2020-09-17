const mongoose = require('mongoose');
const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true

    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    nombreUsuario: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: false,
        unique: true
    },
    contraseña: {
        type: String,
        required: true,
        trim: true
    },
    fechaAltaUsuario:{
        type: Date,
        default: Date.now()
    },
});
module.exports = mongoose.model('Usuario', UsuarioSchema);