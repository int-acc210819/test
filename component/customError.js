module.exports = class CustomError extends Error {
	constructor({ message, status, code }, ...args) {
		super(...args);
		this.message = message || 'Unknown error';
		this.status = status;
		this.code = code || 0;
	}
}