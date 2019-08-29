const { db } = require('config');
const query = require('db/query');
const errorHandler = require('component/actionErrorHandler');

module.exports = {
	addAuthor: async (data) => {
		try {
			const res = await db.utils.queryExec(query.insertAuthor(data));
			return res;
		} catch (err) {
			errorHandler(err);
		}
	},
	getByName: (name) => db.utils.queryExec(query.getAuthorByName(name)),
	getById: (id) => db.utils.queryExec(query.getAuthorById(id)),
};
