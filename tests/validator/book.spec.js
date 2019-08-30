require('module-alias/register');
const { expect } = require('chai');

const validator = require('validator/book');
const CustomError = require('component/customError');

const validData = {
	filter: 'abc',
	size: '15',
	page: '3',
	sort: "title:asc",
};

const getAllowFieldList = ['filter', 'page', 'size'];

describe('Validate image', () => {

	describe('get', () => {
		it('Right work \'get\'', () => {
			const result = validator.get(validData);

			expect(result).to.be.an('object');
			expect(result).to.deep.equal(validData);
		});

		it('Return only allowed fields in \'get\'', async () => {
			const extendObject = { some: 'field', ...validData };
			const result = await validator.get(validData);

			// expect(result).to.be.an('object');
			// expect(result).to.have.all.keys(getAllowFieldList);
			// expect(result).to.deep.equal(validData);
		});
	});

});