const Router = require('koa-router');

const validator = require('../validator/author');
const action = require('../action/author');

const router = new Router({ prefix: '/author' });

router.post('/create', async (ctx, next) => {
	const validData = await validator(ctx.request.body);
	await action.addAuthor(validData);
	ctx.body = 'Author created';
});

module.exports = router;