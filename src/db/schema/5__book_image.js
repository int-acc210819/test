module.exports = (name) => `CREATE TABLE IF NOT EXISTS ${name} (
book_id INT NOT NULL,
image_id INT NOT NULL,
PRIMARY KEY (book_id, image_id)
) ENGINE=InnoDB;`;
