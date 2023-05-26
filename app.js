let app =require("express")();
require('dotenv').config();
const  {ConnectToDB} =require("./DB/Server/index")
const SetMiddleWares=require('./Middleware/index')
const port = process.env.PORT || 4000
const User =require("./DB/Schema/Users")
//Connect to DB
ConnectToDB();
app=SetMiddleWares(app)
 
// Start the server
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
