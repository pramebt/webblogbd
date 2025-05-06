const db = require("../config/db")

exports.getUsers = async (req,res) =>{
    try{
        const [rows] = await db.query("SELECT * FROM users")
        res.json(rows)
    }catch(err){
        console.log(err)
    }
}

exports.getUserById = async (req,res) =>{
    try{
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?",[req.params.id])
        if(!rows[0]){
            return res.status(404).json({message: "User not found"})
        }
        res.json(rows[0])
        const id = req.params.id
        res.send("get user by id" + id)
    }catch(err){
        console.log(err)
    }
}