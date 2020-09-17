const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});
const conectarBaseDeDatos = async () => {
    try {
/*         esta función toma dos parámetros, el primero para hacer referencia a la URL donde se conectará
y el segundo parámetro es un objeto de configuración de dicha conexión (en este caso, DB_MONGO lo definimos
    en variables.env)*/
    await mongoose.connect(process.env.DB_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
        });
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
        process.exit(1); //en caso de encontrar un error, se sale de la aplicación
    }
}
module.exports = conectarBaseDeDatos;