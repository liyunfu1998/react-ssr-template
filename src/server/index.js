import express from 'express'
import childProcess from 'child_process'
import {renderToString} from 'react-dom/server'
import React from 'react'
import Home from '@/pages/Home'
import path from 'path'

const app = express()
const content = renderToString(<Home/>)  // 编译需要渲染的jsx，转换成对应的html

app.use(express.static(path.resolve(process.cwd(), 'client_build')))

app.get('*', (req,res)=>{
  const htmlDOM = `
    <html>
      <body>
        <div id="root">${content}</div>
        <script src="/index.js"></script>
      </body>
    </html>
  `;
  res.send(htmlDOM);
})

app.listen(3000, ()=>{
  console.log('Server is listening on port 3000')
} )

childProcess.exec('start http://localhost:3000/')