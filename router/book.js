const Router = require('koa-router');

const validator = require('../validator/book');
const action = require('../action/book');

const router = new Router({ prefix: '/book' });

router.get('/', async (ctx) => {
	const validData = await validator.get(ctx.request.query);
	const result = await action.getBook(validData);
	ctx.body = result;
});

router.post('/create', async (ctx) => {
	const validData = await validator.create(ctx.request.body);
	await action.addBook(validData);
	ctx.body = 'Book created';
});

module.exports = router;