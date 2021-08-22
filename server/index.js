const Koa = require("koa");
const koaStatic = require("koa-static");
const bodyParser = require("koa-bodyparser");
const adminRouter = require("./src/routers/admin/index");
const webRouter = require("./src/routers/web/index");
// 导入WebSocket模块:
// const WebSocket = require("ws");

// 引用Server类:
// const WebSocketServer = WebSocket.Server;

var npm = require('getmac');//获取mac地址
console.log(npm,npm.default(),'getmacs')
//获取机器mac地址
// npm.getMac(function(err,macAddress){
//     if (err)  throw err;
//     var mac = macAddress; //获取mac地址
//     console.log(mac);     
// })
const socketIo = require("socket.io");
const app = new Koa();
app.use(bodyParser());
// add router middleware:
app.use(adminRouter.routes());
// app.use(adminRouter)
// app.use(adminRouter())
// adminRouter(app)
app.use(webRouter.routes());
app.use(koaStatic(__dirname + "/"));
const server = require("http").createServer(app.callback());
const io = socketIo(server);
let users = [];
let numClients = 0;
io.on("connection", function (socket) {
  let address = socket.handshake.address;
  console.log(
    "a user connected",
    socket,
    address,
    socket.handshake.headers["x-forwarded-for"],
    socket.request.connection.remoteAddress
  );
  numClients++;
  socket.emit("stats", { numClients: numClients });
  console.log("connection Connected clients:", numClients);
  socket.broadcast.emit("stats", { numClients: numClients });
  socket.on("disconnect", function () {
    numClients--;
    socket.emit("stats", { numClients: numClients });
    socket.broadcast.emit("stats", { numClients: numClients });
    console.log("disconnect Connected clients:", numClients);
  });

  //     io.on('login',function(data){

  //           io.username = data.username;
  //           users.push(data.username);
  //           // 统计连接数
  //           io.emit('users',{number:users.length});  // 发送给自己
  //           io.broadcast.emit('users',{number:users.length}); // 发送给其他人

  //     });
  //     io.on('logout',function(data){

  //           io.username = data.username;
  //           users=users.slice(0,users.length-1);
  //           console.log()
  //       //      统计连接数
  //           io.emit('users',{number:users.length});  // 发送给自己
  //           io.broadcast.emit('users',{number:users.length}); // 发送给其他人

  //     });
});

server.listen(3000);

// 实例化:
// const wss = new WebSocketServer({
//       server: app.listen(3000)
// });
// let numClients = 0;
// wss.on('connection', function (ws) {
//     numClients++
//     console.log(`[SERVER] connection()`);
//     ws.on('message', function (message) {
//         console.log(`[SERVER] Received: ${message}`);
//         ws.send(`ECHO: ${message} ${numClients}`, (err) => {
//             if (err) {
//                 console.log(`[SERVER] error: ${err}`);
//             }
//         });
//     })
// });
// let ws = new WebSocket('ws://localhost:3000/test');

// // 打开WebSocket连接后立刻发送一条消息:
// ws.on('open', function () {
//     console.log(`[CLIENT] open()`);
//     ws.send('Hello!');
// });

// // 响应收到的消息:
// ws.on('message', function (message) {
//     console.log(`[CLIENT] Received: ${message}`);
// })
console.log("app started at port 3000...");
