const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', require('./routes/UserRouter'))
app.use('/notes', require('./routes/NotesRouter'))


const connectdb = async () => {
    try {
        await mongoose.connect("mongodb+srv://abdell:gomycode@cluster0.viosbka.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("db connected"))
        console.log("Db Connected")
    } catch (err) {
        console.log(err)
    }
}


connectdb()

app.listen(4000, () => {
    console.log("Server Running")
})
       