const express = require("express")
const router = express.Router()
const model = require("../models/models")
const clc=require("cli-color")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const jwt_secret='my-32-character-ultra-secure-and-ultra-long-secret-this-is-shivav-verma-secret-key-dont-you-datre-to-use-bhosari-wale'
const fetchUser=require("../middleware/fetchUser")
router.get("/", (req, res) => {
    res.status(200).send("this is home")
})
//route1:create user using post method
router.post("/signup", async (req, res) => {
    let success=false
    try {
        console.log(clc.blueBright(req.body))
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const date = req.body.date
        const newdata = await model.Model.findOne({ email })
        //check if user exist 
        if (newdata) {
            success=false
            res.status(400).json({
                "msg": "email already exist",
                "desecription": "please try again with other email",
                success
            })
        } else {
            //if user not exist create user in collection in which you want to create user
            success=true
            const securepass=await bcrypt.hash(password,10)
            const data = await new model.Model({
                name,
                email,
                password:securepass,
                date
            })
            await data.save()
            const jwt_data={
                user:{
                    id:data._id
                }
            }
            const jwt_token=jwt.sign(jwt_data,jwt_secret)
            console.log(clc.bgBlue.red(jwt_token))
            res.status(201).json({
                "message": "signup successful",
                "data": data,
                jwt_token,
                success
            })
            ///json web token
            
            console.log(clc.bgWhiteBright.red(data))
        }
    } catch (err) {
        //if ther is any error if yes then catch the error
        res.status(500).json({
            msg: err,
            "message": err.message
        })
    }
})
//route:login
router.post("/login",async (req, res) => {
    let success=false;
    try{
        
        const email=req.body.email;
        const password=req.body.password;
        const data=await model.Model.findOne({email})
        if(data){
            const isMatch=await bcrypt.compare(password,data.password)
            if(isMatch){
                const jwt_data=await {
                    user:{
                        id:data._id
                    }
                }
                const jwt_token=await jwt.sign(jwt_data,jwt_secret)
                console.log(clc.bgBlue.red(jwt_token))
                success=true;
                res.status(200).json({
                    "msg":"login successful",
                    jwt_token,
                    success
                })
            }else{
                success=false;
                res.status(500).json({
                    "msg":"enter valid password",
                    success
                })
            } 
            
        }else{
            res.status(500).json({
                "msg":"please signup with the email email not present in database"
            })
        }
    }catch(err){
       console.log(clc.bgCyan.red(err))
       res.status(500).json({
        "msg":"unable to run try statement of login"
       })
    }
}
)
//route:3 jwt authentication to get user details method("post") "/api/auth/getuser" login required
router.post("/getUser",fetchUser,async (req, res) => {
    try{
        const userId=req.user.id
        const user=await model.Model.findById(userId).select({password:0})
        res.send(user)
    }catch(err){
       console.log(clc.bgCyan.red(err))
       res.status(500).json({
        "msg":"unable to run try statement of login"
       })
    }
}
)


module.exports = router