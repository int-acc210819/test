const _ = require('lodash');
const { db } = require('config');
const query = require('db/query');
const errorHandler = require('component/actionErrorHandler');

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

const updateImage = async (data, book) => {
	if (_.has(data, 'image')) {
		const { image, oldImage } = data;
		await db.utils.queryExec(query.updateBookImage({
			image,
			book,
			oldImage,
			oldBook: book,
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
			errorHandler(err);
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
			await updateImage(data, id);

			return response;

		} catch (err) {
			errorHandler(err);
		}
	},

	getBook: (data) => {
		return db.utils.queryExec(query.getBookList(data));
	},
};
