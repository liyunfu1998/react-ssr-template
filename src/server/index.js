import express from 'express'
import childProcess from 'child_process'
import {renderToString} from 'react-dom/server'
import React from 'react'
import Home from '@/pages/Home'

const app = express()
const content = renderToString(<Home/>)  // 编译需要渲染的jsx，转换成对应的html

app.get('*', (req,res)=>{
  const htmlDOM = `
    <html>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
  `;
  res.send(htmlDOM);
})

app.listen(3000, ()=>{
  console.log('Server is listening on port 3000')
} )

childProcess.exec('start http://localhost:3000/')