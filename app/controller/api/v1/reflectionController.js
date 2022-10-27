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
        const {success,low_point,take_away}=req.body
        const result=await Reflection.CreateReflection(id,success,low_point,take_away,owner_id)
        res.status(201).json(result.rows[0])
    }catch (e){
        res.status(500).json(e)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const owner_id = req.user.id
        let { success, low_point, take_away } = req.body;
        const { rows } = await Reflection.FindOne(id)
        if (rows.length === 0) return res.json({ message: "Data Tidak Ditemukan" })
        if (success == null) {
            success = rows[0].success
        }
        if (low_point == null) {
            low_point = rows[0].low_point
        }
        if (take_away == null) {
            take_away = rows[0].take_away
        }
        if (rows[0].owner_id !== owner_id) {
            res.status(403).json({ message: "Anda Tidak Boleh Mengedit yang bukan punya Anda!" })
            return
        }
        const result= await Reflection.update(success, low_point, take_away, id)
        res.status(201).json(result.rows)
    } catch (error) {
        res.status(500).json(error)
    }
    
}

const del = async (req, res) => {
    try {
        const { id } = req.params
        const owner_id =req.user.id
        const { rows } = await Reflection.FindOne(id)
        if (rows.length === 0) return res.json({ message: "Data Tidak Ditemukan" })
        if (rows[0].owner_id !== owner_id) {
            res.status(403).json({ message: "Anda Tidak Boleh Menghapus yang bukan punya Anda!" })
            return
        }
        const result=await Reflection.del(id)
        res.status(200).json({message: 'Data berhasil dihapus', data: result.rows})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={
    findAllReflectionsUser,
    createReflection,
    update,
    del
}