const reflectionRoute=require("express").Router();

reflectionRoute.get("/",(req,res)=>{
    res.send("Hello World!")
})
module.exports=reflectionRoute;