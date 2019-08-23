const _ = require('lodash');
const Validator = require('fastest-validator');
const CustomError = require('component/customError');

const validator = new Validator();

const schema = {
	link: { type: "string", min: 3, max: 65000 },
};

module.exports = (data) => {
	if (!_.isObject(data)) throw new Error('Input data should be object');

	const check = validator.compile(schema);
	const valid = check(data);

	if (valid !== true) {
		throw new CustomError({
			message: validator.validate(data, schema),
			status: 400,
			code: 1,
		})
	};

	return _.pick(data, ['link'])
};