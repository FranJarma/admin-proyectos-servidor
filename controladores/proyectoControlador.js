const Proyecto = require('../modelos/Proyecto.js');
const Tarea = require('../modelos/Tarea.js');

const { restart } = require('nodemon');
const { validationResult } = require('express-validator');
exports.crearProyecto = async(req,res) => {
    //revisamos si hay errores, en caso de que haya lo colocamos en un array que mostrará dichos errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()});
    }
    try {
        //creamos un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        //vamos a guardar el creador del proyecto
        proyecto.creador = req.usuario.id;
        proyecto.save();
        res.json({mensaje: 'El proyecto ha sido creado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear el proyecto');
    }
};
//obtener todos los proyectos del usuario actual
exports.obtenerProyectosPorUsuario = async(req,res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id});
        res.json(proyectos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener los proyectos');
    }
};
//modificar proyectos por ID
exports.modificarProyecto = async(req,res) => {
    //revisamos si hay errores, en caso de que haya lo colocamos en un array que mostrará dichos errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()});
    }
    //array destructuring para sacar información del proyecto
    const { nombre, duracion } = req.body;
    const nuevoProyecto = {};
    if(nombre){
        nuevoProyecto.nombre = nombre;
    }
    if(duracion){
        nuevoProyecto.duracion = duracion;
    }
    try {
        //revisamos el ID del proyecto
        let proyecto = await Proyecto.findById(req.params.id);
        //revisamos si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({mensaje:'Proyecto no encontrado'});
        }
        //el proyecto existe, entonces debemos verificar que pertenezca a un usuario
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({mensaje:'Usuario no autorizado'});
        }
        //modificamos el proyecto (le tenemos que pasar el id y definir el nuevo valor)
        proyecto = await Proyecto.findOneAndUpdate({_id: req.params.id },
        { $set : nuevoProyecto});

        res.json({mensaje: 'El proyecto ha sido modificado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el proyecto');
    }
};
//eliminar proyectos por ID (hay que eliminar tareas asociadas)
exports.eliminarProyecto = async(req,res) => {
    try {
         //revisamos el ID del proyecto
         let proyecto = await Proyecto.findById(req.params.id);
         //revisamos si el proyecto existe o no
         if(!proyecto){
             return res.status(404).json({mensaje:'Proyecto no encontrado'});
         }
         //el proyecto existe, entonces debemos verificar que pertenezca a un usuario
         if(proyecto.creador.toString() !== req.usuario.id){
             return res.status(401).json({mensaje:'Usuario no autorizado'});
         }
         //eliminamos el proyecto y sus tareas asociadas
         await Proyecto.findOneAndRemove({_id: req.params.id});
          //obtenemos las tareas del proyecto asociado y las removemos
         await Tarea.remove({proyecto: req.params.id});
         res.json({mensaje: 'El proyecto ha sido eliminado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el proyecto');
    }
};