module.exports = `
created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
PRIMARY KEY (id)
`;