const nunjucks=require('nunjucks');

function createEnv(path,opts){
    let
        autoescape=opts.autoescape===undefined?true:opts.autoescape,
        noCache=opts.noCache || false,
        watch=opts.watch || false,
        throwOnUndefined=opts.throwOnUndefined || false,
        env=new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path,{
                noCache:noCache,
                watch:watch
            }),{
                autoescape:autoescape,
                throwOnUndefined:throwOnUndefined
            });
    if(opts.filters){
        for(let f in opts.filters){
            env.addFilter(f,opts.filters[f]);
        }
    }
    return env;
}

/*
const env=createEnv('view',{
    noCache:true,
    watch:true,
    filters:{
        hex:function(n){
            return '0x'+n.toString(16);
        }
    }
});
*/

function templating(path,opts){
    //创建Nunjucks的env对象
    var env=createEnv(path,opts);
    return async (ctx,next)=>{
        //给ctx绑定render函数
        ctx.render=function(view,model){
            //console.log("这里这里")
            //console.log(ctx.state)
            //把render后的内容赋值给response.body
            ctx.response.body=env.render(view,Object.assign({},ctx.state || {}, model || {}));
            //设置Content-Type
            ctx.response.type='text/html';
        };
        //继续处理请求
        console.log("绑定render函数")
        await next();
    };
}

module.exports=templating;