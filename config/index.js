class Config {
	constructor(props) {
		if(!!Config.instance) {
			return Config.instance;
		}

		Config.instance = this;

		this.regex = {
			sortBookInRequest: /((id|title|author|image):(asc|desc))/g
		};

		return this;
	}

};

module.exports = new Config();