const express = require('express')
const app = express()

const morgan = require('morgan')


app.use(morgan('dev'))
app.use(express.json())

app.post('/api',(req,res)=>{
    console.log(req.body)
    res.send('test')
})


app.listen(5001,
    ()=> console.log('server is running on port 5001'))