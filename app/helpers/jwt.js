const jwt = require("jsonwebtoken");

const sign = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
};

const verify = (token) => {
	return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = {
	sign,
	verify,
};
