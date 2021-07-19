const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/images/avatars');
    },
    filename: (req, file, cb) => {
        let fileName = `avatar-${Date.now()}_img${path.extname(file.filename)} `
        cb(null, fileName);
    }
});

const uploadFile = multer({ storage });

const usersController = require('../controllers/userController');

// Formulario de registro
router.get('/register', usersController.register);

// Procesar formulario de registro
router.post('/register', uploadFile.single('avatar'), usersController.processRegister);

// Formulario de login
router.get('/login', usersController.login);

// Perfil de Usuario
router.get('/profile/:userId', usersController.profile);

module.exports = router;