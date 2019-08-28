const CustomError = require('component/customError.js');
const { db } = require('config');
const query = require('db/query');

module.exports = {
	addImage: async (data) => {
		try {
			const res = await db.utils.queryExec(query.insertImage(data));
			return res;
		} catch (err) {
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
		}
	},
	getByLink: (name) => db.utils.queryExec(query.getImageByLink(name)),
	getById: (id) => db.utils.queryExec(query.getImageById(id)),
};
