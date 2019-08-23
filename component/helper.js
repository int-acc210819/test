const Config = require('config');

const config = new Config();

module.exports = {
	sortBookListStringToSQL: (sortString) => {
		return sortString.match(config.regex.sortBookInRequest)
	}
};