const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookie_parser = require('cookie-parser')
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/postRoute')
const commentRoute = require('./routes/comments')



const app = express()

app.use(cors({
    credentials: true,
    origin: '*',
}))

var DATABASE_URL = process.env.DATABASE_URL
mongoose.set('strictQuery', false)
mongoose.connect(`mongodb://${DATABASE_URL}/Blog`) 

app.get('/', function (req, res) {
    res.send('Welcome to the Node Application!');
  });
app.use(cookie_parser())
app.use(bodyParser.json())
app.use('/',userRoute)

app.use('/',authRoute)
app.use('/',postRoute)
app.use('/',commentRoute)


app.listen(3080, ()=>{
    console.log('running at 3080')
})