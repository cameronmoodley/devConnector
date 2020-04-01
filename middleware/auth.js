const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');
	// Check if no token
	if (!token) {
		return res.status(401).json({ msg: 'No token, auth denied' });
	}

	// Verify token
	try {
		// decodes token
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		// we set the req user to the value thats inside the decoded token
		req.user = decoded.user;
		next();
	} catch (err) {
		// this runs if token is not valid
		res.status(401).json({ msg: 'Token is invalid' });
	}
};
