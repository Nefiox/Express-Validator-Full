const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

const controller = {
	register: (req, res) => {
		return res.render('userRegisterForm');
	},

	processRegister: (req, res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render('userRegisterForm', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		};

		const userInDB = User.findByField('email', req.body.email);
		if (userInDB) {
			return res.render('userRegisterForm', {
				errors: {
					email: {
						msg: 'Este usuario ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		};
		let userCreated = User.create(userToCreate);

		return res.redirect('/user/login');
	},

	login: (req, res) => {
		return res.render('userLoginForm');
	},

	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if (userToLogin) {
			let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (passwordOk) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;
				
				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: 1000*120 });
				}

				return res.redirect('/user/profile');
			}
			return res.render('userLoginForm', {
				errors: {
					email: {
						msg: 'Datos inválidos'
					}
				},
				oldData: req.body
			});
		}

		return res.render('userLoginForm', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra BD'
				}
			},
			oldData: req.body
		});
	},

	profile: (req, res) => {
		return res.render('userProfile', {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');

		req.session.destroy();

		return res.redirect('/');
	}
}

module.exports = controller;