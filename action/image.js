const CustomError = require('component/customError.js');
const Config = require('config');
const query = require('db/query');
const { db } = new Config();

module.exports = {
	addImage: async (data) => {
		try {
			const res = await db.utils.queryExec(query.insertImage(data));
			return res;
		} catch (err) {
			if (err.sqlMessage && err.sqlMessage.indexOf('Duplicate entry') !== -1) {
				throw new CustomError({
					message: err.sqlMessage,
					status: 400,
					code: err.errno,
				})
			}
		}
	},
	checkExistByLink: (name) => db.utils.queryExec(query.checkExistImageByLink(name)),
	checkExistById: (id) => db.utils.queryExec(query.checkExistImageById(id)),
};
