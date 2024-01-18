const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const conn=require("../config/db")

const register=((req,res)=>{
    const {FirstName,LastName,Email,Password}=req.body
    checkemail="select * from user where Email=?"
    conn.query(checkemail,[Email],(result,err)=>{
        if(err){
            res.status(500).json({
             msg:"internal server error"
            })
         }
         if(result.length===0){
            res.status(400).json({
                msg:"user already exist"
               })
         }
    })

    bcrypt.hash(Password,10,(err,hash)=>{
        if(err){
            res.status(500).json({
                msg:"internal server error"
               })
        }
    })

    const insertdata="insert into user(FirstName,LastName,Email,Password) values (?,?,?,?)"
    conn.query(insertdata,[FirstName,LastName,Email,Password],(result,err)=>{
        if(err){
            res.status(400).json({
             msg:"some error"
            })
         }
         res.status(200).json({
            msg:"registration successfully"
           })
    })

})
const login=((req,res)=>{
    const {FirstName,LastName,Email,Password}=req.body
    if(!Email||!Password){
        res.status(400).json({
            msg:"email and password required"
           })
    }
    checkemail="select * from user where Email=?"
    conn.query(checkemail,[Email],(result,err)=>{
        if(err){
            res.status(500).json({
             msg:"internal server error"
            })
         }
         if(result.length===0){
            res.status(400).json({
                msg:"that email is not registered"
               })
         }
  
         user=result[0]

    bcrypt.compare(Password,user.Password,(match,err)=>{
        if(err||!match){
            res.status(400).json({
                msg:"password is wrong"
               })
        }

        const token=jwt.sign({userid:user.id},"secret_key",{expireIn:"1h"})

    
})
})
})

const getusers=((req,res)=>{
    
    getalluser="select * from user"
    conn.query(getalluser,(result,err)=>{
        if(err){
            res.status(500).json({
             msg:"internal server error"
            })
         }
        
            res.status(200).json({
                msg:result
               })
            })
    
})

const reset_password=((req, res) => {
    const { token, newPassword } = req.body;

    // temporary storage
    const request = passwordResetRequests.find((entry) => entry.token === token);
  
    if (!request) {
      return res.status(400).send('Invalid or expired token');
    }
  
    const { userId, timestamp } = request;
  
//    the valid time window (5 minutes)
    const timeDifference = Date.now() - timestamp;
    const validTimeWindow = 5 * 60 * 1000; // 5 minutes in milliseconds
  
    if (timeDifference > validTimeWindow) {
      return res.status(400).send('Expired token');
    }
  
   
    console.log(`Password updated for user with ID ${userId}`);
  
  
    passwordResetRequests.splice(passwordResetRequests.indexOf(request), 1);
    conn.query('UPDATE user SET Password = ? WHERE id = ?', [newPassword, userId], (error, results) => {
        if (error) throw error;
    
        // Password updated successfully
        res.send('Password updated successfully!');
   
    })
  });
 
module.exports={
    register,
    login,
    getusers,
    reset_password
}