const express = require('express');
const router = express.Router();

const validationMiddleware = require('../middleware/validationMiddleware');
const uploadFile = require('../middleware/storageMiddleware');

const usersController = require('../controllers/userController');

// Formulario de registro
router.get('/register', usersController.register);

// Procesar formulario de registro
router.post('/register', uploadFile.single('avatar'), validationMiddleware, usersController.processRegister);

// Formulario de login
router.get('/login', usersController.login);

// Procesar formulario de login
router.post('/login', usersController.loginProcess);

// Perfil de Usuario
router.get('/profile', usersController.profile);

module.exports = router;