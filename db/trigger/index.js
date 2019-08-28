module.exports = [
	`CREATE TRIGGER when_update_author_book_set_book_update_time AFTER UPDATE ON author_book
	 FOR EACH ROW
	 UPDATE book
		 SET updated = CURRENT_TIMESTAMP
		 WHERE id = NEW.book_id;`
];
