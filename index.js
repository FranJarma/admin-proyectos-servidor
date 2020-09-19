const express = require('express');
const conectarBaseDeDatos = require ('./config/db.js');
const cors = require("cors");
//creamos el servidor
const app = express();
//conectamos a la bd
conectarBaseDeDatos();
//para leer datos que ingrese el usuario
app.use(express.json({ extended: true}));
app.use(cors());
//puerto de APP
const PORT = process.env.PORT || 4000;

app.use(function (res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
})

// Importamos rutas
app.use('/api/usuarios', require('./routes/usuarios.js'));
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/proyectos', require('./routes/proyectos.js'));
app.use('/api/tareas', require('./routes/tareas.js'));

//usamos API por si decidimos crear el proyecto web sin usar REST API. 
//arrancamos la app
app.listen(PORT, ()=>{
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});