const infoHandler = require('./info');

module.exports = {
	handler: async (ctx, next) => {
		try {
			// logger
			infoHandler.logger(ctx);

			await next();

		} catch (err) {
			const { status = 500, message, code } = err;

			ctx.status = status;
			ctx.body = {
				message,
				code,
			};
			ctx.app.emit('error', err, ctx);
		}
	},

	response: ((err, ctx) => {
		console.log(err);
	})
}