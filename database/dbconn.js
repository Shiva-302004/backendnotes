const mongoose=require("mongoose")
const mongodb=require("mongodb")

const URI="mongodb+srv://shiva:qwertyuiop@atlascluster.gw1or1c.mongodb.net/i-notebookapp?retryWrites=true&w=majority"

const db=async()=>{
    try{
        await mongoose.connect(URI)
        console.log("database connected")
    }catch(err){
        console.log(err)
    }
}
module.exports=db;