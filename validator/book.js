const _ = require('lodash');
const Validator = require('fastest-validator');
const authorAction = require('action/author');
const imageAction = require('action/image');
const CustomError = require('component/customError');
const config = require('config');

const validator = new Validator();

const schemaCreate = {
	title: { type: "string", min: 3, max: 255 },
	description: { type: "string", min: 15, max: 65000 },
	author: { type: "number", positive: true, integer: true },
	image: { type: "number", positive: true, integer: true },
};

const schemaRead = {
	sort: { type: "string", min: 3, max: 255, pattern: config.regex.sortBookInRequest, optional: true },
	filter: { type: "string", min: 1, max: 1000, optional: true },
	size: { type: "number", positive: true, integer: true, optional: true, convert: true },
	page: { type: "number", positive: true, integer: true, optional: true, convert: true },
};

module.exports = {
	create: async (data) => {
		if (!_.isObject(data)) throw new Error('Input data should be object');

		const check = validator.compile(schemaCreate);
		const valid = check(data);

		if (valid !== true) {
			throw new CustomError({
				message: validator.validate(data, schemaCreate),
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
	},

	get: (data) => {
		if (!_.isObject(data)) throw new Error('Input data should be object');

		const check = validator.compile(schemaRead);
		const valid = check(data);

		if (valid !== true) {
			throw new CustomError({
				message: validator.validate(data, schemaRead),
				status: 400,
				code: 1,
			})
		};

		return _.pick(data, ['sort', 'filter', 'page', 'size'])
	}

};