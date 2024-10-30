const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


const { readdirSync} = require('fs')
// const authRouter = require('./routes/auth')
// const categoryRouter = require('./routes/category')
// app.use('/api', authRouter)
// app.use('/api', categoryRouter)

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

readdirSync('./routers').map((c) => app.use('/api', require('./routers/' + c)))


// app.post('/api',(req,res)=>{ 
//     const {name, age} = req.body
//     console.log(name, age)
//     res.send('user :')
// })


app.listen(5001,
    ()=> console.log('server is running on port 5001'))