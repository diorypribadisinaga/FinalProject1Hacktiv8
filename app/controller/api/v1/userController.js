const {User}=require("../../../models")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const GetUsers=async (req,res)=>{
    try{
        const {rows}=await User.findAll()
        res.json(rows)
    }catch (e) {
        res.status(500).json(e)
    }
}

const registerUser=async (req,res)=>{
    try{
        const {rows,rowCount}=await User.findAll()
        const id=rowCount===0 ? 1 :rowCount+1
        const {email,username,password}=req.body
        const cekUser=rows.find((user)=>(user.email===email || user.username===username))
        if(cekUser) return res.json({message:"Email atau Username Sudah Terdaftar"})
        const result=await User.createUser(id,email,username,password)
        res.status(201).json(result.rows[0])
    }catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}

const loginUser=async (req,res)=>{
    try{
        let {email="",password,username=""}=req.body
        const {rows}=await User.findOne(email,username)
        const user=rows[0]
        if(!user) return res.json({message:"Email/Username atau Password Salah"})
        const cekPassword=await bcrypt.compare(password,user.password)
        if(!cekPassword) return res.json({message:"Email/Username atau Password Salah"})
        const accessToken=jwt.sign({id:user.id,email:user.email,username:user.username},process.env.ACCESS_TOKEN_SECRET)
        res.json({message:"Berhasil",accessToken})
    }catch (e){
        res.status(500).json(e)
    }
}


module.exports={
    GetUsers,registerUser,loginUser
}