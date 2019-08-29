module.exports = [
	`CREATE TRIGGER when_update_book_author_set_book_update_time AFTER UPDATE ON author_book
	 FOR EACH ROW
	 UPDATE book
		 SET book.updated = CURRENT_TIMESTAMP
		 WHERE book.id = NEW.book_id;`,

	`CREATE TRIGGER when_update_book_image_set_book_update_time AFTER UPDATE ON book_image
	 FOR EACH ROW
	 UPDATE book
		 SET book.updated = CURRENT_TIMESTAMP
		 WHERE book.id = NEW.book_id;`,
];
