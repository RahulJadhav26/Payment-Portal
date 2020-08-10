const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const route = require('./routes')
const port = process.env.PORT || 5001


app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))
app.use('/', route)


app.listen( port, ()=>{
    console.log(`App is listening on port  ` + port)
})

