/* basado en el modelo vista-controlador (MVC), el modelo es la parte que interactúa con la bd, 
el controlador  se encarga de conectar las peticiones con el modelo y también las respuestas generadas, 
y la vista es la parte que hicimos en REACT */

//en este archivo tendremos multiples exports
const Usuario = require('./../modelos/Usuario.js');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
exports.crearUsuario = async(req,res)=>{
    //revisamos si hay errores, en caso de que haya lo colocamos en un array que mostrará dichos errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()});
    }
    //todo esto ingresa el usuario en la vista
    //VALIDACIONES
    const { email, contraseña, nombreUsuario } = req.body;
    try{
        //revisamos si el usuario está registrado
        let existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({mensaje:'El correo electrónico ingresado ya se encuentra registrado'});
        }
        let existeNombreUsuario = await Usuario.findOne({nombreUsuario});
        if(existeNombreUsuario){
            return res.status(400).json({mensaje:'El nombre de usuario ingresado ya se encuentra registrado'});
        }
        //crea nuevo usuario
        usuario = new Usuario(req.body);
        //hasheamos contraseña, salt permite generar un hash único para cada usuario
        const salt = await bcryptjs.genSalt(10);
        //la función hash rescribe el objeto con la contraseña vieja y el string del hash
        usuario.contraseña = await bcryptjs.hash(contraseña, salt);
        //guardamos usuario
        await usuario.save();
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
        res.status(400).send('Hubo un error en el registro');
    }
}