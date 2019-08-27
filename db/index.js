const fs = require('fs');
const _ = require('lodash');

const config = require('config');

// get schema list for tables
const schemaList = fs.readdirSync(__dirname + '/schema').reduce((acc, file) => {
	if (file !== 'index.js') {
		const table = file.split('.')[0];
		acc[table] = require(`./schema/${file}`)(table);
		return acc;
	}
}, {});

const reCreateFlag = process.env.RECREATE_TABLES === 'true';

try {
	const db = require('./connect');
	const utils = require('./utils')(db);

	module.exports = async function initDatabase() {
		let tableList = await utils.tableList();
		for (const [name, sql] of _.entries(schemaList)) {
			if (!tableList.includes(name)) {
				await utils.queryExec(sql);
				console.log(`Table "${name}" created`)
			} else {
				console.log(`Table "${name}" exist`);

				// drop than create tables
				if (reCreateFlag) {
					const resDelete = await utils.dropTable(name);
					console.log(`Table "${name}" deleted`)
					await utils.queryExec(sql);
					console.log(`Table "${name}" re-created`)
				}
			}
		};

		config.db = {
			connect: db,
			utils,
		};
	}

} catch (err) {
	console.log('=== error in database ===\n', err);
}
