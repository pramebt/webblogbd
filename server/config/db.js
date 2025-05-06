const mysql = require('mysql2/promise')
require('dotenv').config()

const db = mysql.createPool({
    host:process.env.DB_HOST ,
    port:process.env.DB_PORT,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    ssl: {
        rejectUnauthorized:true,
    }
})

setInterval(async()=>{
    try{
        await db.query('SELECT 1')
    }catch(err){
        console.log(err,{message:err})
    }

},10000)

module.exports = db