const mongoose=require("mongoose");
const schema=require("./loginsignup");
const notesschema=require("./notes")
const Model=new mongoose.model("Usersignup",schema);
const NotesModel=new mongoose.model("Notes",notesschema)
module.exports={Model,NotesModel};