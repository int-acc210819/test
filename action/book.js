const CustomError = require('component/customError.js');
const Config = require('../config');
const query = require('../db/query');
const { db } = new Config();

module.exports = {
	addBook: async (data) => {
		try {
			const { author, image } = data;

			const { insertId } = await db.utils.queryExec(query.insertBook(data));
			await db.utils.queryExec(query.connectBookAuthor({
				author,
				book: insertId,
			}))
			await db.utils.queryExec(query.connectBookImage({
				image,
				book: insertId,
			}))

		} catch (err) {
			if (err.sqlMessage && err.sqlMessage.indexOf('Duplicate entry') !== -1) {
				throw new CustomError({
					message: err.sqlMessage,
					status: 400,
					code: err.errno,
				})
			}
		}
	},

	getBook: (data) => {
		return db.utils.queryExec(query.getBookList(data));
	},
};
