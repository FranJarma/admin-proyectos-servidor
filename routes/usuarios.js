// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioControlador = require('./../controladores/usuarioControlador.js');
const { check } = require('express-validator');
//crear usuario
//api/usuarios (endpoint o URL)
/* de esta forma nos comunicamos con el controlador, con una función en particular (es por eso que no usamos
arrow function) */
router.post('/', 
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('apellido','El apellido es obligatorio').not().isEmpty(),
        check('email','Ingrese un email válido').isEmail(),
        check('nombreUsuario','El nombre de usuario es obligatorio y debe contener como mínimo 6 caractéres alfa numéricos')
        .not().isEmpty().isAlphanumeric().isLength({min: 6}),
        check('contraseña','La contraseña debe contener 6 carácteres como mínimo').isLength({min:6}),
    ],
    usuarioControlador.crearUsuario);
module.exports = router;