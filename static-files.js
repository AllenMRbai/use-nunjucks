const path=require('path');
const mime=require('mime');
//该模块的fs和node自带的fs是一样的
//唯一不同的是node自带的fs使用回调，但mz封装的fs为promise对象,这样方便我们使用await，而不是回调
const fs=require('mz/fs');

//url:类似'/static/'
//dir:类似__dirname+'/static'
function staticFiles(url,dir){
    return async (ctx,next)=>{
        let rpath=ctx.request.path;
        //console.log("yeyeyeyeyeyeey");
        //console.log(rpath);
        //console.log(`path:${rpath} url:${ctx.request.url}`);
        //判断是否以指定的url开头：
        if(rpath.startsWith(url)){
            //获取文件完整地址
            let fp=path.join(dir,rpath.substring(url.length));
            //判断文件是否存在
            if(await fs.exists(fp)){
                //查找文件的mime:
                ctx.response.type=mime.lookup(rpath);
                //读取文件内容并赋值给response.body
                ctx.response.body=await fs.readFile(fp);
            }else{
                //文件不存在
                ctx.response.status=404;
            }
        }else{
            //不是指定前缀的URL,继续处理下一个middleware
            await next();
        }
    }
}
module.exports=staticFiles;