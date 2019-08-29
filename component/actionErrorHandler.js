const CustomError = require('./customError');

module.exports = (err) => {
	let status = 500;
	let message = err.sqlMessage;

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