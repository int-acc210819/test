const database = process.env.DB_NAME;

module.exports = {
	tableList: `SHOW TABLES FROM ${database};`,
	insertBook: ({title, description}) => {
		return `INSERT INTO book (title, description) VALUES ("${title}", "${description}");`
	},
};