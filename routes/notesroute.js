const express = require("express")
const routerr = express.Router()
const Model = require("../models/models")
const fetchUser = require("../middleware/fetchUser")
routerr.post("/addnotes", fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body

        const data = new Model.NotesModel({
            title, description, tag, user: req.user.id
        })
        const newdata = await data.save()
        res.status(202).json(newdata)
    }

    catch (err) {
        res.status(400).send(err)
    }

})
//rotute 2 getting all notes of that user
routerr.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const data = await Model.NotesModel.find({ user: req.user.id })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }

})
//route 3 for updating an existing note.Login required
routerr.put("/updatenote/:id",fetchUser,async(req,res)=>{
        
        const userId=req.user.id;
        const {title,description,tag}=req.body
        const finddata=await Model.NotesModel.findById(req.params.id)
        if(!finddata){
           return  res.status(400).send("notes not present")
        }
        console.log(finddata.user.toString())
        if(finddata.user.toString()!==userId){
           return  res.status(400).send("this is wrong process as this is not your notes")
        }
        else{
            try{
                const newdata={}
                if(title){newdata.title=title}
                if(description){newdata.description=description}
                if(tag){newdata.tag=tag}
                const data=await Model.NotesModel.findByIdAndUpdate(req.params.id,{$set:newdata},{new:true})
                res.json(data)
            }catch(err){
                res.status(400).send(err) 
            }
        }
})
routerr.delete("/deletenote/:id",fetchUser,async(req,res)=>{
        
        const userId=req.user.id;
        const finddata=await Model.NotesModel.findById(req.params.id)
        if(!finddata){
           return  res.status(400).send("notes not present")
        }
        console.log(finddata.user.toString())
        if(finddata.user.toString()!==userId){
           return  res.status(400).send("this is wrong process as this is not your notes")
        }
        else{
            try{
                const data=await Model.NotesModel.findByIdAndDelete(req.params.id)
                console.log(data)
                res.status(201).json({"meassage":"noted deleted succefully","note":data})
            }catch(err){
                res.status(400).send(err)
            }
        }
})

module.exports = routerr