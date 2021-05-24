const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo', 'El correo deberia ser obligatorio').isEmail(),
    check('password', 'La contrasena deberia ser obligatoria').not().isEmpty(),
    validarCampos
], login)


module.exports = router
