const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")

app.use(cors({
    credentials:true,
    origin:"https://notes-app-lq8b.vercel.app"
}))
app.use(express.json())
app.use('/api/notes',require('./routes/notes'))
app.use('/api/auth',require('./routes/users'))


mongoose.connect('mongodb+srv://qadir:qadir@edify.0i5koc5.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("Connected!")
})


app.listen(5000,()=>{
    console.log("Application Running...")
})