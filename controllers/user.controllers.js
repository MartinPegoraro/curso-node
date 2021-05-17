const { response } = require('express')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/usuario');
const usuario = require('../models/usuario');
//const Role = require('../models/role')

const userGet = async (req, res) => {

    const { limit = 5, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true })
            .skip(Number(desde))
            .limit(Number(limit))

    ])
    res.json({
        total,
        usuarios
    })
}


const userPost = async (req, res) => {

    const { nombre, correo, password, role } = req.body;
    const usuario = new User({ nombre, correo, password, role });


    //Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en la bd
    await usuario.save();

    res.json({
        message: 'post API - controlador',
        usuario
    })
}

/* const userPostCreateRole = async (req, res) => {

    const body = req.body;
    const role = new Role(body);
    await role.save();

    res.json({
        message: 'El rol se ha guardado',
        role
    })
} */

const userPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    //validar contra la BD
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(salt)
    }

    const usuario = await User.findByIdAndUpdate(id, resto)

    res.json({
        usuario
    })
}

const userDelete = async (req, res) => {
    const { id } = req.params;

    //fisicamente lo borramos
    // const usuario = await User.findByIdAndDelete(id)

    //cambiar el estado a false
    const usuario = await User.findByIdAndUpdate(id, { status: false })

    res.json({

        usuario
    })
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
}