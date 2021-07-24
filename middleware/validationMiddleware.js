const { body } = require('express-validator');
const path = require('path');

const validations = [
    body('fullName').notEmpty().withMessage('Tienes que completar el nombre'),
    body('email')
        .notEmpty().withMessage('Tienes que completar el email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('password').notEmpty().withMessage('Tienes que completar la contraseña'),
    body('country').notEmpty().withMessage('Tienes que completar el país'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if(!file) {
            throw new Error('Tienes que subir una imágen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de imágen permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = validations;