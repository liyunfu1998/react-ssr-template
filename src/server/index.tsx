import express from 'express'
import childProcess from 'child_process'
import {renderToString} from 'react-dom/server'
import path from 'path'
import router from '@/router'
import {Route, RouteObject, Routes, matchRoutes} from 'react-router-dom'
import {StaticRouter} from 'react-router-dom/server'
import {Helmet} from 'react-helmet'
import {Provider} from 'react-redux'
import store from '@/stores/serverStore'

const app = express()

app.use(express.static(path.resolve(process.cwd(),'client_build')))

app.get('*', (req,res)=>{
  const routeMap = new Map<string, ()=>Promise<any>>() // path - loadData的map
  // 对router遍历，拿到loadData的方法，然后执行
  router?.forEach(item=>{
    if(item.path && item.loadData){
      routeMap.set(item.path,item.loadData(store))
    }
  })

  // 匹配当前路由的routes
  const matchedRoutes = matchRoutes(router as RouteObject[], req.path)

  const promises:Array<()=> Promise<any>> = []

  matchedRoutes?.forEach(item=>{
    if(routeMap.has(item.pathname)){
      promises.push(routeMap.get(item.pathname) as ()=>Promise<any>)
    }
  })

  Promise.all(promises).then(()=>{
     const content = renderToString(
       <Provider store={store}>
         <StaticRouter location={req.path}>
           <Routes>
             {router?.map((item, index) => {
               return <Route key={index} {...item} />;
             })}
           </Routes>
         </StaticRouter>
       </Provider>
     );

     const helmet = Helmet.renderStatic();

     res.send(`
      <html>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
             window.context={
                state: ${JSON.stringify(store.getState())}
             }
          </script>
          <script src="client.js"></script>
        </body>
      </html>
  `);
  })
 

  
})

app.listen(3000,()=>{
  console.log('ssr-server listen on 3000')
})

childProcess.exec('start http://localhost:3000')