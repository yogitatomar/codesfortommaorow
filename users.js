const express=require("express")

const router=express.Router()
const user_controller=require("../controller/usercontroller")

router.post('/register/',user_controller.register)
router.post('/login/',user_controller.login)
router.get('/reset-password', (req, res) => {
    res.sendFile(__dirname + '/reset-password.html');
  });
router.post('/reset-password', user_controller.reset_password)
module.exports=router
