const defaultFieldList = require('../defaultFieldList');

module.exports = (name) => `CREATE TABLE ${name} (
link MEDIUMTEXT NOT NULL,
${defaultFieldList}
)`;
