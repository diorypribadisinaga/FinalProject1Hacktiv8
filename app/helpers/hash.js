const bcrypt = require("bcryptjs");

const hash = (input) => {
	return bcrypt.hashSync(input, 10);
};

const compare = (input, hashed) => {
	return bcrypt.compare(input, hashed);
};

module.exports = {
	hash,
	compare,
};
