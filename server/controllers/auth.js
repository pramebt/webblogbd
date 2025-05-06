const{findUserByEmail,createUser} = require('../models/user')
const db = require("../config/db")
const bcrypt = require("bcrypt");
exports.register = async(req,res) => {
    try{
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const existing = await findUserByEmail(email);
        if (existing) {
            // 2. ถ้าพบว่าเคยมีอยู่ ให้ log และตอบกลับ error
            console.log(`Email "${email}" already exists`);  
            return res.status(400).json({ message: 'User already exists' });
          }
          await createUser({ username, email, password:hash});
          res.status(201).json({ message: 'Register Successfully!!!' });
        res.status(200).json({
            success:true,
            message:"Register successfully"
        })
        
    }catch(err){
        console.log(err,{message:err})
    }
}

exports.login = async(req,res) => {
    try{
        res.status(200).json({
            success:true,
            message:"Login successfully"
        })
    }catch(err){
        console.log(err,{message:err})
    }
}

