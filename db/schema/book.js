const defaultFieldList = require('../defaultFieldList');

module.exports = (name) => `CREATE TABLE ${name} (
title VARCHAR(255) NOT NULL,
description MEDIUMTEXT NOT NULL,
UNIQUE KEY title (title),
${defaultFieldList}
)`;
