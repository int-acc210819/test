const defaultFieldList = require('../defaultFieldList');

module.exports = (name) => `CREATE TABLE ${name} (
link TEXT NOT NULL,
UNIQUE KEY link (link),
${defaultFieldList}
)`;
