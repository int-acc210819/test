const CustomError = require('./customError');

module.exports = (err) => {
	let status = err.status || 500;
	let message = err.sqlMessage || err.message;

	if (err.sqlMessage && err.sqlMessage.indexOf('Duplicate entry') !== -1) {
		status = 400;
	}
	if (err.errno === 1146) message = 'Table in database not exist';

	throw new CustomError({
		status,
		message,
		code: err.errno,
	})
};