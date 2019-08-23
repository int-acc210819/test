require('dotenv').config();
require('module-alias/register');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const initDb = require('./db');
(async () => {
	await initDb();

	const bookRouter = require('./router/book');

	const errorHandler = require('./middleware/error');

	const app = new Koa();
	app.use(bodyParser());

// Error handler
	app.use(errorHandler.handler);
	app.on('error', errorHandler.response);

	app
		.use(bookRouter.routes())
		.use(bookRouter.allowedMethods());

	app.listen(process.env.PORT, () => {
		console.log(`App start on ${process.env.PORT} port`)
	});
})();