const _ = require('lodash');

const reCreateFlag = process.env.RECREATE_TABLES === 'true';

try {
	const db = require('./connect');
	const schemaList = require('./schema');
	const utils = require('./utils')(db);

	async function initDatabase() {
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
	}

	initDatabase();
} catch (err) {
	console.log('=== error in database ===\n', err);
}
