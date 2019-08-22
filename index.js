require('dotenv').config();
const Koa = require('koa');

const bookRouter = require('./router/book');

const errorHandler = require('./middleware/error');

const app = new Koa();

// Error handler
app.use(errorHandler.handler);
app.on('error', errorHandler.response);

app
	.use(bookRouter.routes())
	.use(bookRouter.allowedMethods());

app.listen(process.env.PORT, () => {
	console.log(`App start on ${process.env.PORT} port`)
});