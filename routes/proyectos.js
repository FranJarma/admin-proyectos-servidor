const express = require('express');
const router = express.Router();
const proyectoControlador = require('./../controladores/proyectoControlador.js');
const auth = require('../middleware/auth.js');
//Crea proyectos
//api/proyectos (endpoint o URL)
router.post('/',
    //lo primero que hacemos es autenticar si hay un usuario logueado
    auth,
    //llamamos a la función creada en el Controlador
    proyectoControlador.crearProyecto
);
//trae proyectos por usuario
router.get('/',
    auth,
    proyectoControlador.obtenerProyectosPorUsuario
);
//modificar un proyecto
router.put('/:id',
    auth,
    proyectoControlador.modificarProyecto
);
// eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoControlador.eliminarProyecto
);
module.exports = router;