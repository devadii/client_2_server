const User = require("../models/User");

exports.signup = async (req, res) => {
	try {
		const {email, password, name, lastname} = req.body;

		const user = await User.find({email: email});

		if (user.length > 0) {
			res.status(400).send({msg: "User exists already!"});
			return;
		}

		const new_user = new User({email: email, name: name, password: password});
		const saved_user = await new_user.save();
		res.status(200).send({user: saved_user});
	} catch (error) {
		console.log(error);
	}
};

exports.signin = async(req, res) => {
	try {
		const {email, password} = req.body;

		const user = await User.find({email: email});

		if (user.length == 0) {
			res.status(400).send({msg: "User does not exists!"});
			return;
		}

		if (user[0].password === password) {
			res.status(200).send({user: user});
		} else {
			res.status(400).send({msg: "Password is incorrect!"});
		}

	} catch (error) {
		console.log(error);
	}
};
