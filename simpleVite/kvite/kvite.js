const koa = require('koa')
const app = new koa()
const fs = require('fs')
const path = require('path')
const compilerSfc  = require('@vue/compiler-sfc')
const compilerDom = require("@vue/compiler-dom");



app.use(async (ctx) =>{
  const { url, query } = ctx.request;
  ctx.body = 'kvite!!!'
  if(url ==='/'){
    ctx.type = 'text/html'
    const p = path.resolve(__dirname,'./index.html')
    ctx.body = fs.readFileSync(p,'utf8')  
  }else if(url.endsWith('.js')){
    // 相应js请求
    const p = path.join(__dirname,url)
    ctx.type = 'text/javascript'
    ctx.body = rewriteImport(fs.readFileSync(p,'utf8'))
    // console.log('url',url,ctx.body);

  }else if(url.startsWith('/@modules/')){
    // console.log('进入moudles判断',url);
    
    // 获取@modules后面的部分，模块名称
    const moduleName = url.replace('/@modules/','')
    const prefix = path.join(__dirname,'../node_modules',moduleName)
    // console.log('prefix',prefix);
    
    // 要加载文件的地址
    const module = require(prefix + '/package.json').module
    const filePath = path.join(prefix,module)
    const ret = fs.readFileSync(filePath,'utf8')
    ctx.type = 'text/javascript'
    ctx.body = rewriteImport(ret)
  }else if(url.indexOf('.vue') > 1){
    // 读取vue文件内容
    const p = path.join(__dirname,url.split('?')[0])
    // 1，解析SFC，利用compileSfc
    // 2，处理内部的script
    const ret = compilerSfc.parse(fs.readFileSync(p,'utf-8'))
    // console.log('ast',ret);
    // console.log('uery.type',query.type);
    
     // 没有query.type，说明是SFC
     if (!query.type) {
        // 获取脚本内容
        const scriptContent = ret.descriptor.script.content
        // console.log('scriptContent',scriptContent);
        
        // 转换默认导出配置对象为常量
        const script = scriptContent.replace('export default','const __script =')
        // console.log('script53',script);
        // 需要rewrite一下，把vue文件中的裸模块去掉
        ctx.type= 'text/javascript'
        ctx.body = `${rewriteImport(script)}
        import {render as __render} from '${url}?type=template'
        __script.render = __render
        export default __script
        `
     }else if(query.type&&query.type === 'template'){
       
      const tpl = ret.descriptor.template.content
      console.log('tpl',tpl);
      // 编译为包含render的模块
      const render = compilerDom.compile(tpl,{mode:'module'}).code
      console.log('render',render);
      ctx.type= 'text/javascript'
      ctx.body = rewriteImport(render)
     }
  }
})


function rewriteImport(content){
  // console.log('content.',content);
  
 return content.replace(/ from ['"](.*)['"]/g,function(s0,s1) {
    // s0是匹配字符串，s1分组内容
    // 看看是不是相对地址
    if(s1.startsWith('.')||s1.startsWith('/')||s1.startsWith('../')){
      return s0
    }else{
      // console.log('module',` from '/@modules/${s1}'`);
      // 裸模块
      return ` from '/@modules/${s1}'`
    }
  })
}

app.listen( 3001,() =>{
  console.log('kvite start','http://localhost:3001/');
})