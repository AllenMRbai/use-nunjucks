const temEnv=require('./template-engine');
const routes=require('./controller');
const fs=require('fs');
const path=require('path');
const Koa=require('koa');
const bodyParser=require('koa-bodyparser');
const staticFiles=require('./static-files');
const app=new Koa();

//在app注册bodyParser，让app可以读取ctx.request.body
app.use(bodyParser());

//获取静态资源
app.use(staticFiles('/assets/', __dirname + '/assets'));

//路由管理
app.use(routes());

app.listen(3000);
console.log('app started at port 3000...');