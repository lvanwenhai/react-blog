// 注意require('koa-router')返回的是函数:
const router = require("koa-router")();
const Models = require("../../../db/models");
const crypto = require("crypto");
const BodyParser = require("post-bodyparser");
const fs = require("fs");
const co = require('co');
const path = require("path")
const formidable = require("formidable");
router.get("/admin/blog", async (ctx, next) => {
  const res = await Models.Blogs.findAll();
  // 设置response的内容:
  ctx.response.body = {
    current: 1,
    data: res,
    pageSize: "20",
    success: true,
    total: 100,
  };
});

router.post("/admin/blog", async (ctx, next) => {
  console.log(ctx.request.body);
  const res = await Models.Blogs.create(ctx.request.body);
  // 设置response的内容:
  ctx.response.body = res;
});
router.delete("/admin/blog", async (ctx, next) => {
  console.log(ctx.request.body);
  const res = await Models.Blogs.destroy({
    where: { id: ctx.request.body.id },
  });
  // 设置response的内容:
  ctx.response.body = res;
});

const OSS = require("ali-oss");
const config = require("../../pluglins/tranAccessKey");
const client = new OSS(config);

router.post("/admin/uploadOss", async (ctx, next) => {
  let file = ctx.request.req;
  let fileData = await new BodyParser(file).formData();
  try {
    let result = await client.put(fileData.file.filename, path.normalize(fileData.file.value));
    ctx.response.body = {name: result.name,url:result.url};
  } catch (e) {
    console.log(e);
    ctx.response.body = e
  }
});


router.get("/admin/ossList", async (ctx, next) => {
  let result = await client.list();
  console.log(result);
  ctx.response.body = {data: result.objects}
});
router.delete("/admin/ossList", async (ctx, next) => {
  const { name } = ctx.request.body
  let result = await client.delete(name);
  ctx.response.body = result
});
module.exports = router;
// 第2种
// const router = require('koa-router')();
// router.post('/admin/blog',async (ctx, next) => {
//   console.log(ctx,'ctx',ctx.request,ctx.request.body)
//   ctx.response.type = 'text/html';
//   // 设置response的内容:
//   ctx.response.body = '<h1>Hello, koa2!</h1>';
// })
// // module.exports = router.routes()
// module.exports = () => { return router.routes() }

// 第3种
// module.exports = (app) => {
// const router = require('koa-router')();
// router.post('/admin/blog',async (ctx, next) => {
//   console.log(ctx,'ctx',ctx.request,ctx.request.body)
//   ctx.response.type = 'text/html';
//   // 设置response的内容:
//   ctx.response.body = '<h1>Hello, koa2!</h1>';
// })
// app.use(router.routes())
// }
