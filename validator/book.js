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

const schemaUpdate = {
	id: { type: "number", positive: true, integer: true, convert: true },
	title: { type: "string", min: 3, max: 255, optional: true },
	description: { type: "string", min: 15, max: 65000, optional: true },
	author: { type: "number", positive: true, integer: true, optional: true },
	oldAuthor: { type: "number", positive: true, integer: true, optional: true },
	image: { type: "number", positive: true, integer: true, optional: true },
};

const schemaRead = {
	sort: { type: "string", min: 3, max: 255, pattern: config.regex.sortBookInRequest, optional: true },
	filter: { type: "string", min: 1, max: 1000, optional: true },
	size: { type: "number", positive: true, integer: true, optional: true, convert: true },
	page: { type: "number", positive: true, integer: true, optional: true, convert: true },
};

module.exports = {
	mainInsert: async (data, schema) => {
		if (!_.isObject(data)) throw new CustomError({
			message: 'Input data should be object',
			status: 400,
			code: 1,
		});

		const check = validator.compile(schema);
		const valid = check(data);

		if (valid !== true) {
			throw new CustomError({
				message: validator.validate(data, schema),
				status: 400,
				code: 1,
			})
		}

		if (_.has(data, 'author')) {
			const author = await authorAction.getById(data.author);
			if (author.length === 0) {
				throw new CustomError({
					message: 'Author not exist',
					status: 400,
				})
			}
		}


		if (_.has(data, 'image')) {
			const image = await imageAction.getById(data.image);
			if (image.length === 0) {
				throw new CustomError({
					message: 'Image not exist',
					status: 400,
				})
			}
		}

		return data;
	},

	create: async function (data) {
		const result = await this.mainInsert(data, schemaCreate);
		return _.pick(result, ['title', 'description', 'author', 'image', 'id']);
	},

	update: async function (data, id) {
		if (data.author && !data.oldAuthor) throw new CustomError({
			message: 'While update author, should send both old author and new',
			status: 400,
		});

		const result = await this.mainInsert({...data, ...id}, schemaUpdate);
		return _.pick(result, [
			'title', 'description', 'author',
			'oldAuthor', 'oldImage', 'image',
			'id'
		]);
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
		}

		return _.pick(data, ['sort', 'filter', 'page', 'size'])
	}

};