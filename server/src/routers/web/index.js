// 注意require('koa-router')返回的是函数:
const router = require("koa-router")();
const Models = require("../../../db/models");
const BodyParser = require("post-bodyparser");
const https = require('https');
const net = require('net');
const si = require('systeminformation');
const ipMiddleware = require("../../middleware/ip")
const filterOwnMiddleware = require("../../middleware/filterOwn")


function getNetworkIP() {
  return new Promise((resolve,reject)=>{
      let createConnection = net.createConnection;
      //进行socket 连接的地址
      var socket = createConnection(80, 'www.coco727.com')
      socket.on('connect', function() {
          resolve(socket.address().address)
          socket.end()
          socket.destroy()
      })
      socket.on('error', function(e) {
          resolve('')
      })
  })
}
function getNetwork(){
  return new Promise(async (resolve, reject) => {
      let ip = await getNetworkIP();
      console.log(ip,'ip')
      si.networkInterfaces().then(data => {
          data.map((val)=>{
              if(val.ip4==ip){
                  resolve(val);
              }
          })
      }).catch(error => {
          reject();
      });
  })
}

//output: [ '中国', '江苏', '南京', '' ]
// const options = {
//   hostname: 'ip.taobao.com',
//   port: 443,
//   method: 'POST',
//   path:'/service/getIpInfo.php',
//   headers:{
//     'Content-Type': 'application/json',

//     'Content-Length': JSON.stringify('183.128.133.212').length
    
//     }
// };

// const req = https.request(options, (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);

//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });
// });

// req.on('error', (e) => {
//   console.error(e);
// });
// req.write(JSON.stringify('183.128.133.212'));
// req.end();


const path = require("path");
router.get("/web/blog", async (ctx, next) => {
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
router.get("/web/blog/:id", async (ctx, next) => {
  const res = await Models.Blogs.findOne({
    where: { id: ctx.request.params.id },
  });
  // 设置response的内容:
  ctx.response.body = {
    data: res,
    success: true,
  };
});
router.post("/web/user", ipMiddleware(), async (ctx, next) => {
  const res = await Models.Users.create({...ctx.request.body,...ctx.state.ipInfo});
  // 设置response的内容:
  ctx.response.body = {
    data: res,
    success: true,
  };
});
router.get("/web/message", async (ctx, next) => {
  console.log(ctx.headers.token,'token')
  const res = await Models.Messages.findAll();
  // console.log(res, "/web/message")
  // const parentComments = res.filter((r) => !r.parent)
  // parentComments.forEach((c) => {
  //   return (c.comments = res.filter((v) => v.parent === c.id));
  // });
  // 设置response的内容:
  ctx.response.body = {
    current: 1,
    data: res,
    pageSize: "20",
    success: true,
    total: 100,
  };
});
router.post("/web/message", ipMiddleware(), async (ctx, next) => {
  console.log(ctx.state);
  const res = await Models.Messages.create({...ctx.request.body, ...ctx.state.ipInfo});
  ctx.response.body = res;
});
router.get("/web/statistics", async (ctx, next) => {
  console.log(ctx.socket,'socket')
  const blogs = await Models.Blogs.findAll();
  const messages = await Models.Messages.findAll();
  console.log(blogs.length, messages.length)
  // const comments = await Models.Comments.findAll();

  // 设置response的内容:
  ctx.response.body = {
    data: {
        currentTime: new Date(),
        blogTotal: blogs.length,
        messageTotal: messages.length,
        // commentTotal: comments.count,
        pvTotal: 100,
        currentVisitors: '',
        whichVisitor: ''
    },
  };
});
router.get("/web/init", async (ctx, next) => {
    
});
const OSS = require("ali-oss");
const config = require("../../pluglins/tranAccessKey");
const client = new OSS(config);

router.post("/admin/uploadOss", async (ctx, next) => {
  let file = ctx.request.req;
  let fileData = await new BodyParser(file).formData();
  try {
    let result = await client.put(
      fileData.file.filename,
      path.normalize(fileData.file.value)
    );
    ctx.response.body = { name: result.name, url: result.url };
  } catch (e) {
    console.log(e);
    ctx.response.body = e;
  }
});
module.exports = router;
