const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const cors=require("cors")
app.use(bodyParser.json())
app.use(cors())


const user_route=require("./routes/users")
app.use('/api/',user_route)

app.listen(8000,console.log("port is running 8000"))