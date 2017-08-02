const fs=require('fs');

var fn_loginPage=async (ctx,next)=>{
    cons(ctx);
    ctx.response.type='text/html';
    ctx.response.body=await fs.createReadStream('views/login.html','utf8');
}

var fn_login=async (ctx,next)=>{
    cons(ctx);
    let
        name=ctx.request.body.name || 'Allen',
        password=ctx.request.body.password;
        console.log(name,password);
    ctx.response.type='text/html';
    if(name==='Allen' && password=='123456'){
        ctx.response.body=await fs.createReadStream('views/index.html','utf8');
    }else{
        ctx.response.body=await fs.createReadStream('views/wrong.html','utf8');
    }
}

function cons(ctx){
    console.log(`method:${ctx.request.method} url:${ctx.request.url}`);
}

module.exports={
    'GET /':fn_loginPage,
    'POST /go':fn_login
}