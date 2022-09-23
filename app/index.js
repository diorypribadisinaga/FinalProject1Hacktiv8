const express=require("express")
const bodyParser=require("body-parser")
const dotenv=require("dotenv")
const router=require("../router")

const app=express()

dotenv.config();
app.use(bodyParser.json())
app.use(router)

module.exports=app