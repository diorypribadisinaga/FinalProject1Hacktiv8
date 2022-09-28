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
        pool.query("SELECT reflections.id,reflections.success,reflections.low_point,reflections.take_away,reflections.owner_id,reflections.created_date,reflections.modified_date,users.username,users.email FROM reflections INNER JOIN users ON reflections.owner_id=users.id WHERE owner_id=$1",[id])
            .then((result)=>{
                resolve(result)
            })
            .catch((err)=>{
                reject(err)
            })
    })
}

const CreateReflection=(id,success,low_point,take_away,owner_id,created_date,modified_date)=>{
    let now = new Date();
    const query="INSERT INTO reflections (id,success,low_point,take_away,owner_id,created_date,modified_date) values ($1,$2,$3,$4,$5,$6,$7) returning * "
    return new Promise((resolve,reject)=>{
        pool.query(query,[id,success,low_point,take_away,owner_id,now,now])
            .then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
    })
}

const update = (success, low_point, take_away, id) => {
    let now = new Date();
    const query=`UPDATE reflections 
    SET success=$1, low_point=$2, take_away=$3, modified_date=$4 WHERE id=$5
    RETURNING id, success, low_point, take_away, owner_id, created_date, modified_date;`
    return new Promise((resolve,reject)=>{
        pool.query(query,[success, low_point, take_away, now, id])
            .then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
    })
}

const del = (id) => {
    const query=`DELETE FROM reflections
    WHERE id = $1
    RETURNING id, success, low_point, take_away, owner_id, created_date, modified_date;`
    return new Promise((resolve,reject)=>{
        pool.query(query,[id])
            .then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
    })
}


module.exports={
    CreateReflection,
    FindAllReflectionsUser,
    FindAll,
    update,
    del
}