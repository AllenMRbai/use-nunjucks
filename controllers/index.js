const fs=require('mz/fs');

var fn_loginPage=async (ctx,next)=>{
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
        //ctx.response.body=await fs.createReadStream('views/index.html','utf8');
        ctx.render('index.html',{name:'一叶知秋'});
    }else{
        ctx.response.body=await fs.createReadStream('views/wrong.html','utf8');
    }
}

var fn_rebase=async (ctx,next)=>{
    ctx.response.type='text/html';
    ctx.render('rebase.html',{
        name:'一叶知秋',
        text:'I don\'t know what to say!',
        products:[
            {proName:'鳌江 阿卡流事件分lazy 阿卡简单化分',price:'20'},
            {proName:'按甲方后 安静可获得',price:'56'},
            {proName:'发送 卡京东方啦空间的  垃圾袋',price:'240'},
            {proName:'自行车尽快 前后尽快打发 啊打发啊 啊萨的地方啊阿达 啊打发',price:'70'},
            {proName:'形成VB 发的 是否 发工时费的风格',price:'31'},
            {proName:'形成VB  是否公司必须 水电费是否',price:'35'},
            {proName:'水电费发是电饭锅浮点数  是东方公司晒单晒单是是发送  是否 ',price:'14'},
            {proName:'请额外热情 的萨芬 烦得很个打发多个 动画的分工的',price:'27'}
        ]
    });
}

var fn_test=async (ctx,next)=>{
    ctx.response.type='text/html';
    //console.log(await fs.readFile('views/testReadFile.html','utf8'));
    ctx.response.body=await fs.createReadStream('views/testReadFile.html');
    //ctx.response.body=await fs.createReadStream('views/testReadFile.html');
    //ctx.response.body=await fs.readFile('views/testReadFile.html');
}

module.exports={
    'GET /':fn_loginPage,
    'POST /go':fn_login,
    'GET /rebase':fn_rebase,
    'GET /test':fn_test
}