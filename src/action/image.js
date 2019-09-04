const CustomError = require('component/customError.js');
const { db } = require('config');
const query = require('db/query');
const errorHandler = require('component/actionErrorHandler');

module.exports = {
	addImage: async (data) => {
		try {
			const response = await db.utils.queryExec(query.insertImage(data));

			return { id: response.insertId };

		} catch (err) {
			errorHandler(err);
		}
	},
	getByLink: (name) => db.utils.queryExec(query.getImageByLink(name)),
	getById: (id) => db.utils.queryExec(query.getImageById(id)),
};
