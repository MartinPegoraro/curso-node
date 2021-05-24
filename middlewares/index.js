const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRole = require('../middlewares/validar-roles');

module.exports = {
    ...validaRole,
    ...validarJWT,
    ...validarCampos
}
