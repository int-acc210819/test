module.exports = (name) => `CREATE TABLE IF NOT EXISTS ${name} (
book_id INT(10) UNSIGNED ZEROFILL,
author_id INT(10) UNSIGNED ZEROFILL,
PRIMARY KEY (book_id, author_id)
) ENGINE=InnoDB;`;

