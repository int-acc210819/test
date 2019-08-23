const _ = require('lodash');
const Validator = require('fastest-validator');
const authorAction = require('action/author');
const imageAction = require('action/image');
const CustomError = require('component/customError');

const validator = new Validator();

const schema = {
	title: { type: "string", min: 3, max: 255 },
	description: { type: "string", min: 15, max: 65000 },
	author: { type: "number", positive: true, integer: true },
	image: { type: "number", positive: true, integer: true },
}

module.exports = async (data) => {
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

	const author = await authorAction.checkExistById(data.author);
	if (author.length === 0) {
		throw new CustomError({
			message: 'Author not exist',
			status: 400,
		})
	}

	const image = await imageAction.checkExistById(data.image);
	if (image.length === 0) {
		throw new CustomError({
			message: 'Image not exist',
			status: 400,
		})
	}

	return _.pick(data, ['title', 'description', 'author', 'image'])
};