const defaultFieldList = require('../defaultFieldList');

module.exports = `CREATE TABLE user (
name VARCHAR(255) NOT NULL,
${defaultFieldList}
)`;;