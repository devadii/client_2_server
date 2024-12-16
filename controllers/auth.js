const User = require("../models/User");
const nodemailer = require("nodemailer");

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

exports.signin = async (req, res) => {
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

exports.trigger_update_password = async (req, res) => {
	try {
		const {email} = req.body;

		const user = await User.find({email: email});

		if (user.length == 0) {
			res.status(400).send({msg: "User does not exists!"});
		}

		const transporter = nodemailer.createTransport({
			host: "live.smtp.mailtrap.io",
			port: 587,
			auth: {
				user: "api",
				pass: "ecd375648f87dfb3bf64c2adfb59aca5",
			},
		});
		
		const mailOptions = {
			from: "your-email@demomailtrap.com",
			to: email,
			subject: "Password Reset",
			text: `Click the following link to reset your password: http://localhost:3000/reset-password?user=${user[0]._id}`,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
				res.status(500).send("Error sending email");
			} else {
				console.log(`Email sent: ${info.response}`);
				res.status(200).send("Check your email for instructions on resetting your password");
			}
		});
	} catch (error) {
		console.log(error);
	}
};

exports.update_password = async (req, res) => {
	try {
		const {user_ID, password} = req.body;

		console.log(user_ID, password);

		const user = await User.findOneAndUpdate({_id: user_ID}, {password: password});

		res.status(200).send({msg: "Password Updated!"});
	} catch (error) {
		console.log(error);
	}
};
