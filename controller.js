const fs=require('fs');
const path=require('path');

function addMapping(router,mapping){
    for(let url in mapping){
        if(url.startsWith('GET')){
            let path=url.substring(4);
            router.get(path,mapping[url]);
        }else if(url.startsWith('POST')){
            let path=url.substring(5);
            router.post(path,mapping[url]);
        }else{
            console.log(`invalid URL:${url}`);
        }
    }
}

function addControllers(router,dir){
    let cPath=path.join(__dirname,dir);
    
    let files=fs.readdirSync(cPath);
    let js_files=files.filter((f)=>{
        return f.endsWith('.js');
    });
    //console.log( 'lalalalalala'+typeof js_files);
    for (let f of js_files){
       console.log(`process controller:${f}...`);
       let jsPath=path.join(cPath,f);
       let mapping=require(jsPath);
       addMapping(router,mapping);
    }
}

module.exports=function(dir){
    let 
        controllers_dir=dir || 'controllers',
        router=require('koa-router')();
    addControllers(router,controllers_dir);
    console.log('配置路由')
    return router.routes();
}