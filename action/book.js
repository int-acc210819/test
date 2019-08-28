const _ = require('lodash');
const CustomError = require('component/customError.js');
const { db } = require('config');
const query = require('db/query');

const connectAuthorToBook = async (data, book) => {
	if (_.has(data, 'author')) {
		const { author } = data;
		await db.utils.queryExec(query.connectBookAuthor({
			author,
			book,
		}))
	}
};

const updateAuthor = async (data, book) => {
	if (_.has(data, 'author')) {
		const { author, oldAuthor } = data;
		await db.utils.queryExec(query.updateBookAuthor({
			author,
			book,
			oldAuthor,
			oldBook: book,
		}))
	}
};

const connectImageToBook = async (data, book) => {
	if (_.has(data, 'image')) {
		const { image } = data;

		await db.utils.queryExec(query.connectBookImage({
			image,
			book,
		}))
	}
};

module.exports = {
	addBook: async (data) => {
		try {
			const response = await db.utils.queryExec(query.insertBook(data));

			await connectAuthorToBook(data, response.insertId);
			await connectImageToBook(data, response.insertId);

			return response;

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

	updateBook: async (data) => {
		try {
			const { id } = data;

			const fieldList = _.omit(data, ['id', 'author', 'image', 'oldAuthor', 'oldImage']);
			const update = !!_.keys(fieldList).length;

			const sql = update? query.updateBook(data, id) : query.getBookById(id);

			const response = await db.utils.queryExec(sql);

			await updateAuthor(data, id);
			await connectImageToBook(data, id);

			return response;

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

	getBook: (data) => {
		return db.utils.queryExec(query.getBookList(data));
	},
};
