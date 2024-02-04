const mongoose=require("mongoose")
const mongodb=require("mongodb")
const dotenv=require("dotenv")
dotenv.config()

const URI=process.env.URI

const db=async()=>{
    try{
        await mongoose.connect(URI)
        console.log("database connected")
    }catch(err){
        console.log(err)
    }
}
module.exports=db;