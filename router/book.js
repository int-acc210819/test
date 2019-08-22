const Router = require('koa-router');
require('../db');

const router = new Router({ prefix: '/book' });
router.get('/', (ctx, next) => {
	throw new Error('some error 123')
});

module.exports = router;