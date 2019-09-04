const Router = require('koa-router');

const validator = require('validator/book');
const action = require('action/book');

const router = new Router({ prefix: '/book' });

router.get('/', async (ctx) => {
	const validData = await validator.get(ctx.request.query);
	const result = await action.getBook(validData);
	ctx.body = { result };
});

router.post('/create', async (ctx) => {
	const validData = await validator.create(ctx.request.body);
	const result = await action.addBook(validData);
	ctx.body = { message: 'Book created', result };
});

router.put('/update/:id', async (ctx) => {
	const validData = await validator.update(ctx.request.body, ctx.params);
	await action.updateBook(validData);
	ctx.body = { message: 'Book updated' };
});

module.exports = router;