const pool=require("../../config/pool")


const FindAll=()=>{
    return new Promise((resolve, reject)=>{
        pool.query("SELECT * FROM reflections")
            .then((result)=>{
                resolve(result)
            })
            .catch((err)=>{
                reject(err)
            })
    })
}

const FindAllReflectionsUser=(id)=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * FROM reflections INNER JOIN users ON reflections.owner_id=users.id WHERE owner_id=$1",[id])
            .then((result)=>{
                resolve(result)
            })
            .catch((err)=>{
                reject(err)
            })
    })
}

const CreateReflection=(id,success,low_point,take_away,owner_id,created_date,modified_date)=>{
    const query="INSERT INTO reflections (id,success,low_point,take_away,owner_id,created_date,modified_date) values ($1,$2,$3,$4,$5,$6,$7) returning * "
    return new Promise((resolve,reject)=>{
        pool.query(query,[id,success,low_point,take_away,owner_id,created_date,modified_date])
            .then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err)
        })
    })
}


module.exports={
    CreateReflection,FindAllReflectionsUser,FindAll
}