import express from "express"
import connection from "./config/db.js"
import cors from "cors"
import { userRouter } from "./routers/user.js"
const app=express()
const PORT=process.env.PORT || 5000
app.use(express.json())
app.use(cors())
app.use(userRouter)
connection()
app.listen(PORT,()=>{
    console.log("server started at port",PORT);
})