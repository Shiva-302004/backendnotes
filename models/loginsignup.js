const mongoose=require("mongoose")
const validator=require("validator")
const bcryptjs=require("bcryptjs")
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"this name feild is required"],
        minlength:2
    },
    email:{
        type:String,
        required:[true,"this email feild is required"],
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                console.log("enter valid email")
                throw new Error("enter valid email")
            }
        }
    },
    password:{
        type:String,
        required:[true,"this password feild is required"]
    },
    date:{
        type:String,
        default:Date.now
    }
})

module.exports=schema