const jwt = require("jsonwebtoken")
require("dotenv").config()
const protect = (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token) return res.status(401).json({message:"No token"})

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.username = decoded    
            next()
            
        }catch(err){
            res.status(401).json({message:"Invalid Token"})
        }
}

module.exports = {protect}