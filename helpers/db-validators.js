const Role = require('../models/role')
const User = require('../models/usuario')

const roleValido = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`El rol ${role} no esta registrado en la BD`)
    }
}

const existEmail = async (correo = '') => {

    //Verificar si el correo existe
    const existeEMail = await User.findOne({ correo })
    if (existeEMail) {
        //return res.status(400).json({ message: "El correo ya existe" })
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}

const existUserId = async (id) => {

    //Verificar si el correo existe
    const existUser = await User.findById(id)
    if (!existUser) {
        //return res.status(400).json({ message: "El correo ya existe" })
        throw new Error(`El id: ${id}, no existe `)
    }
}

module.exports = {
    roleValido,
    existEmail,
    existUserId
}