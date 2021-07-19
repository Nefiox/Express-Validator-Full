const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars');
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const uploadFile = multer({ storage });

const usersController = require('../controllers/userController');

const validations = [
    body('fullName').notEmpty().withMessage('Tienes que completar el nombre'),
    body('email').notEmpty().withMessage('Tienes que completar el email'),
    body('password').notEmpty().withMessage('Tienes que completar la contraseña'),
    body('country').notEmpty().withMessage('Tienes que completar el país')
];

// Formulario de registro
router.get('/register', usersController.register);

// Procesar formulario de registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

// Formulario de login
router.get('/login', usersController.login);

// Perfil de Usuario
router.get('/profile/:userId', usersController.profile);

module.exports = router;