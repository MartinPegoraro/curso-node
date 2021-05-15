const { response } = require('express')

const userGet = (req, res) => {

    const { q, nombre } = req.query;

    res.json({
        ok: true,
        message: 'get API - controlador',
        q,
        nombre
    })
}

const userPost = (req, res) => {

    const { title, done } = req.body;

    res.json({
        message: 'post API - controlador',
        title,
        done
    })
}

const userPut = (req, res) => {

    const { id } = req.params

    res.json({
        message: 'put API - controlador',
        id
    })
}

const userDelete = (req, res) => {
    res.json({
        ok: true,
        message: 'delete API - controlador'
    })
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete


}