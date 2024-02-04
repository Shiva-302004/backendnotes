const mongoose=require("mongoose")

const notesschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usersignup'
        // required:[true,"enter user"]
    },
    title:{
        type:String,
        required:[true,"this name feild is required"],
        minlength:2
    },
    description:{
        type:String,
        required:[true,"this email feild is required"],
    },
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:String,
        default:Date.now
    }
})
module.exports=notesschema