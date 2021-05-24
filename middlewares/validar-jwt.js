const jwt = require('jsonwebtoken')

const User = require('../models/usuario');

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'no hay tooken en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Usuario no existe en la BD'
            })
        }

        //verificar si el uid tiene status = true
        if (!user.status) {
            return res.status(401).json({
                msg: 'Usuario con estado false'
            })
        }

        req.user = user
        next()

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'token no valido'
        })
    }

}

module.exports = {
    validarJWT
}