const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //leemos el token del header
    const token = req.header('x-auth-token');
    //revisamos si no hay token
    if(!token){
        return res.status(401).json({mensaje:'No hay token válido'});
    }
    //validamos el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json({mensaje:'Su sesión ya ha expirado, por favor, inicie sesión otra vez'});
    }
}