const userRoute=require("express").Router();

userRoute.post("/register",(req,res)=>{
    res.send("tersimpan")
})
userRoute.post("/login",(req,res)=>{
    res.send("Berhasil")
})
module.exports=userRoute;