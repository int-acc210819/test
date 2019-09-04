require('module-alias/register');
const { expect } = require('chai');
const sinon = require('sinon');

const config = require('config');


config.db = {

	utils: {
		id: 0,
		queryExec: sinon.spy(function (sql) {
			return new Promise((resolve) => {
				this.id++;
				resolve({
					insertId: this.id,
				})
			})
		}),
	}
};

const action = require('action/author');

const dataAdd = {
	name: 'Author name',
};

describe('Action author', () => {

	it('Add author', async () => {
		const result = await action.addAuthor(dataAdd);

		expect(result).to.be.an('object');
		expect(result).to.have.all.keys('id');
		expect(result.id).to.equal(1);
		expect(config.db.utils.queryExec.callCount).to.equal(1);

	});

	it('Get author by Id', async () => {
		await action.getById(dataAdd);

		expect(config.db.utils.queryExec.callCount).to.equal(2);

	});

	it('Get author by name', async () => {
		await action.getByName(dataAdd);

		expect(config.db.utils.queryExec.callCount).to.equal(3);

	});

});