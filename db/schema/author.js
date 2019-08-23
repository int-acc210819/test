const defaultFieldList = require('../defaultFieldList');

module.exports = (name) => `CREATE TABLE ${name} (
name VARCHAR(255) NOT NULL,
UNIQUE KEY name (name),
${defaultFieldList}
)`;
