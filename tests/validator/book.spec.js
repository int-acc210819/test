require('module-alias/register');
const { expect } = require('chai');
const sinon = require('sinon');

const validator = require('validator/book');
const CustomError = require('component/customError');

const authorAction = require('action/author');
const imageAction = require('action/image');

const getValidData = {
	filter: 'abc',
	size: '15',
	page: '3',
	sort: "title:asc",
};

const createValidData = {
	image: 1,
	author: 1,
	title: 'Some name book',
	description: 'About book with more than 15 characters',
};

const getAllowFieldList = ['sort', 'filter', 'page', 'size'];
const createAllowFieldList = ['title', 'description', 'author', 'image'];

describe('Validate book', () => {

	describe('get', () => {
		it('Right work', () => {
			const result = validator.get(getValidData);

			expect(result).to.be.an('object');
			expect(result).to.deep.equal(getValidData);
		});

		it('Return only allowed fields', () => {
			const extendObject = { some: 'field', ...getValidData };
			const result = validator.get(extendObject);

			expect(result).to.be.an('object');
			expect(result).to.have.all.keys(getAllowFieldList);
			expect(result).to.deep.equal(getValidData);
		});

		it('Error if wrong sort', () => {
			try {
				validator.get({ ...getValidData, ...{ sort: 'name:up' } });
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
		});
	});

	describe('create', () => {
		let getAuthorById;
		let getImageById;

		beforeEach(() => {
			getAuthorById = sinon.stub(authorAction, 'getById')
				.returns({
					result: [
						{
							id: 1,
							name: 'Pushkin',
						}
					]
				});

			getImageById = sinon.stub(imageAction, 'getById')
				.returns({
					result: [
						{
							id: 1,
							link: 'google.com/1.jpg',
						}
					]
				});
		});

		afterEach(() => {
			getAuthorById.restore();
			getImageById.restore();
		});

		it('Should work', async () => {
			const result = await validator.create(createValidData);
			expect(result).to.be.an('object');
			expect(result).to.have.all.keys(createAllowFieldList);
			expect(result).to.deep.equal(createValidData);
		});

		it('Return only allowed fields', async () => {
			const extendObject = { some: 'field', ...createValidData };
			const result = await validator.create(extendObject);

			expect(result).to.be.an('object');
			expect(result).to.have.all.keys(createAllowFieldList);
			expect(result).to.deep.equal(createValidData);
		});

		it('Request data should be object', () => {
			try {
				validator.get('data as string');
			} catch (err) {
				expect(err).to.be.instanceOf(CustomError);
				expect(err).to.have.all.keys('message', 'status', 'code');
				expect(err.message).to.deep.equal('Input data should be object');
				expect(err.status).to.equal(400);
				expect(err.code).to.equal(1);			}
		});

	});

	});