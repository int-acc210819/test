const _ = require('lodash');
const database = process.env.DB_NAME;
const { sortBookListStringToSQL } = require('component/helper');

module.exports = {
	tableList: `SHOW TABLES FROM ${database};`,

	insertBook: ({title, description}) => {
		return `INSERT INTO book (title, description) VALUES ("${title}", "${description}");`
	},

	updateBook: (data, id) => {
		const updateData = _.entries(data).reduce((acc, [key, value], idx) => {
			if (idx === 0) {
				acc = `${key} = ${value}`;
				return acc;
			}

			acc = acc + `, ${key} = ${value}`;
			return acc;
		}, '');

		return `UPDATE book SET ${updateData} WHERE id = ${id};`;
	},

	connectBookAuthor: ({book, author}) => {
		return `INSERT INTO author_book (book_id, author_id) VALUES (${book}, ${author});`;
	},

	updateBookAuthor: ({book, author, oldAuthor, oldBook}) => {
		return `UPDATE author_book
SET book_id = ${book}, author_id = ${author}
WHERE (book_id = ${oldBook} AND author_id = ${oldAuthor});`
	},

	connectBookImage: ({book, image}) => {
		return `INSERT INTO book_image (book_id, image_id) VALUES (${book}, ${image});`;
	},

	insertAuthor: ({name}) => {
		return `INSERT INTO author (name) VALUES ("${name}");`
	},

	insertImage: ({link}) => {
		return `INSERT INTO image (link) VALUES ("${link}");`
	},

	getAuthorByName: (name) => `SELECT * FROM author WHERE name = ${name}`,
	getAuthorById: (id) => `SELECT * FROM author WHERE id = ${id}`,

	getImageByLink: (link) => `SELECT * FROM image WHERE link = ${link}`,
	getImageById: (id) => `SELECT * FROM image WHERE id = ${id}`,

	getBookById: (id) => `SELECT * FROM book WHERE id = ${id}`,

	getBookList: ({sort = 'id:asc', filter, page = 1, size = 15}) => {
		const from = (page - 1) * size;
		const sortArr = sortBookListStringToSQL(sort).map(e => e.split(':'));

		const orderBy = sortArr.reduce((acc, field, idx) => {
			if (idx === 0) {
				acc = `${field[0]} ${field[1].toUpperCase()}`;
				return acc;
			}

			acc = acc + `, ${field[0]} ${field[1].toUpperCase()}`;
			return acc;
		}, '');

		const where = filter ? `WHERE B.id LIKE "%${filter}%"
OR B.title LIKE "%${filter}%"
OR A.name LIKE "%${filter}%"
OR I.link LIKE "%${filter}%"` : '';

		return `SELECT
B.id, B.title, A.name AS author, I.link AS image
FROM book as B
LEFT JOIN author_book as AB ON AB.book_id = B.id
LEFT JOIN author as A ON A.id = AB.author_id
LEFT JOIN book_image AS BI ON BI.book_id = B.id
LEFT JOIN image AS I ON I.id = BI.image_id
${where}
ORDER BY ${orderBy}
LIMIT ${from}, ${size};`;
	},
};