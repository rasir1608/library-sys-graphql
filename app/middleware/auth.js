module.exports = () => async function auth(ctx, next) {
  if (ctx.path.includes('/auth')) {
    await next();
  } else if (!ctx.session.user) {
    ctx.body = {
      ok: false,
      message: '请先登录',
      status: 304,
      data: null,
    };
  }
};
