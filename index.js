require('dotenv').config();
require('module-alias/register');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const config = require('config');
const db = require('db/connect');
const utils = require('db/utils')(db);
config.db = {
	connect: db,
	utils,
};

(async () => {

	const bookRouter = require('./router/book');
	const authorRouter = require('./router/author');
	const imageRouter = require('./router/image');


	const errorHandler = require('./middleware/error');

	const app = new Koa();
	app.use(bodyParser());

// Error handler
	app.use(errorHandler.handler);
	app.on('error', errorHandler.response);

	app
		.use(bookRouter.routes())
		.use(authorRouter.routes())
		.use(imageRouter.routes())
		.use(bookRouter.allowedMethods())
		.use(authorRouter.allowedMethods())
		.use(imageRouter.allowedMethods());

	app.listen(process.env.PORT, () => {
		console.log(`App start on ${process.env.PORT} port`)
	});
})();