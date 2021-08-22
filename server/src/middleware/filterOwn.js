module.exports = () => {
  return async (ctx,next) => {
    ctx.state.isOwn = ctx.headers.token == 9
    await next()
  }
}