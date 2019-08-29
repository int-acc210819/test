module.exports = [
	`CREATE TRIGGER when_update_author_book_set_book_update_time AFTER UPDATE ON author_book
	 FOR EACH ROW
	 UPDATE book
		 SET book.updated = CURRENT_TIMESTAMP
		 WHERE book.id = NEW.book_id;`
];
