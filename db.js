const mysql=require("mysql")
const conn=mysql.createConnection({
    host:"localhost",
    user:"mongoose",
    password:"mongoose",
    database:"yogita"
})

conn.connect((err)=>{
    if(err){
        console.log("error in code");
    }
    else{
        console.log("connect successfully");
    }

})
module.exports=conn

