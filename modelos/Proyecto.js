const mongoose = require('mongoose');
const ProyectoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    creador:{
        //cada usuario tiene su propio id, entonces es como si fuese un JOIN de sql
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' //hace referencia al modelo usuario en el cual haremos el join
    },
    duracion:{
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('Proyecto', ProyectoSchema);
