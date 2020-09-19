const express = require('express');
const conectarBaseDeDatos = require ('./config/db.js');
const cors = require("cors-anywhere");
//creamos el servidor
const app = express();
//conectamos a la bd
conectarBaseDeDatos();
//para leer datos que ingrese el usuario
app.use(express.json({ extended: true}));

//puerto de APP
const port = process.env.PORT || 4000;

cors.createServer({
    originWhitelist: [],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'] // permite que puedan acceder todos los orígenes de las peticiones
});

// Importamos rutas
app.use('/api/usuarios', require('./routes/usuarios.js'));
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/proyectos', require('./routes/proyectos.js'));
app.use('/api/tareas', require('./routes/tareas.js'));

//usamos API por si decidimos crear el proyecto web sin usar REST API. 
//arrancamos la app
app.listen(port, ()=>{
    console.log(`El servidor está funcionando en el puerto ${port}`);
});