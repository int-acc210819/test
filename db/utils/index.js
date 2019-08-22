const { tableList } = require('../query');

module.exports = function (db) {
	return {
		queryExec: (sql) => new Promise((resolve, reject) => {
			db.query(sql, (err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			})
		}),

		tableList: async function () {
			const data = await this.queryExec(tableList);
			return data.map(e => Object.values(e)[0])
		},

		dropTable: function (table) {
			return this.queryExec(`DROP TABLE ${table};`)
		},

	}
};
