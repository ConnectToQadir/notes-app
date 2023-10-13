const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use('/api/notes',require('./routes/notes'))


mongoose.connect('mongodb://127.0.0.1:27017/notes-app').then(()=>{
    console.log("Connected!")
})








app.listen(5000,()=>{
    console.log("Application Running...")
})