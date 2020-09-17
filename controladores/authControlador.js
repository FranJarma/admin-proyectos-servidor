const Usuario = require('./../modelos/Usuario.js');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

//middleware utilizado para autenticar un usuario al registrar una nueva cuenta
exports.autenticarUsuario = async(req,res) => {
      //revisamos si hay errores
      const errores = validationResult(req);
      if(!errores.isEmpty()){
          return res.status(400).json({ errores: errores.array()});
      }
      const { email, contraseña } = req.body;
      try {
        //revisamos si el usuario está registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({mensaje:'El correo electrónico es incorrecto'});
        }
        const contraseñaCorrecta = await bcryptjs.compare(contraseña, usuario.contraseña);
        if (!contraseñaCorrecta) {
            return res.status(400).json({mensaje:'La contraseña es incorrecta'});         
        }
        //creamos y firmamos el jwt 
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        //firmamos el token
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 3600 //la sesión dura 1 hora
        },(error, token) =>{
            if (error) {
                throw(error);
            }
            else{
                //mensaje de confirmación
            res.json({token});
            }
        });
      } catch (error) {
          console.log(error);
      }
};
//middleware utilizado para autenticar un usuario al iniciar sesión
exports.usuarioAutenticado = async(req,res) => {
    try {
        /* consultamos si existe un usuario en la BD por su id que está en el cuerpo de la request,
        no vamos a traer la contraseña del usuario para garantizar seguridad, con mongoose se hace con
        .select */
        const usuario = await Usuario.findById(req.usuario.id).select('-contraseña');
        res.json({usuario});
    } catch (error) {
        console.log(error);
    }
};