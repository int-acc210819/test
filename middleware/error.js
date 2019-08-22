const infoHandler = require('./info');

module.exports = {
	handler: async (ctx, next) => {
		try {
			// logger
			infoHandler.logger(ctx);

			await next();

		} catch (err) {
			ctx.status = err.status || 500;
			ctx.body = err.message || 'Unknown error';
			ctx.app.emit('error', err, ctx);
		}
	},

	response: ((err, ctx) => {
		console.log(err.message || err);
	})
}