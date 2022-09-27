const {Reflection}=require("../../../models")

const findAllReflectionsUser=async (req,res)=>{
    try{
        const {id}=req.user
        const {rows}=await Reflection.FindAllReflectionsUser(id)
        res.json(rows)
    }catch (e){
        res.status(500).json(e)
    }
}

const createReflection=async (req,res)=>{
    try{
        const owner_id=req.user.id
        const { rowCount, rows } = await Reflection.FindAll()
        const id = rowCount === 0 ? 1 : (rows[rows.length - 1].id + 1)
        console.log(rows,rowCount)
        const {success,low_point,take_away}=req.body
        const created_date=new Date().toLocaleString("id-ID")
        const result=await Reflection.CreateReflection(id,success,low_point,take_away,owner_id,created_date,created_date)
        res.status(201).json(result.rows[0])
    }catch (e){
        res.status(500).json(e)
    }
}

module.exports={
    findAllReflectionsUser,createReflection
}