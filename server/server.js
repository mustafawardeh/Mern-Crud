import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import cors from "cors"
import usersRouter from './routes/user.js'

dotenv.config()
const PORT = process.env.PORT
const app = express()

mongoose.connect(`mongodb+srv://killswitsh:${process.env.MONGO_DB_PASSWORD}@cluster0.myggp0u.mongodb.net/mernproject?retryWrites=true&w=majority`) // before ? i must add db name

app.use(cors())  //to make it fetch correctly from react


app.use(express.json()) // to make server work with body data


app.use('/users' , usersRouter)

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT} successfully`)
})