const defaultFieldList = require('../defaultFieldList');

module.exports = (name) => `CREATE TABLE IF NOT EXISTS ${name} (
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
UNIQUE KEY title (title),
${defaultFieldList}
) ENGINE=InnoDB;`;
