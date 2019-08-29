require('dotenv').config();
require('module-alias/register');
const fs = require('fs');
const _ = require('lodash');

const triggerList = require('db/trigger');
const relationList = require('db/relation');

// get schema list for tables
const schemaList = fs.readdirSync(__dirname + '/db/schema').reduce((acc, file) => {
	if (file !== 'index.js') {
		const table = file.split('.')[0];
		const name = table.split('__')[1];

		acc[table] = require(`db/schema/${file}`)(name);
		return acc;
	}
}, {});

try {
	const db = require('db/connect');
	const utils = require('db/utils')(db);

	(async function () {
		// init tables
		const tableList = [];
		for (const [fileName, sql] of _.entries(schemaList).sort()) {
			const name = fileName.split('__')[1];
			tableList.push(utils.queryExec(sql));
			console.log(`Table [ "${name}" ] in pack`)
		}
		await Promise.all(tableList);
		console.log('Table was created');

		// init triggers
		for ( const sql of triggerList) {
			await utils.queryExec(sql);
		}
		console.log('Triggers included');

		// init relations
		for ( const sql of relationList) {
			await utils.queryExec(sql);
		}
		console.log('Relations included');

		process.exit();
	}())

} catch (err) {
	console.log('=== error in database ===\n', err);
}
