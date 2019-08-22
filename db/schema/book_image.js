const defaultFieldList = require('../defaultFieldList');

module.exports = (name) => `CREATE TABLE ${name} (
book_id INT NOT NULL,
image_id INT NOT NULL,
${defaultFieldList}
)`;
