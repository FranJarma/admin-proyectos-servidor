// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const { check } = require('express-validator');
const authControlador = require('./../controladores/authControlador.js');
//autenticar usuario al registrar una nueva cuenta
//api/auth (endpoint o URL)
/* de esta forma nos comunicamos con el controlador, con una función en particular (es por eso que no usamos
arrow function) */
router.post('/', 
    authControlador.autenticarUsuario);
//obtener un usuario autenticado al intentar loguear
router.get('/',
    auth,
    authControlador.usuarioAutenticado
    );
module.exports = router;