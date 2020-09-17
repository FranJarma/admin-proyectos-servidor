const express = require('express');
const conectarBaseDeDatos = require ('./config/db.js');
const cors = require('cors');
//creamos el servidor
const app = express();

//conectamos a la bd
conectarBaseDeDatos();

//habilitamos cors
app.use(cors());
//para leer datos que ingrese el usuario

app.use(express.json({ extended: true}));
// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', 'https://admin-proyectos-mern.herokuapp.com');

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

//puerto de APP
const port = process.env.port || 4000;

// Importamos rutas
app.use('/api/usuarios', require('./routes/usuarios.js'));
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/proyectos', require('./routes/proyectos.js'));
app.use('/api/tareas', require('./routes/tareas.js'));

//usamos API por si decidimos crear el proyecto web sin usar REST API. 
//arrancamos la app
app.listen(port, '0.0.0.0', ()=>{
    console.log(`El servidor está funcionando en el puerto ${port}`);
});