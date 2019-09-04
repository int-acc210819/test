const defaultFieldList = require('../defaultFieldList');

module.exports = (name) => `CREATE TABLE IF NOT EXISTS ${name} (
link VARCHAR(512) NOT NULL,
UNIQUE KEY link (link),
${defaultFieldList}
) ENGINE=InnoDB;`;
