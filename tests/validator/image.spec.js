require('module-alias/register');
const { expect } = require('chai');

const validator = require('validator/image');
const CustomError = require('component/customError');

const validData = {
	link: '1.png',
};

describe('Validate image', () => {

	it('Right work', () => {
		const result = validator(validData);

		expect(result).to.be.an('object');
		expect(result).to.deep.equal(validData);
	});

	it('Return only allowed fields', () => {
		const extendObject = { some: 'field', ...validData };
		const result = validator(extendObject);

		expect(result).to.be.an('object');
		expect(result).to.have.all.keys('link');
		expect(result).to.deep.equal(validData);
	});

	it('Error when link not string', () => {
		try {
			validator({ link: 123 })
		} catch (err) {
			expect(err).to.be.instanceOf(CustomError);
			expect(err).to.have.all.keys('message', 'status', 'code');
			expect(err.message).to.deep.equal([
				{
					type: 'string',
					expected: undefined,
					actual: undefined,
					field: 'link',
					message: 'The \'link\' field must be a string!'
				}
			]);
			expect(err.status).to.equal(400);
			expect(err.code).to.equal(1);
		}
	});

	it('Error when name wrong length', () => {
		try {
			validator({ link: 'a' })
		} catch (err) {
			expect(err).to.be.instanceOf(CustomError);
			expect(err).to.have.all.keys('message', 'status', 'code');
			expect(err.message).to.deep.equal([
				{
					type: 'stringMin',
					expected: 3,
					actual: 1,
					field: 'link',
					message: 'The \'link\' field length must be greater than or equal to 3 characters long!'
				}
			]);
			expect(err.status).to.equal(400);
			expect(err.code).to.equal(1);
		}

		try {
			validator({ link: ''.padEnd(257, 'a') })
		} catch (err) {
			expect(err).to.be.instanceOf(CustomError);
			expect(err).to.have.all.keys('message', 'status', 'code');
			expect(err.message).to.deep.equal([
				{
					type: 'stringMax',
					expected: 255,
					actual: 257,
					field: 'link',
					message: 'The \'link\' field length must be less than or equal to 255 characters long!'
				}
			]);
			expect(err.status).to.equal(400);
			expect(err.code).to.equal(1);
		}
	});

	it('Error when data not object', () => {
		try {
			validator('data as string')
		} catch (err) {
			expect(err).to.be.instanceOf(CustomError);
			expect(err).to.have.all.keys('message', 'status', 'code');
			expect(err.message).to.deep.equal(
				'Input data should be object'
			);
			expect(err.status).to.equal(400);
			expect(err.code).to.equal(1);
		}
	});

	it('Error link is required', () => {
		try {
			validator({ otherKey: 'some text' })
		} catch (err) {
			expect(err).to.be.instanceOf(CustomError);
			expect(err).to.have.all.keys('message', 'status', 'code');
			expect(err.message).to.deep.equal([
				{
					type: 'required',
					expected: undefined,
					actual: undefined,
					field: 'link',
					message: 'The \'link\' field is required!'
				}
			]);
			expect(err.status).to.equal(400);
			expect(err.code).to.equal(1);
		}
	});

});