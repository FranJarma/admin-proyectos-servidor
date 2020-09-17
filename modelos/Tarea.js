const mongoose = require('mongoose');
const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    duracion: {
        type: Number,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    },
});
module.exports = mongoose.model('Tarea',TareaSchema);