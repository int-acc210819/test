module.exports = [
	`SET foreign_key_checks=0;`,
	`ALTER TABLE author_book
ADD CONSTRAINT book FOREIGN KEY (book_id) REFERENCES book(id)
ON UPDATE CASCADE;`,
	`ALTER TABLE author_book
ADD CONSTRAINT author FOREIGN KEY (author_id) REFERENCES author(id)
ON UPDATE CASCADE;`,
];