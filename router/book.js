const Router = require('koa-router');

const validator = require('../validator/book');
const action = require('../action/book');

const router = new Router({ prefix: '/book' });

router.post('/create', async (ctx, next) => {
	const validData = validator(ctx.request.body);
	await action.addBook(validData);
	ctx.body = 'Book created';
});

module.exports = router;