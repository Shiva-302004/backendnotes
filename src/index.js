const express=require("express")
const app=express()
const bodyparser=require('body-parser')
const db=require("../database/dbconn")
const router=require("../routes/auth.js")
const notesroutes=require('../routes/notesroute.js')
const dotenv=require("dotenv")
dotenv.config()
const PORT=process.env.PORT
const cor=require("cors")
app.use(express.json())
app.use(cor())
app.use(bodyparser.json({extended:true}))
app.use(bodyparser.urlencoded({extended:true}))
app.use('/api/auth',router)
app.use('/api/notes',notesroutes)
db().then(
app.listen(8000,()=>{
    console.log("server started")
})).catch((err)=>{
    console.log(err)
})