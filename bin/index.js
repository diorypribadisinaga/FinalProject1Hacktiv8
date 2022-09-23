const app=require("../app")
PORT=8000||process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server Sudah Berjalan di http://localhost:${PORT}`)
})