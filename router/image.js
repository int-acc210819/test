const Router = require('koa-router');

const validator = require('validator/image');
const action = require('action/image');

const router = new Router({ prefix: '/image' });

router.post('/create', async (ctx, next) => {
	const validData = await validator(ctx.request.body);
	await action.addImage(validData);
	ctx.body = 'Image created';
});

module.exports = router;