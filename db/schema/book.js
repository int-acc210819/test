const defaultFieldList = require('../defaultFieldList');

module.exports = `CREATE TABLE book (
title VARCHAR(255) NOT NULL,
description MEDIUMTEXT NOT NULL,
${defaultFieldList}
)`;