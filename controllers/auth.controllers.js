const User = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { genererJWT } = require('../helpers/generar-jwt');

const login = async (req, res) => {

    const { correo, password } = req.body;

    try {

        //Verificar si el mail existe
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / password no son correcto'
            });
        }

        //Si el usuario esta activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'Usuario / password no son correcto - estado =false'
            });
        }

        //Verificar la contrasena
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'EL password no es correcto'
            })
        }

        //Generar JWT
        const token = await genererJWT(user.id)

        res.json({
            user,
            token
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })

    }

}

module.exports = {
    login
}