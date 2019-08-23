const database = process.env.DB_NAME;

module.exports = {
	tableList: `SHOW TABLES FROM ${database};`,

	insertBook: ({title, description}) => {
		return `INSERT INTO book (title, description) VALUES ("${title}", "${description}");`
	},

	connectBookAuthor: ({book, author}) => {
		return `INSERT INTO author_book (book_id, author_id) VALUES (${book}, ${author});`;
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

	checkExistAuthorByName: (name) => `SELECT * FROM author WHERE name = ${name}`,
	checkExistAuthorById: (id) => `SELECT * FROM author WHERE id = ${id}`,

	checkExistImageByLink: (link) => `SELECT * FROM image WHERE link = ${link}`,
	checkExistImageById: (id) => `SELECT * FROM image WHERE id = ${id}`,
};