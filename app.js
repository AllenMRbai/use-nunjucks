//vendor模块
const fs=require('fs');
const path=require('path');
const Koa=require('koa');
const bodyParser=require('koa-bodyparser');//用于读取ctx.request.body的内容

//自己封装的模块
const templating=require('./templating');//模板引擎nunjucks的封装
const routes=require('./controller');//路由管理的koa-router的封装
const isProduction=process.env.NODE_ENV==='production';//生产环境需要在node的process.env配置NODE_ENV为'production'

const app=new Koa();

/*
这里对nunjucks的(higher-level)API进行测试，发现是可用的，可以将(higher-level)API理解为nunjucks的静态方法
const nunjucks=require('nunjucks');//测试nunjucks的higher-level
console.log(nunjucks.render('views/base.html',{name:'一叶知秋'}) ); 
*/

//记录URL及页面执行时间
app.use(async (ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start=new Date().getTime(),
        execTime;
    await next();
    execTime=new Date().getTime()-start;
    ctx.response.set('X-Response-Time',`${execTime}ms`);
});

//因为生产环境的静态文件是部署在反向代理服务器（如Nginx）处理
//只有在开发环境才需要staticFiles模块
if(!isProduction){
    const staticFiles=require('./static-files');//静态资源管理，自行封装的模块
    //获取静态资源
    app.use(staticFiles('/assets/', __dirname + '/assets'));
}

//在app注册bodyParser，让app可以读取ctx.request.body
app.use(bodyParser());

//开启模板引擎的渲染，在开发环境下，关闭模板引擎读取模板文件的缓存功能
app.use(templating('views',{
    noCache:!isProduction,
    watch:!isProduction
}));

//路由管理
app.use(routes());

//监听3000端口
app.listen(3000);
console.log('app started at port 3000...');