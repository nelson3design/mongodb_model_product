
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000

const router = require('./router')
app.use(express.json())



app.use('/', router)


const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS


mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.jkksrha.mongodb.net/?retryWrites=true&w=majority`).then(()=>{

    app.listen(port,()=>{
        console.log(`servidor rodando na porta ${port}`)
    })
}).catch((error)=> console.log(error))

