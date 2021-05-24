const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPost, userPut, userDelete } = require('../controllers/user.controllers');
const { roleValido, existEmail, existUserId } = require('../helpers/db-validators');

const {
    validarCampos,
    validarJWT,
    tieneRole,
    adminRole
} = require('../middlewares')

const router = Router();

router.get('/', userGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existEmail),
    check('role').custom(roleValido),
    validarCampos
], userPost)

//router.post('/create-role', userPostCreateRole)

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existUserId),
    check('role').custom(roleValido),
    validarCampos
], userPut)

router.delete('/:id', [
    validarJWT,
    //adminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existUserId),
    validarCampos
], userDelete)


module.exports = router