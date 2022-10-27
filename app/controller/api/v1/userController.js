const User = require("./../../../models/user");
const { sign } = require("./../../../helpers/jwt");
const {checkPassword}=require("../../../helpers/cekPassword")


class UserController {
	static async register(req, res) {
		const {email,username,password}=req.body
		const cekEmail=await User.FindOne(email)
		if(cekEmail.rows[0]) return res.status(403).json({message:"Email already taken"})
		const cekusername=await User.FindOneUsername(username)
		if(cekusername.rows[0]) return res.json({message:"Username already exist"})
		const cekPassword=checkPassword(password)
		if(!cekPassword) return  res.json({message:"Password minimum delapan karakter, setidaknya satu huruf besar, satu huruf kecil, satu angka dan satu karakter khusus"})
		User.register(email, username, password)
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((error) => {
				res.status(500).json(error);
			});
	}

	static login(req, res) {
		const { email, password } = req.body;
		User.login(email, password)
			.then((user) => {
				const accessToken = sign({
					id: user.id,
					email: user.email,
                    username: user.username
				});
                res.json({accessToken});
			})
			.catch((err) => {
				if (err.name === "UserNameNotFound" || err.name === "PasswordInvalid") {
					res.status(403).json({
						message: "Wrong email or password",
					});
				} else {
					res.json(err);
				}
			});
	}
}

module.exports = UserController;
