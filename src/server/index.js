import express from 'express'
import childProcess from 'child_process'

const app = express()

app.get('*', (req,res)=>{
  res.send(`
    <html>
      <body>
        <div>hello ssr</div>
      </body>
    </html>
  `)
})

app.listen(3000, ()=>{
  console.log('Server is listening on port 3000')
} )

childProcess.exec('start http://localhost:3000/')