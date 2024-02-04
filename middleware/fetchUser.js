const clc = require("cli-color");
const jwt=require("jsonwebtoken")
const jwt_secret='my-32-character-ultra-secure-and-ultra-long-secret-this-is-shivav-verma-secret-key-dont-you-datre-to-use-bhosari-wale'
const fecthUser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate"})
    }
    try{
        const string=jwt.verify(token,jwt_secret);
        // console.log(string)
        req.user=string.user;
        // console.log(req.user)
        next()
    }catch(err){
        console.log(clc.bgCyanBright.red(err))
    }
}






module.exports=fecthUser