const Router = require('koa-router');

const validator = require('validator/image');
const action = require('action/image');

const router = new Router({ prefix: '/image' });

router.post('/create', async (ctx, next) => {
	const validData = await validator(ctx.request.body);
	const result = await action.addImage(validData);
	ctx.body = { message: 'Image created', result };
});

module.exports = router;