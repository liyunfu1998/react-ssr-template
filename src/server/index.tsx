import express from 'express'
import childProcess from 'child_process'
import {renderToString} from 'react-dom/server'
import path from 'path'
import router from '@/router'
import {Route, Routes} from 'react-router-dom'
import {StaticRouter} from 'react-router-dom/server'
import {Helmet} from 'react-helmet'

const app = express()

app.use(express.static(path.resolve(process.cwd(),'client_build')))

app.get('*', (req,res)=>{
  const content = renderToString(
    <StaticRouter location={req.path}>
      <Routes>
        {
          router?.map((item,index)=>{
            return <Route key={index} {...item}/>
          })
        }
      </Routes>
    </StaticRouter>
  )

  const helmet = Helmet.renderStatic()

  res.send(`
      <html>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
        </head>
        <body>
          <div id="root">${content}</div>
          <script src="client.js"></script>
        </body>
      </html>
  `)
})

app.listen(3000,()=>{
  console.log('ssr-server listen on 3000')
})

childProcess.exec('start http://localhost:3000')