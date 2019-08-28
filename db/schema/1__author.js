const defaultFieldList = require('../defaultFieldList');

module.exports = (name) => `CREATE TABLE IF NOT EXISTS ${name} (
name VARCHAR(255) NOT NULL,
UNIQUE KEY name (name),
${defaultFieldList}
) ENGINE=InnoDB;`;
