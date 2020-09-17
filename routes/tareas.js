const express = require('express');
const router = express.Router();
const tareaControlador = require('./../controladores/tareaControlador.js');
const auth = require('../middleware/auth.js');

//crear una tarea
// /api/tareas
router.post('/',
    auth,
    tareaControlador.crearTarea
);
//obtener tareas por proyectos
router.get('/',
    auth,
    tareaControlador.obtenerTareasPorProyecto    
);
//modificar una tarea
router.put('/:id',
    auth,
    tareaControlador.modificarTarea
);
//eliminar una tarea
router.delete('/:id',
    auth,
    tareaControlador.eliminarTarea
);
module.exports = router;