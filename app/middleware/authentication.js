const {User}=require("../models")
const jwt=require("jsonwebtoken")

const authentication=async (req,res,next)=>{
    const authHeader=req.headers['authorization']
    const token=authHeader &&authHeader.split("Bearer ")[1]
    if(!token) return res.sendStatus(401)
    try{
        const decoded= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const {rows}=await User.FindOne(decoded.email)
        if(rows.length===0) return res.sendStatus(401)
        req.user=decoded
        next()
    }catch (e) {
        if(e) return res.sendStatus(401)
    }
}

module.exports=authentication;