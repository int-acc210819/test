const _ = require('lodash');

module.exports = (data) => {
	if (!_.isObject(data)) throw new Error('Input data should be object');
	if (!data.hasOwnProperty('title') ||
		!data.hasOwnProperty('description') ||
		!data.hasOwnProperty('author') ||
		!data.hasOwnProperty('image')) {
		throw new Error('Next fields is required: title, description, author, image')
	};

	return _.pick(data, ['title', 'description', 'author', 'image'])
};