const controller = {
	register: (req, res) => {
		return res.render('userRegisterForm');
	},
	processRegister: (req, res) => {
		console.log(req.body);
		res.send(req.body)
	},
	login: (req, res) => {
		return res.render('userLoginForm');
	},
	profile: (req, res) => {
		return res.render('userProfile');
	},
}

module.exports = controller;