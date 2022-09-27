const pool=require("../../config/pool")
const bcrypt=require("bcryptjs")
const findAll=()=>{
    return new Promise((resolve, reject)=>{
        pool.query("SELECT * FROM users")
            .then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err)
        })
    })
}

const createUser=async (id,email,username,password)=>{
        const query="INSERT INTO users (id,email,username,password) VALUES($1,$2,$3,$4) RETURNING *"
        const hashPassword=await bcrypt.hash(password,10)
        return new Promise((resolve, reject)=>{
            pool.query(query,[
                id,email,username,hashPassword
            ]).then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
        })
}
const findOne=(email,username)=>{
    const query="SELECT * FROM users WHERE email = $1 OR username = $2"
    return new Promise((resolve, reject)=>{
        pool.query(query,[email,username])
            .then((result)=>{
                resolve(result)
            }).catch(err=>{
                reject(err)
        })
    })
}

module.exports={
    findAll,createUser,findOne
}