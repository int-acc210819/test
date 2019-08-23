module.exports = class Config {
	constructor(props) {
		if(!!Config.instance) {
			return Config.instance;
		}

		Config.instance = this;

		return this;
	}

};
