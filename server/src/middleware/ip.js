function getIP(ctx) {
  return (
    ctx.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
    ctx.connection?.remoteAddress || // 判断 connection 的远程 IP
    ctx.socket?.remoteAddress || // 判断后端的 socket 的 IP
    ctx.connection?.socket?.remoteAddress
  );
}
module.exports = app => {
  return async (ctx,next) => {
    const ipnet = require('xz-ipnet')();
    const ip = getIP(ctx)
    const city = ipnet.find(ip || "183.128.133.212").join('·')
    const navigator = ctx.headers['user-agent']
    const browser = ctx.headers['sec-ch-ua']
    ctx.state.ipInfo = {
      ip,
      city,
      navigator,
      browser
    }
    await next()
  }
}