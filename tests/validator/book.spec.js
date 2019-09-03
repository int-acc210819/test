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

const getAllowFieldList = ['sort', 'filter', 'page', 'size'];

describe('Validate book', () => {

	describe('get', () => {
		it('Right work', () => {
			const result = validator.get(validData);

			expect(result).to.be.an('object');
			expect(result).to.deep.equal(validData);
		});

		it('Return only allowed fields', () => {
			const extendObject = { some: 'field', ...validData };
			const result = validator.get(extendObject);

			expect(result).to.be.an('object');
			expect(result).to.have.all.keys(getAllowFieldList);
			expect(result).to.deep.equal(validData);
		});

		it('Error if wrong sort', () => {
			try {
				validator.get({ ...validData, ...{ sort: 'name:up' } });
			} catch (err) {
				expect(err).to.be.instanceOf(CustomError);
				expect(err).to.have.all.keys('message', 'status', 'code');
				expect(err.message).to.deep.equal([
					{
						actual: undefined,
						type: 'string',
						expected: /^((id|title|author|image):(asc|desc)(,s?)?)*$/g,
						field: 'sort',
						message: 'The \'sort\' field fails to match the required pattern!',
						type: 'stringPattern',
					}
				]);
				expect(err.status).to.equal(400);
				expect(err.code).to.equal(1);			}
		});

		it('Request data sould be object', () => {
			try {
				validator.get('data as string');
			} catch (err) {
				expect(err).to.be.instanceOf(CustomError);
				expect(err).to.have.all.keys('message', 'status', 'code');
				expect(err.message).to.deep.equal('Input data should be object');
				expect(err.status).to.equal(400);
				expect(err.code).to.equal(1);			}
		})
	});

});