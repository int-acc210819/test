module.exports = {
	logger: (ctx) => {
		console.log(`[${ctx.request.method}]: ${ctx.request.url}`);
	}
};