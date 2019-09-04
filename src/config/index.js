class Config {
	constructor(props) {
		if(!!Config.instance) {
			return Config.instance;
		}

		Config.instance = this;

		this.regexAsString = {
			sortBookInRequest: "^((id|title|author|image):(asc|desc)(,\s?)?)*$",
		};
		this.regex = {
			sortBookInRequest: new RegExp(this.regexAsString.sortBookInRequest, 'g'),
		};

		return this;
	}

};

module.exports = new Config();