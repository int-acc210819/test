const config = require('config');

module.exports = {
	sortBookListStringToSQL: (sortString) => {
		return sortString.match(config.regex.sortBookInRequest)
	}
};